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
import { useAuth } from "@/hooks/useAuth";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  type Lead,
  type LeadStatus,
  type LeadType,
  fetchLeads,
  updateLeadStatus,
} from "@/lib/api/client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type LeadTypeFilter = LeadType | "all";
type LeadStatusFilter = LeadStatus | "all";

const EXPORT_BATCH_SIZE = 1000;

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Calificado",
  discarded: "Descartado",
};

const STATUS_VARIANT: Record<LeadStatus, "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  qualified: "outline",
  discarded: "destructive",
};

const TYPE_LABEL: Record<LeadType, string> = {
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

  const [typeFilter, setTypeFilter] = useState<LeadTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<LeadStatusFilter>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [exporting, setExporting] = useState<null | "csv" | "pdf">(null);

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
        description: "Tu cuenta no tiene permisos para ver leads.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [session, isAdmin, loading, navigate, toast]);

  const currentFilters = useCallback(
    () => ({
      type: typeFilter === "all" ? undefined : typeFilter,
      status: statusFilter === "all" ? undefined : statusFilter,
      from: from || undefined,
      to: to || undefined,
      search: debouncedSearch || undefined,
    }),
    [typeFilter, statusFilter, from, to, debouncedSearch],
  );

  const requestIdRef = useRef(0);

  const fetchPage = useCallback(
    async (offset: number, replace: boolean) => {
      const reqId = ++requestIdRef.current;
      if (replace) setFetching(true);
      else setLoadingMore(true);

      try {
        const data = await fetchLeads({
          ...currentFilters(),
          offset,
          limit: pageSize,
        });
        if (reqId !== requestIdRef.current) return;
        setLeads((curr) => (replace ? data.items : [...curr, ...data.items]));
        setTotalCount(data.total);
        setHasMore(data.hasMore);
      } catch (err: unknown) {
        if (reqId !== requestIdRef.current) return;
        const message = err instanceof Error ? err.message : "Error al cargar leads";
        toast({ title: "Error al cargar leads", description: message, variant: "destructive" });
      } finally {
        if (reqId === requestIdRef.current) {
          setFetching(false);
          setLoadingMore(false);
        }
      }
    },
    [currentFilters, pageSize, toast],
  );

  const refresh = useCallback(() => {
    fetchPage(0, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    fetchPage(leads.length, false);
  }, [fetchPage, leads.length]);

  useEffect(() => {
    if (isAdmin) fetchPage(0, true);
  }, [isAdmin, fetchPage]);

  const counts = useMemo(() => {
    const c = { total: totalCount, investor: 0, distributor: 0, new: 0 };
    for (const l of leads) {
      if (l.type === "investor") c.investor++;
      if (l.type === "distributor") c.distributor++;
      if (l.status === "new") c.new++;
    }
    return c;
  }, [leads, totalCount]);

  async function updateStatus(id: string, status: LeadStatus) {
    const previous = leads;
    setLeads((curr) => curr.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await updateLeadStatus(id, status);
    } catch (err: unknown) {
      setLeads(previous);
      const message = err instanceof Error ? err.message : "No se pudo actualizar";
      toast({ title: "No se pudo actualizar", description: message, variant: "destructive" });
    }
  }

  async function fetchAllFiltered(): Promise<Lead[] | null> {
    const all: Lead[] = [];
    let offset = 0;
    const maxRows = 50_000;
    while (offset < maxRows) {
      try {
        const data = await fetchLeads({
          ...currentFilters(),
          offset,
          limit: EXPORT_BATCH_SIZE,
        });
        all.push(...data.items);
        if (!data.hasMore || data.items.length < EXPORT_BATCH_SIZE) break;
        offset += EXPORT_BATCH_SIZE;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al exportar";
        toast({ title: "Error al exportar", description: message, variant: "destructive" });
        return null;
      }
    }
    return all;
  }

  async function exportCsv() {
    setExporting("csv");
    try {
      const rows = await fetchAllFiltered();
      if (!rows) return;
      const headers = ["createdAt", "type", "status", "name", "email", "organization", "message", "extra"];
      const escape = (v: unknown) => {
        const s = v === null || v === undefined ? "" : typeof v === "string" ? v : JSON.stringify(v);
        return `"${s.replace(/"/g, '""')}"`;
      };
      const body = rows.map((l) =>
        [l.createdAt, l.type, l.status, l.name, l.email, l.organization, l.message, l.extra]
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
      doc.text("ElectricAutomaticChile - Leads", 40, 40);
      doc.setFontSize(10);
      doc.setTextColor(100);
      const filterParts = [
        `Generado: ${stampStr}`,
        `Tipo: ${typeFilter === "all" ? "Todos" : TYPE_LABEL[typeFilter]}`,
        `Estado: ${statusFilter === "all" ? "Todos" : STATUS_LABEL[statusFilter]}`,
        from ? `Desde: ${from}` : null,
        to ? `Hasta: ${to}` : null,
        debouncedSearch ? `Busqueda: "${debouncedSearch}"` : null,
        `Resultados: ${rows.length}`,
      ].filter(Boolean);
      doc.text(filterParts.join("  |  "), 40, 58);

      autoTable(doc, {
        startY: 75,
        head: [["Fecha", "Tipo", "Estado", "Nombre", "Email", "Organizacion", "Mensaje"]],
        body: rows.map((l) => [
          new Date(l.createdAt).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" }),
          TYPE_LABEL[l.type],
          STATUS_LABEL[l.status],
          l.name,
          l.email,
          l.organization ?? "-",
          l.message ?? "-",
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
            `Pagina ${data.pageNumber} de ${page}`,
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

  async function handleSignOut() {
    await signOut();
    navigate("/auth", { replace: true });
  }

  if (loading || !isAdmin) {
    return (
      <SiteLayout>
        <div className="container mx-auto py-24 text-center text-muted-foreground">Cargando...</div>
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
              Sesion: <span className="text-foreground">{user?.correo ?? user?.email ?? user?.nombre}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refresh} disabled={fetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
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
                  placeholder="Buscar por nombre, email, organizacion..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as LeadTypeFilter)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="investor">Inversor</SelectItem>
                  <SelectItem value="distributor">Distribuidora</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as LeadStatusFilter)}>
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
                  <TableHead>Organizacion</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead className="w-[160px]">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      {fetching ? "Cargando..." : "Sin resultados con los filtros actuales."}
                    </TableCell>
                  </TableRow>
                )}
                {leads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(l.createdAt).toLocaleString("es-CL", {
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
                    <TableCell className="text-sm">{l.organization ?? "-"}</TableCell>
                    <TableCell className="max-w-[280px] truncate text-sm text-muted-foreground" title={l.message ?? undefined}>
                      {l.message ?? "-"}
                    </TableCell>
                    <TableCell>
                      <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as LeadStatus)}>
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
            <span className="text-sm text-muted-foreground">Por pagina</span>
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
                  Cargando...
                </>
              ) : hasMore ? (
                "Cargar mas"
              ) : (
                "No hay mas"
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
