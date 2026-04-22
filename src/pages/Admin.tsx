import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, LogOut, RefreshCw } from "lucide-react";
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

type Lead = Tables<"leads">;
type LeadType = Enums<"lead_type"> | "all";
type LeadStatus = Enums<"lead_status"> | "all";

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

  const [typeFilter, setTypeFilter] = useState<LeadType>("all");
  const [statusFilter, setStatusFilter] = useState<LeadStatus>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [search, setSearch] = useState("");

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

  async function fetchLeads() {
    setFetching(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) {
      toast({ title: "Error al cargar leads", description: error.message, variant: "destructive" });
    } else {
      setLeads(data ?? []);
    }
    setFetching(false);
  }

  useEffect(() => {
    if (isAdmin) fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (typeFilter !== "all" && l.type !== typeFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (from && new Date(l.created_at) < new Date(from)) return false;
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        if (new Date(l.created_at) > end) return false;
      }
      if (search) {
        const s = search.toLowerCase();
        const haystack = `${l.name} ${l.email} ${l.organization ?? ""} ${l.message ?? ""}`.toLowerCase();
        if (!haystack.includes(s)) return false;
      }
      return true;
    });
  }, [leads, typeFilter, statusFilter, from, to, search]);

  const counts = useMemo(() => {
    const c = { total: leads.length, investor: 0, distributor: 0, new: 0 };
    for (const l of leads) {
      if (l.type === "investor") c.investor++;
      if (l.type === "distributor") c.distributor++;
      if (l.status === "new") c.new++;
    }
    return c;
  }, [leads]);

  async function updateStatus(id: string, status: Enums<"lead_status">) {
    const previous = leads;
    setLeads((curr) => curr.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      setLeads(previous);
      toast({ title: "No se pudo actualizar", description: error.message, variant: "destructive" });
    }
  }

  function exportCsv() {
    const headers = ["created_at", "type", "status", "name", "email", "organization", "message", "extra"];
    const escape = (v: unknown) => {
      const s = v === null || v === undefined ? "" : typeof v === "string" ? v : JSON.stringify(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const rows = filtered.map((l) =>
      [l.created_at, l.type, l.status, l.name, l.email, l.organization, l.message, l.extra]
        .map(escape)
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `leads-${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
            <Button variant="outline" size="sm" onClick={fetchLeads} disabled={fetching}>
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
              <Button onClick={exportCsv} className="w-full md:w-auto" disabled={filtered.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV ({filtered.length})
              </Button>
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
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      {fetching ? "Cargando…" : "Sin resultados con los filtros actuales."}
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((l) => (
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