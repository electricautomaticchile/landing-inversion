import { useEffect } from "react";
import {
  Activity,
  Building2,
  Cable,
  Check,
  Clock,
  Cloud,
  Cpu,
  Database,
  HardHat,
  Network,
  PhoneCall,
  ShieldCheck,
  Wifi,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DistributorForm } from "@/components/sections/DistributorForm";
import { RoiCalculator } from "@/components/sections/RoiCalculator";

const pains = [
  {
    icon: <HardHat className="h-5 w-5" />,
    title: "Cuadrillas en terreno todos los días",
    text: "Reposiciones manuales tras pago de cuentas atrasadas, cortes y lecturas mensuales. Costo logístico alto y creciente.",
  },
  {
    icon: <PhoneCall className="h-5 w-5" />,
    title: "Reclamos SEC por tiempos de respuesta",
    text: "Tiempos de reposición de 24 a 48 horas generan multas, escaladas y mala reputación.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Sin visibilidad en tiempo real",
    text: "Lecturas mensuales con errores manuales, anomalías que se detectan tarde, fraude difícil de identificar.",
  },
];

const steps = [
  {
    icon: <Cable className="h-5 w-5" />,
    title: "Instalación retrofit en 30 minutos",
    text: "Se monta sobre el medidor existente. No se reemplaza hardware ni se interrumpe el servicio.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Lectura automatizada cada 30s",
    text: "Datos de consumo y estado en tiempo real, sincronizados a tu plataforma o a la nuestra.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Corte y reposición remota",
    text: "Acción comandada desde el dashboard. Cero visitas en terreno para gestiones rutinarias.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Alertas con IA",
    text: "Detección automática de fraude, hurto, anomalías de consumo y caídas de servicio.",
  },
];

const beforeAfter = [
  {
    label: "Reposición de servicio",
    before: "24–48 horas, cuadrilla en terreno",
    after: "Segundos, comando remoto",
  },
  {
    label: "Lectura del consumo",
    before: "Mensual, manual, con errores",
    after: "Cada 30 segundos, automático",
  },
  {
    label: "Visibilidad para el cliente final",
    before: "Boleta una vez al mes",
    after: "App móvil con consumo en vivo",
  },
  {
    label: "Facturación",
    before: "Atrasada y con disputas",
    after: "Datos certeros, sin disputa",
  },
  {
    label: "Detección de anomalías",
    before: "Reactiva, días después",
    after: "Proactiva con alertas IA",
  },
];

const packages = [
  {
    name: "Piloto",
    units: "250 dispositivos",
    setup: "USD 2.500",
    monthly: "USD 1.000 / mes",
    features: [
      "Hardware + instalación incluida",
      "Dashboard web + apps móviles",
      "Soporte técnico dedicado",
      "Reportes mensuales",
    ],
  },
  {
    name: "Estándar",
    units: "2.000 dispositivos",
    setup: "USD 8.000",
    monthly: "USD 6.000 / mes",
    features: [
      "Todo lo del piloto",
      "Integración API a tus sistemas",
      "Alertas IA personalizadas",
      "SLA 99.5%",
    ],
    highlight: true,
  },
  {
    name: "Escala",
    units: "10.000+ dispositivos",
    setup: "A medida",
    monthly: "Desde USD 20.000 / mes",
    features: [
      "Todo lo del estándar",
      "Despliegue por fases",
      "Equipo dedicado en sitio",
      "SLA 99.9% + soporte 24/7",
    ],
  },
];

const faqs = [
  {
    q: "¿Reemplaza el medidor existente?",
    a: "No. Se monta sobre el medidor actual sin alterar su funcionamiento ni la facturación regulada. La lectura es paralela.",
  },
  {
    q: "¿Qué pasa si pierde conexión 4G?",
    a: "El dispositivo almacena lecturas localmente y las sincroniza al recuperar señal. No se pierden datos.",
  },
  {
    q: "¿Cumple normativa SEC?",
    a: "Las certificaciones SEC y SUBTEL están en proceso. La operación piloto se realiza bajo el marco existente y se adapta a cada distribuidora.",
  },
  {
    q: "¿Cómo se integra con SAP u otros sistemas internos?",
    a: "Vía API REST documentada. Soportamos webhooks, exportación periódica y conectores hacia los sistemas más comunes (SAP, Oracle, MDM propietarios).",
  },
  {
    q: "¿Cuánto demora un despliegue de 2.000 unidades?",
    a: "Aproximadamente 6 a 10 semanas, incluyendo coordinación logística y cuadrillas. Despliegues mayores se realizan por fases.",
  },
  {
    q: "¿Quién es dueño de los datos?",
    a: "La distribuidora. Los datos se almacenan en infraestructura AWS y son accesibles vía API y exportación.",
  },
  {
    q: "¿Qué garantía tienen los dispositivos?",
    a: "2 años de garantía contra defectos de fábrica, con reposición incluida. Componentes industriales calidad outdoor IP65.",
  },
];

const Distributors = () => {
  useEffect(() => {
    document.title = "Distribuidoras · ElectricAutomaticChile";
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToRoi = () => {
    document.getElementById("roi")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="container mx-auto py-20 md:py-28 relative">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Building2 className="h-3 w-3 text-primary" /> Para distribuidoras y cooperativas eléctricas
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Reposición en <span className="text-gradient-amber">segundos</span>,
              no en días.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Dispositivo IoT retrofit que se instala sobre el medidor existente.
              Reduce visitas en terreno, mejora indicadores SEC y entrega
              visibilidad en tiempo real sin reemplazar tu parque.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Agendar demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToRoi}
                className="border-foreground/20"
              >
                Ver ROI estimado
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pains */}
      <Section title="El dolor que ya conoces" eyebrow="Hoy">
        <div className="grid gap-6 md:grid-cols-3">
          {pains.map((p) => (
            <Card key={p.title} className="p-6 shadow-card">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {p.icon}
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section title="Cómo funciona" eyebrow="Solución" dark>
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <Card className="p-6 h-full bg-background/5 border-secondary-foreground/10 text-secondary-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-primary">{s.icon}</span>
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/75">{s.text}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Before / After */}
      <Section title="Antes vs. después" eyebrow="Impacto operativo">
        <Card className="overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">
                    Proceso
                  </th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">
                    Antes
                  </th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">
                    Después
                  </th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="px-4 py-4 font-medium">{row.label}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      <X className="inline h-4 w-4 text-destructive mr-1" />
                      {row.before}
                    </td>
                    <td className="px-4 py-4">
                      <Check className="inline h-4 w-4 text-success mr-1" />
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* ROI Calculator */}
      <Section
        id="roi"
        title="Calculadora de ROI"
        eyebrow="Simulación"
      >
        <RoiCalculator />
      </Section>

      {/* Pricing */}
      <Section title="Paquetes y pricing" eyebrow="Comercial">
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <Card
              key={p.name}
              className={`p-6 shadow-card flex flex-col ${
                p.highlight ? "border-primary shadow-glow ring-1 ring-primary/30" : ""
              }`}
            >
              {p.highlight && (
                <span className="self-start mb-3 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-xs font-semibold">
                  Más popular
                </span>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.units}</p>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Setup
                </p>
                <p className="text-lg font-semibold">{p.setup}</p>
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Recurrente
                </p>
                <p className="text-lg font-semibold">{p.monthly}</p>
              </div>
              <ul className="mt-5 space-y-2 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={scrollToForm}
                className={`mt-6 w-full ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                Solicitar este plan
              </Button>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Precios referenciales. Se ajustan según volumen, conectividad y nivel
          de integración requerido.
        </p>
      </Section>

      {/* Tech specs */}
      <Section title="Especificaciones técnicas" eyebrow="Producto">
        <Accordion type="single" collapsible className="rounded-xl border border-border bg-card divide-y divide-border">
          <Item
            value="hardware"
            icon={<Cpu className="h-5 w-5 text-primary" />}
            title="Hardware"
          >
            ESP32 dual-core, módem 4G LTE Cat-1, sensor de corriente CT, relé
            industrial para corte/reposición, gabinete IP65, fuente de
            alimentación parasitaria desde la línea.
          </Item>
          <Item
            value="conectividad"
            icon={<Wifi className="h-5 w-5 text-primary" />}
            title="Conectividad"
          >
            4G LTE multi-operador con SIM gestionada. Fallback a 2G donde el
            mercado lo requiera. Buffer local de hasta 30 días sin red.
          </Item>
          <Item
            value="cert"
            icon={<ShieldCheck className="h-5 w-5 text-primary" />}
            title="Certificaciones"
          >
            SEC y SUBTEL en proceso. Cumplimiento RoHS y CE en hardware.
            Documentación regulatoria entregada en cada despliegue.
          </Item>
          <Item
            value="api"
            icon={<Network className="h-5 w-5 text-primary" />}
            title="Integración"
          >
            API REST documentada (OpenAPI), webhooks de eventos, exportación
            CSV/Parquet. Conectores ejemplo para SAP IS-U y MDM propietarios.
          </Item>
          <Item
            value="security"
            icon={<Database className="h-5 w-5 text-primary" />}
            title="Seguridad"
          >
            TLS 1.3 punta a punta, firma firmware, OTA updates seguros, control
            de accesos por rol y auditoría completa.
          </Item>
        </Accordion>
      </Section>

      {/* Use cases */}
      <Section title="Casos de uso" eyebrow="A quién servimos" dark>
        <div className="grid gap-6 md:grid-cols-3">
          <UseCard
            title="Cooperativas rurales"
            text="Decisión rápida, alto dolor logístico por dispersión geográfica. Ideal para entrar y validar en terreno."
          />
          <UseCard
            title="Distribuidoras medianas"
            text="Piloto de 250–2.000 unidades en zonas críticas con alta morosidad o reclamos SEC."
          />
          <UseCard
            title="Grandes distribuidoras"
            text="Despliegue por fases tras piloto exitoso. Integración profunda con sistemas existentes."
          />
        </div>
      </Section>

      {/* Cloud architecture */}
      <Section title="Arquitectura cloud" eyebrow="Tecnología">
        <div className="grid gap-6 md:grid-cols-3">
          <ArchCard
            icon={<Cloud className="h-6 w-6" />}
            title="AWS productivo"
            text="Stack desplegado en AWS con autoescalamiento. Multi-AZ para alta disponibilidad."
          />
          <ArchCard
            icon={<Database className="h-6 w-6" />}
            title="Datos durables"
            text="Series temporales en bases optimizadas. Retención configurable, exportación nativa."
          />
          <ArchCard
            icon={<Clock className="h-6 w-6" />}
            title="SLA"
            text="99.5% en plan estándar, 99.9% en plan escala con monitoreo 24/7 y soporte dedicado."
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Preguntas frecuentes" eyebrow="FAQ">
        <Accordion type="single" collapsible className="rounded-xl border border-border bg-card divide-y divide-border">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="px-5 border-b-0">
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Form */}
      <section id="contact" className="bg-muted/40 border-t border-border">
        <div className="container mx-auto py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                Contacto comercial
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                Agendar demo técnica
              </h2>
              <p className="mt-4 text-muted-foreground">
                Te mostramos el dispositivo en vivo, el dashboard en operación
                y modelamos el ROI específico para tu parque de medidores.
                Tiempo estimado: 45 minutos.
              </p>
            </div>
            <Card className="p-6 md:p-8 shadow-card">
              <DistributorForm />
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
  id,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  dark?: boolean;
  id?: string;
}) => (
  <section
    id={id}
    className={`border-b border-border ${
      dark ? "bg-secondary text-secondary-foreground border-secondary-foreground/10" : ""
    }`}
  >
    <div className="container mx-auto py-16 md:py-20">
      <p className="text-xs uppercase tracking-widest font-semibold text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const Item = ({
  value,
  icon,
  title,
  children,
}: {
  value: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <AccordionItem value={value} className="px-5 border-b-0">
    <AccordionTrigger className="text-left">
      <span className="inline-flex items-center gap-3">
        {icon}
        {title}
      </span>
    </AccordionTrigger>
    <AccordionContent className="text-sm text-muted-foreground">
      {children}
    </AccordionContent>
  </AccordionItem>
);

const UseCard = ({ title, text }: { title: string; text: string }) => (
  <Card className="p-6 bg-background/5 border-secondary-foreground/10 text-secondary-foreground">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="mt-2 text-sm text-secondary-foreground/75">{text}</p>
  </Card>
);

const ArchCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <Card className="p-6 shadow-card">
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{text}</p>
  </Card>
);

export default Distributors;