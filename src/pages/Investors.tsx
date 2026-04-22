import { useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  DollarSign,
  Globe2,
  Mail,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InvestorForm } from "@/components/sections/InvestorForm";
import { es } from "@/i18n/es";

const stats = [
  { value: "USD 3.4M", label: "/ año desperdicia solo Chilquinta" },
  { value: "89.000", label: "reposiciones manuales / año" },
  { value: "24–48 h", label: "tiempo promedio de reposición" },
];

const traction = [
  "Hardware ESP32 + 4G",
  "Backend Go (22 APIs)",
  "Frontend Next.js",
  "Apps Flutter (iOS + Android)",
  "Infra AWS productiva",
  "IA integrada",
];

const useOfFunds = [
  { label: "Certificaciones SEC / SUBTEL", pct: 25, color: "bg-primary" },
  { label: "Piloto 250 dispositivos", pct: 35, color: "bg-foreground" },
  { label: "Equipo comercial", pct: 25, color: "bg-success" },
  { label: "Go-to-market & marketing", pct: 15, color: "bg-muted-foreground" },
];

const milestones = [
  { q: "Mes 1–3", t: "Cierre de ronda + certificaciones iniciadas" },
  { q: "Mes 3–6", t: "Piloto 250 dispositivos en distribuidora aliada" },
  { q: "Mes 6–9", t: "Primer contrato comercial (2.000 unidades)" },
  { q: "Mes 9–12", t: "MRR ~USD 37K, preparación Serie A USD 500K–1M" },
];

const risks = [
  {
    risk: "Ciclo de venta largo en distribuidoras",
    mit: "Entrada por cooperativas rurales (decisión rápida) + piloto pagado.",
  },
  {
    risk: "Competencia de soluciones AMI tradicionales",
    mit: "Costo 5x menor y despliegue 30 min vs. años. Ventana antes de roll-outs masivos.",
  },
  {
    risk: "Dependencia regulatoria SEC",
    mit: "Certificaciones en proceso. Asesor regulatorio ya integrado al equipo.",
  },
  {
    risk: "Hardware en terreno",
    mit: "Componentes industriales probados, OTA updates, garantía y reposición incluidas.",
  },
];

const Investors = () => {
  useEffect(() => {
    document.title = "Inversores · ElectricAutomaticChile";
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="container mx-auto py-20 md:py-28 relative">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Rocket className="h-3 w-3 text-primary" /> Ronda pre-semilla abierta
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Buscamos <span className="text-gradient-amber">USD 50–80K</span> para
              escalar la red eléctrica inteligente de Chile.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Hardware en producción, software completo, mercado de 5M+ medidores.
              Buscamos capital para certificaciones, piloto comercial y equipo
              de ventas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Solicitar pitch deck
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-foreground/20"
              >
                <a href={`mailto:${es.brand.contactEmail}?subject=Hablar con el fundador`}>
                  <Mail className="h-4 w-4" /> Hablar con el fundador
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem stats */}
      <Section title="El problema, en cifras" eyebrow="Mercado">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label} className="p-8 text-center shadow-card">
              <p className="text-4xl md:text-5xl font-bold text-gradient-amber">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground max-w-2xl">
          Las distribuidoras chilenas pierden miles de millones cada año en
          visitas a terreno, lecturas manuales y reposición de servicio.
          Nuestra solución corta ese costo de raíz.
        </p>
      </Section>

      {/* Solution comparison */}
      <Section
        title="Retrofit no invasivo vs. AMI tradicional"
        eyebrow="Solución"
        dark
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8 bg-background/5 border-secondary-foreground/10 text-secondary-foreground">
            <p className="text-xs uppercase tracking-widest text-secondary-foreground/60">
              AMI tradicional
            </p>
            <h3 className="mt-2 text-2xl font-bold">USD 200–500 / medidor</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
              <li>· Reemplazo total del medidor</li>
              <li>· Despliegue: 3 a 5 años</li>
              <li>· Inversión inicial millonaria</li>
              <li>· Resistencia política y regulatoria</li>
            </ul>
          </Card>
          <Card className="p-8 bg-primary/10 border-primary/40 text-secondary-foreground shadow-glow">
            <p className="text-xs uppercase tracking-widest text-primary">
              ElectricAutomaticChile
            </p>
            <h3 className="mt-2 text-2xl font-bold">USD 37–150 / dispositivo</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/90">
              <li>· Se instala sobre el medidor existente</li>
              <li>· Despliegue: 30 minutos por unidad</li>
              <li>· CAPEX bajo, modelo SaaS recurrente</li>
              <li>· Mismo resultado funcional que AMI</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Traction */}
      <Section title="MVP completo, no slideware" eyebrow="Tracción técnica">
        <div className="flex flex-wrap gap-3">
          {traction.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium"
            >
              <CheckCircle2 className="h-4 w-4 text-success" /> {t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground max-w-2xl">
          Toda la pila tecnológica está construida y operativa. La inversión
          financia ventas, certificaciones y manufactura — no I+D base.
        </p>
      </Section>

      {/* Market */}
      <Section title="5M+ medidores en Chile, expansión LATAM" eyebrow="Mercado">
        <div className="grid gap-6 md:grid-cols-3">
          <MarketCard
            label="TAM"
            value="LATAM"
            description="Brasil, Colombia, Perú, México y Chile suman más de 200M medidores eléctricos residenciales."
            icon={<Globe2 className="h-6 w-6" />}
          />
          <MarketCard
            label="SAM"
            value="Chile"
            description="5M+ medidores residenciales y PYME, todos retrofit-compatibles. Marco SEC presiona modernización."
            icon={<Target className="h-6 w-6" />}
          />
          <MarketCard
            label="SOM 12 meses"
            value="10–20K disp."
            description="Cooperativas rurales y un piloto con distribuidora mediana son la entrada realista a 12 meses."
            icon={<TrendingUp className="h-6 w-6" />}
          />
        </div>
      </Section>

      {/* Unit economics */}
      <Section title="Unit economics" eyebrow="Modelo">
        <Card className="overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <Th>Volumen</Th>
                  <Th>Costo / dispositivo</Th>
                  <Th>Precio venta</Th>
                  <Th>Margen bruto</Th>
                  <Th>Fee SaaS / mes</Th>
                </tr>
              </thead>
              <tbody>
                <Row cells={["250 uds (piloto)", "USD 75", "USD 150", "50%", "USD 4 / disp"]} />
                <Row cells={["1.000 uds", "USD 55", "USD 110", "50%", "USD 3 / disp"]} />
                <Row cells={["10.000 uds", "USD 37", "USD 80", "54%", "USD 2 / disp"]} />
              </tbody>
            </table>
          </div>
        </Card>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <KpiCard label="MRR objetivo año 2" value="USD 37K" />
          <KpiCard label="LTV / CAC objetivo" value="> 5x" />
          <KpiCard label="Margen blended" value="50–55%" />
        </div>
      </Section>

      {/* The Round */}
      <Section title="La ronda" eyebrow="Inversión" dark>
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">
              USD <span className="text-primary">50K – 80K</span> pre-semilla
            </h3>
            <p className="mt-4 text-secondary-foreground/80">
              SAFE / nota convertible. Posiciona para Serie A de USD 500K–1M
              al alcanzar piloto comercial validado y MRR consistente.
            </p>
            <div className="mt-6 space-y-3">
              {milestones.map((m) => (
                <div key={m.q} className="flex gap-3">
                  <span className="shrink-0 inline-flex h-7 min-w-[80px] items-center justify-center rounded-md bg-primary/15 text-primary text-xs font-semibold">
                    {m.q}
                  </span>
                  <span className="text-sm text-secondary-foreground/85">{m.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-secondary-foreground/60 mb-4">
              Uso de fondos
            </p>
            <div className="space-y-4">
              {useOfFunds.map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{f.label}</span>
                    <span className="font-semibold">{f.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary-foreground/10 overflow-hidden">
                    <div className={`h-full ${f.color}`} style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Why now */}
      <Section title="¿Por qué ahora?" eyebrow="Timing">
        <div className="grid gap-6 md:grid-cols-3">
          <ReasonCard
            icon={<Zap className="h-5 w-5" />}
            title="Ventana AMI cerrándose"
            text="Las distribuidoras evalúan ahora cómo modernizar su parque. Quien no entre en los próximos 18 meses queda fuera."
          />
          <ReasonCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Presión SEC creciente"
            text="Multas por mala calidad de servicio y reclamos están al alza. Reducirlos es CFO-priority."
          />
          <ReasonCard
            icon={<Cpu className="h-5 w-5" />}
            title="Founder con sistema en producción"
            text="No es prototipo: hardware, backend, app y dashboard funcionan hoy. Es escalar lo que ya existe."
          />
        </div>
      </Section>

      {/* Roadmap */}
      <Section title="Roadmap a 12 meses" eyebrow="Ejecución">
        <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
          {milestones.map((m, i) => (
            <li key={m.q} className="relative">
              <div className="absolute -top-3 left-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {i + 1}
              </div>
              <Card className="p-5 pt-7 shadow-card h-full">
                <p className="text-xs font-semibold text-primary">{m.q}</p>
                <p className="mt-2 text-sm">{m.t}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Risks */}
      <Section title="Riesgos y mitigaciones" eyebrow="Transparencia">
        <div className="grid gap-4 md:grid-cols-2">
          {risks.map((r) => (
            <Card key={r.risk} className="p-6 shadow-card">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{r.risk}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.mit}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Form */}
      <section id="contact" className="bg-muted/40 border-t border-border">
        <div className="container mx-auto py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                Contacto
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                Solicitar pitch deck completo
              </h2>
              <p className="mt-4 text-muted-foreground">
                Déjanos tus datos y te enviaremos el deck completo, métricas
                actualizadas y agendamos una llamada de 30 minutos con el
                fundador.
              </p>
              <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <p>
                  También aceptamos rondas más pequeñas (USD 5K+) de inversores
                  ángeles del sector energía o IoT.
                </p>
              </div>
            </div>
            <Card className="p-6 md:p-8 shadow-card">
              <InvestorForm />
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const Section = ({
  title,
  eyebrow,
  children,
  dark,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <section
    className={`border-b border-border ${
      dark ? "bg-secondary text-secondary-foreground border-secondary-foreground/10" : ""
    }`}
  >
    <div className="container mx-auto py-16 md:py-20">
      <p
        className={`text-xs uppercase tracking-widest font-semibold ${
          dark ? "text-primary" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider">
    {children}
  </th>
);
const Row = ({ cells }: { cells: string[] }) => (
  <tr className="border-t border-border">
    {cells.map((c, i) => (
      <td key={i} className="px-4 py-4 text-foreground">
        {c}
      </td>
    ))}
  </tr>
);

const KpiCard = ({ label, value }: { label: string; value: string }) => (
  <Card className="p-5 shadow-card">
    <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="mt-1 text-2xl font-bold">{value}</p>
  </Card>
);

const MarketCard = ({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className="p-6 shadow-card">
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
      {label}
    </p>
    <p className="mt-1 text-2xl font-bold">{value}</p>
    <p className="mt-3 text-sm text-muted-foreground">{description}</p>
  </Card>
);

const ReasonCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <Card className="p-6 shadow-card">
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{text}</p>
  </Card>
);

export default Investors;