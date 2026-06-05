export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

export type LeadType = "investor" | "distributor";
export type LeadStatus = "new" | "contacted" | "qualified" | "discarded";

export type Lead = {
  id: string;
  type: LeadType;
  status: LeadStatus;
  name: string;
  email: string;
  organization?: string;
  message?: string;
  extra?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type LeadListResponse = {
  items: Lead[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  page: number;
  pageSize: number;
};

export type BackendUser = {
  id?: string;
  _id?: string;
  nombre?: string;
  correo?: string;
  email?: string;
  role?: string;
  empresaId?: string;
  activo?: boolean;
  tipoCliente?: string;
};

export type BackendSession = {
  user: BackendUser;
};

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  error?: unknown;
  errors?: string[];
};

type RequestOptions = RequestInit & {
  csrf?: boolean;
};

let csrfToken: string | null = null;

function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}/api${normalized}`;
}

async function parseEnvelope<T>(response: Response): Promise<ApiEnvelope<T> | null> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as ApiEnvelope<T>;
  } catch {
    return null;
  }
}

function errorMessage(payload: ApiEnvelope<unknown> | null, fallback: string) {
  if (!payload) return fallback;
  if (typeof payload.error === "string") return payload.error;
  if (payload.error && typeof payload.error === "object" && "message" in payload.error) {
    const message = (payload.error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  if (payload.message) return payload.message;
  if (payload.errors?.length) return payload.errors[0];
  return fallback;
}

async function getCSRFToken() {
  if (csrfToken) return csrfToken;

  const response = await fetch(apiUrl("/auth/csrf-token"), {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  const payload = await parseEnvelope<{ token?: string }>(response);
  if (!response.ok || payload?.success === false || !payload?.data?.token) {
    throw new Error(errorMessage(payload, "No se pudo preparar la sesión"));
  }
  csrfToken = payload.data.token;
  return csrfToken;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { csrf = false, headers, body, ...init } = options;
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");

  if (body && !(body instanceof FormData) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (csrf) {
    requestHeaders.set("X-CSRF-Token", await getCSRFToken());
  }

  const response = await fetch(apiUrl(path), {
    ...init,
    body,
    headers: requestHeaders,
    credentials: "include",
  });
  const payload = await parseEnvelope<T>(response);
  if (!response.ok || payload?.success === false) {
    if (response.status === 401) csrfToken = null;
    throw new Error(errorMessage(payload, response.statusText || "Error de API"));
  }
  return payload?.data as T;
}

export async function loginEmpresa(input: { email: string; password: string }) {
  const data = await request<{ user: BackendUser }>("/auth/login/empresa", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return data.user;
}

export async function getCurrentUser() {
  return request<BackendUser>("/auth/me", { method: "GET" });
}

export async function logoutEmpresa() {
  await request<unknown>("/auth/logout", { method: "POST", csrf: true });
  csrfToken = null;
}

export async function submitLead(input: {
  type: LeadType;
  name: string;
  email: string;
  organization?: string | null;
  message?: string | null;
  extra?: Record<string, unknown>;
  turnstileToken?: string;
}) {
  await request<Lead>("/leads", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fetchLeads(filters: {
  offset?: number;
  limit?: number;
  type?: LeadType;
  status?: LeadStatus;
  from?: string;
  to?: string;
  search?: string;
}) {
  const params = new URLSearchParams();
  if (typeof filters.offset === "number") params.set("offset", String(filters.offset));
  if (typeof filters.limit === "number") params.set("limit", String(filters.limit));
  if (filters.type) params.set("type", filters.type);
  if (filters.status) params.set("status", filters.status);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.search) params.set("search", filters.search);

  const query = params.toString();
  return request<LeadListResponse>(`/leads${query ? `?${query}` : ""}`, { method: "GET" });
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  return request<Lead>(`/leads/${id}/status`, {
    method: "PUT",
    csrf: true,
    body: JSON.stringify({ status }),
  });
}
