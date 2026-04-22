import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileText, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteLayout } from "@/components/layout/SiteLayout";
import type { Tables, Enums } from "@/integrations/supabase/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Lead = Tables<"leads">;
type LeadType = Enums<"lead_type"> | "all";
type LeadStatus = Enums<"lead_status"> | "all";

const EXPORT_BATCH_SIZE = 1000;
const ESCAPE_PG_RE = /[%,()\\]/g;

/** Escape characters that have special meaning inside a PostgREST `or()` filter value. */
function escapeForPgrstOr(value: string): string {
  return value.replace(ESCAPE_PG_RE, "\\$&");
}

const STATUS_LABEL: Record<Enums<"lead_status">, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Calificado",
  discarded: "Descartado",
};

const STATUS_VARIANT: Record<Enums<"lead_status">, "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  qualified: "outline",
  discarded: "destructive",
};

const TYPE_LABEL: Record<Enums<"lead_type">, string> = {
  investor: "Inversor",
  distributor: "Distribuidora",
};

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isAdmin, loading, signOut, user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [fetching, setFetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState<number>(50);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [typeFilter, setTypeFilter] = useState<LeadType>("all");
  const [statusFilter, setStatusFilter] = useState<LeadStatus>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [exporting, setExporting] = useState<null | "csv" | "pdf">(null);

  // Debounce search so we don't hit the DB on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate("/auth", { replace: true });
      return;
    }
    if (!isAdmin) {
      toast({
        title: "Acceso restringido",
        description: "Tu cuenta no tiene permisos de administrador.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [session, isAdmin, loading, navigate, toast]);

  /**
   * Apply current filters to a Supabase query builder. Used for both fetching and exporting.
   * We use `any` internally because the PostgrestFilterBuilder generic chain causes
   * "Type instantiation is excessively deep" errors when passed through generics.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyFilters = useCallback(
    (query: any): any => {
      let q = query;
      if (typeFilter !== "all") q = q.eq("type", typeFilter);
      if (statusFilter !== "all") q = q.eq("status", statusFilter);
      if (from) q = q.gte("created_at", new Date(from).toISOString());
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        q = q.lte("created_at", end.toISOString());
      }
      if (debouncedSearch) {
        const safe = escapeForPgrstOr(debouncedSearch);
        q = q.or(
          `name.ilike.%${safe}%,email.ilike.%${safe}%,organization.ilike.%${safe}%,message.ilike.%${safe}%`,
        );
      }
      return q;
    },
    [typeFilter, statusFilter, from, to, debouncedSearch],
  );

  // Track latest request to avoid race conditions when filters change quickly
  const requestIdRef = useRef(0);

  const fetchPage = useCallback(
    async (offset: number, replace: boolean) => {
      const reqId = ++requestIdRef.current;
      if (replace) setFetching(true);
      else setLoadingMore(true);
      const base = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + pageSize - 1);
      const { data, error, count } = await applyFilters(base);
      // Discard stale responses
      if (reqId !== requestIdRef.current) return;
      if (error) {
        toast({ title: "Error al cargar leads", description: error.message, variant: "destructive" });
      } else {
        const next = data ?? [];
        setLeads((curr) => (replace ? next : [...curr, ...next]));
        if (typeof count === "number") setTotalCount(count);
        setHasMore(next.length === pageSize);
      }
      setFetching(false);
      setLoadingMore(false);
    },
    [applyFilters, pageSize, toast],
  );

  const refresh = useCallback(() => {
    fetchPage(0, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    fetchPage(leads.length, false);
  }, [fetchPage, leads.length]);

  // Reload from offset 0 whenever filters or page size change
  useEffect(() => {
    if (isAdmin) fetchPage(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, pageSize, typeFilter, statusFilter, from, to, debouncedSearch]);

  // Filtering happens server-side; `leads` already only contains matching rows.
  const counts = useMemo(() => {
    const c = { total: totalCount, investor: 0, distributor: 0, new: 0 };
    for (const l of leads) {
      if (l.type === "investor") c.investor++;
      if (l.type === "distributor") c.distributor++;
      if (l.status === "new") c.new++;
    }
    return c;
  }, [leads, totalCount]);

  async function updateStatus(id: string, status: Enums<"lead_status">) {
    const previous = leads;
    setLeads((curr) => curr.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      setLeads(previous);
      toast({ title: "No se pudo actualizar", description: error.message, variant: "destructive" });
    }
  }

  /** Fetch ALL rows matching current filters from the server, in batches of 1000. */
  async function fetchAllFiltered(): Promise<Lead[] | null> {
    const all: Lead[] = [];
    let offset = 0;
    // Safety cap to avoid runaway exports
    const MAX_ROWS = 50_000;
    while (offset < MAX_ROWS) {
      const base = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + EXPORT_BATCH_SIZE - 1);
      const { data, error } = await applyFilters(base);
      if (error) {
        toast({ title: "Error al exportar", description: error.message, variant: "destructive" });
        return null;
      }
      const batch = data ?? [];
      all.push(...batch);
      if (batch.length < EXPORT_BATCH_SIZE) break;
      offset += EXPORT_BATCH_SIZE;
    }
    return all;
  }

  async function exportCsv() {
    setExporting("csv");
    try {
      const rows = await fetchAllFiltered();
      if (!rows) return;
      const headers = ["created_at", "type", "status", "name", "email", "organization", "message", "extra"];
      const escape = (v: unknown) => {
        const s = v === null || v === undefined ? "" : typeof v === "string" ? v : JSON.stringify(v);
        return `"${s.replace(/"/g, '""')}"`;
      };
      const body = rows.map((l) =>
        [l.created_at, l.type, l.status, l.name, l.email, l.organization, l.message, l.extra]
          .map(escape)
          .join(","),
      );
      const csv = [headers.join(","), ...body].join("\n");
      const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `leads-${stamp}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "CSV generado", description: `${rows.length} registros exportados.` });
    } finally {
      setExporting(null);
    }
  }

  async function exportPdf() {
    setExporting("pdf");
    try {
      const rows = await fetchAllFiltered();
      if (!rows) return;

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const stamp = new Date();
      const stampStr = stamp.toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" });

      doc.setFontSize(16);
      doc.text("ElectricAutomaticChile — Leads", 40, 40);
      doc.setFontSize(10);
      doc.setTextColor(100);
      const filterParts = [
        `Generado: ${stampStr}`,
        `Tipo: ${typeFilter === "all" ? "Todos" : TYPE_LABEL[typeFilter]}`,
        `Estado: ${statusFilter === "all" ? "Todos" : STATUS_LABEL[statusFilter]}`,
        from ? `Desde: ${from}` : null,
        to ? `Hasta: ${to}` : null,
        debouncedSearch ? `Búsqueda: "${debouncedSearch}"` : null,
        `Resultados: ${rows.length}`,
      ].filter(Boolean);
      doc.text(filterParts.join("  ·  "), 40, 58);

      autoTable(doc, {
        startY: 75,
        head: [["Fecha", "Tipo", "Estado", "Nombre", "Email", "Organización", "Mensaje"]],
        body: rows.map((l) => [
          new Date(l.created_at).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" }),
          TYPE_LABEL[l.type],
          STATUS_LABEL[l.status],
          l.name,
          l.email,
          l.organization ?? "—",
          l.message ?? "—",
        ]),
        styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak" },
        headStyles: { fillColor: [26, 26, 26], textColor: 255 },
        alternateRowStyles: { fillColor: [248, 247, 244] },
        columnStyles: {
          0: { cellWidth: 75 },
          1: { cellWidth: 60 },
          2: { cellWidth: 60 },
          3: { cellWidth: 90 },
          4: { cellWidth: 130 },
          5: { cellWidth: 100 },
          6: { cellWidth: "auto" },
        },
        didDrawPage: (data) => {
          const page = doc.getNumberOfPages();
          doc.setFontSize(8);
          doc.setTextColor(150);
          doc.text(
            `Página ${data.pageNumber} de ${page}`,
            doc.internal.pageSize.getWidth() - 80,
            doc.internal.pageSize.getHeight() - 20,
          );
        },
      });

      doc.save(`leads-${stamp.toISOString().slice(0, 10)}.pdf`);
      toast({ title: "PDF generado", description: `${rows.length} registros exportados.` });
    } finally {
      setExporting(null);
    }
  }

  if (loading || !isAdmin) {
    return (
      <SiteLayout>
        <div className="container mx-auto py-24 text-center text-muted-foreground">Cargando…</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container mx-auto py-10 md:py-14 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Panel de leads</h1>
            <p className="text-muted-foreground mt-1">
              Sesión: <span className="text-foreground">{user?.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refresh} disabled={fetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total" value={counts.total} />
          <StatCard label="Inversores" value={counts.investor} />
          <StatCard label="Distribuidoras" value={counts.distributor} />
          <StatCard label="Nuevos sin contactar" value={counts.new} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <Input
                  placeholder="Buscar por nombre, email, organización…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as LeadType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="investor">Inversor</SelectItem>
                  <SelectItem value="distributor">Distribuidora</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as LeadStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="contacted">Contactado</SelectItem>
                  <SelectItem value="qualified">Calificado</SelectItem>
                  <SelectItem value="discarded">Descartado</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={exportCsv}
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={totalCount === 0 || exporting !== null}
                >
                  {exporting === "csv" ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  CSV ({totalCount})
                </Button>
                <Button
                  onClick={exportPdf}
                  className="w-full sm:w-auto"
                  disabled={totalCount === 0 || exporting !== null}
                >
                  {exporting === "pdf" ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  PDF ({totalCount})
                </Button>
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Desde</label>
                <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                <label className="text-sm text-muted-foreground">Hasta</label>
                <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Organización</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead className="w-[160px]">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      {fetching ? "Cargando…" : "Sin resultados con los filtros actuales."}
                    </TableCell>
                  </TableRow>
                )}
                {leads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(l.created_at).toLocaleString("es-CL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={l.type === "investor" ? "default" : "secondary"}>
                        {TYPE_LABEL[l.type]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${l.email}`} className="text-primary hover:underline">
                        {l.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm">{l.organization ?? "—"}</TableCell>
                    <TableCell className="max-w-[280px] truncate text-sm text-muted-foreground" title={l.message ?? undefined}>
                      {l.message ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as Enums<"lead_status">)}>
                        <SelectTrigger className="h-8">
                          <SelectValue>
                            <Badge variant={STATUS_VARIANT[l.status]} className="font-normal">
                              {STATUS_LABEL[l.status]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nuevo</SelectItem>
                          <SelectItem value="contacted">Contactado</SelectItem>
                          <SelectItem value="qualified">Calificado</SelectItem>
                          <SelectItem value="discarded">Descartado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-sm text-muted-foreground">
            Mostrando <span className="text-foreground font-medium">{leads.length}</span> de{" "}
            <span className="text-foreground font-medium">{totalCount}</span> leads filtrados
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Por página</span>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="h-9 w-[90px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="250">250</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadMore} disabled={!hasMore || loadingMore || fetching} variant="outline">
              {loadingMore ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Cargando…
                </>
              ) : hasMore ? (
                "Cargar más"
              ) : (
                "No hay más"
              )}
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}