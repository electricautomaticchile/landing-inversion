import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { es } from "@/i18n/es";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="" className="h-10 w-10" />
              <span className="text-lg font-semibold">{es.brand.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-secondary-foreground/70">
              {es.brand.tagline}. Hardware, software y datos para la próxima red
              eléctrica de Latinoamérica.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">{es.footer.sections.solutions}</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/75">
              <li>
                <Link to="/inversores" className="hover:text-primary transition-colors">
                  {es.footer.links.forInvestors}
                </Link>
              </li>
              <li>
                <Link to="/distribuidoras" className="hover:text-primary transition-colors">
                  {es.footer.links.forDistributors}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">{es.footer.sections.contact}</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/75">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${es.brand.contactEmail}`}
                  className="hover:text-primary transition-colors"
                >
                  {es.brand.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Santiago, Chile
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-secondary-foreground/60">
          <p>
            © {year} {es.brand.name}. {es.footer.rights}
          </p>
          <p>{es.footer.builtIn}</p>
        </div>
      </div>
    </footer>
  );
};