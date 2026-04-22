import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);