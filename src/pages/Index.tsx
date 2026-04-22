import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Building2, Cpu, Radio, Zap } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { es } from "@/i18n/es";

const Index = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" aria-hidden />
        <div className="container mx-auto py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Zap className="h-3 w-3 text-primary" /> {es.home.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              {es.home.title}{" "}
              <span className="text-gradient-amber">{es.home.titleAccent}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {es.home.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <Badge icon={<Cpu className="h-3 w-3" />} text="Hardware ESP32 + 4G" />
              <Badge icon={<Radio className="h-3 w-3" />} text="Lectura cada 30s" />
              <Badge icon={<Zap className="h-3 w-3" />} text="Corte y reposición remota" />
            </div>
          </div>
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
