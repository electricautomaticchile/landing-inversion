import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logo from "@/assets/logo.png";
import { es } from "@/i18n/es";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: es.nav.home },
  { to: "/inversores", label: es.nav.investors },
  { to: "/distribuidoras", label: es.nav.distributors },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label={es.brand.name}>
          <img
            src={logo}
            alt={`Logo ${es.brand.name}`}
            className="h-9 w-9 transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:inline-block font-semibold tracking-tight text-foreground">
            {es.brand.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAdmin && (
            <Button asChild size="sm" variant="outline">
              <Link to="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Panel
              </Link>
            </Button>
          )}
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled
                    aria-label="Cambiar idioma"
                    className="opacity-70"
                  >
                    ES / EN
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>{es.nav.languageTooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
            <a href={`mailto:${es.brand.contactEmail}`}>Contacto</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container mx-auto py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={`mailto:${es.brand.contactEmail}`}
              className="px-3 py-2 rounded-md text-sm font-medium text-primary"
            >
              {es.brand.contactEmail}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};