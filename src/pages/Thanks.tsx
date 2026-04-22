import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { es } from "@/i18n/es";

const Thanks = () => (
  <SiteLayout>
    <section className="container mx-auto py-24 md:py-32 flex items-center justify-center">
      <div className="max-w-xl text-center animate-fade-in-up">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
          {es.thanks.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{es.thanks.subtitle}</p>
        <Button asChild className="mt-8 bg-foreground text-background hover:bg-foreground/90">
          <Link to="/">{es.thanks.cta}</Link>
        </Button>
      </div>
    </section>
  </SiteLayout>
);

export default Thanks;