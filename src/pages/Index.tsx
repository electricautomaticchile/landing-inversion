import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Cpu,
  Gauge,
  ImageIcon,
  Radio,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { es } from "@/i18n/es";

const imageSlots = {
  device: "/images/landing/device-installation.jpg",
  dashboard: "/images/landing/dashboard-preview.jpg",
};

const Index = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" aria-hidden />
        <div className="container mx-auto pb-12 pt-8 md:py-24 relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="max-w-3xl animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Zap className="h-3 w-3 text-primary" /> {es.home.eyebrow}
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {es.home.title}{" "}
                <span className="text-gradient-amber">{es.home.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es.home.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/distribuidoras">
                    Ver solución B2B
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/inversores">Ver oportunidad de inversión</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <Badge icon={<Cpu className="h-3 w-3" />} text="Hardware ESP32 + 4G" />
                <Badge icon={<Radio className="h-3 w-3" />} text="Lectura cada 30s" />
                <Badge icon={<Zap className="h-3 w-3" />} text="Corte y reposición remota" />
              </div>
            </div>

            <ProductPreview />
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="container mx-auto pb-16">
        <div className="grid gap-3 rounded-2xl border border-border bg-card/70 p-4 shadow-card md:grid-cols-3">
          <ProofItem icon={<Gauge className="h-4 w-4" />} title="Retrofit" text="Instalación sobre medidores y tableros existentes." />
          <ProofItem icon={<ShieldCheck className="h-4 w-4" />} title="Operación remota" text="Lectura, alertas, corte y reposición desde plataforma." />
          <ProofItem icon={<BarChart3 className="h-4 w-4" />} title="Datos accionables" text="Consumo, deuda y eventos listos para integración." />
        </div>
      </section>

      {/* Audience selector */}
      <section className="container mx-auto pb-24 md:pb-32">
        <h2 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8">
          {es.home.chooseAudience}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          <AudienceCard
            to="/inversores"
            icon={<Briefcase className="h-6 w-6" />}
            label={es.home.investorCard.label}
            title={es.home.investorCard.title}
            description={es.home.investorCard.description}
            cta={es.home.investorCard.cta}
          />
          <AudienceCard
            to="/distribuidoras"
            icon={<Building2 className="h-6 w-6" />}
            label={es.home.distributorCard.label}
            title={es.home.distributorCard.title}
            description={es.home.distributorCard.description}
            cta={es.home.distributorCard.cta}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          ¿Otra consulta?{" "}
          <a
            className="text-primary hover:underline font-medium"
            href={`mailto:${es.brand.contactEmail}`}
          >
            Escríbenos directamente
          </a>
        </p>
      </section>
    </SiteLayout>
  );
};

const ProductPreview = () => (
  <div className="relative mx-auto w-full max-w-xl">
    <div className="absolute -inset-6 rounded-[2rem] bg-gradient-amber opacity-20 blur-3xl" aria-hidden />
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-glow">
      <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1fr]">
        <AssetSlot
          src={imageSlots.device}
          label="Imagen del dispositivo instalado"
          className="min-h-[260px]"
        >
          <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-primary/35 bg-muted p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <ImageIcon className="h-4 w-4" />
              Foto del dispositivo
            </div>
            <div className="space-y-4">
              <div className="mx-auto flex h-28 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-background shadow-soft">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-primary/30" />
                <div className="h-2 w-2/3 rounded-full bg-muted-foreground/20" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Reemplazar por instalación real en tablero o medidor.</p>
          </div>
        </AssetSlot>

        <div className="space-y-4">
          <AssetSlot
            src={imageSlots.dashboard}
            label="Captura de dashboard operativo"
            className="min-h-[150px]"
          >
            <div className="h-full rounded-xl border border-dashed border-primary/35 bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Dashboard</p>
                  <p className="text-sm text-muted-foreground">Lectura en vivo</p>
                </div>
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["kWh", "V", "A"].map((label, index) => (
                  <div key={label} className="rounded-lg bg-muted p-3">
                    <div className="text-lg font-bold">{index === 0 ? "14.8" : index === 1 ? "221" : "8.1"}</div>
                    <div className="text-[10px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-16 rounded-lg bg-gradient-amber opacity-80" />
            </div>
          </AssetSlot>

          <div className="grid gap-3">
            {["Lectura cada 30 segundos", "Alertas de evento", "API para distribuidoras"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AssetSlot = ({
  src,
  label,
  className,
  children,
}: {
  src: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const [failed, setFailed] = useState(false);
  const canShowImage = src && !failed;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className ?? ""}`}>
      {canShowImage ? (
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        children
      )}
    </div>
  );
};

const ProofItem = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="flex gap-3 rounded-xl bg-background/70 p-4">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  </div>
);

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-foreground/80">
    {icon} {text}
  </span>
);

interface AudienceCardProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  cta: string;
}

const AudienceCard = ({ to, icon, label, title, description, cta }: AudienceCardProps) => (
  <Link
    to={to}
    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-primary/40"
  >
    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-amber opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
    <div className="relative">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">
        {label}
      </p>
      <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default Index;
