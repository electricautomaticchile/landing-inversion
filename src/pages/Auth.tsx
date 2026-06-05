import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useAuth } from "@/hooks/useAuth";
import { loginEmpresa } from "@/lib/api/client";

const credsSchema = z.object({
  email: z.string().trim().email("Email no válido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres").max(72),
});

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) {
      navigate(isAdmin ? "/admin" : "/", { replace: true });
    }
  }, [session, isAdmin, loading, navigate]);

  async function handleSignIn() {
    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: "Datos inválidos", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }

    setBusy(true);
    try {
      await loginEmpresa(parsed.data);
      navigate("/admin", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      toast({ title: "No pudimos iniciar sesión", description: msg, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <section className="container mx-auto py-16 md:py-24 max-w-md">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Acceso al panel</CardTitle>
            <CardDescription>Usa las credenciales de empresa del backend.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSignIn();
                }}
              />
            </div>
            <Button className="w-full" disabled={busy} onClick={handleSignIn}>
              {busy ? "Entrando..." : "Iniciar sesión"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}
