import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useAuth } from "@/hooks/useAuth";

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

  async function handle(action: "signin" | "signup") {
    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: "Datos inválidos", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      if (action === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({ title: "Cuenta creada", description: "Iniciando sesión…" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      toast({ title: "No pudimos completar la acción", description: msg, variant: "destructive" });
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
            <CardDescription>
              Solo personal autorizado. El primer usuario registrado obtiene rol de administrador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="signin">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="signup">Crear cuenta</TabsTrigger>
              </TabsList>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <TabsContent value="signin" className="mt-4">
                <Button className="w-full" disabled={busy} onClick={() => handle("signin")}>
                  {busy ? "Entrando…" : "Iniciar sesión"}
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="mt-4">
                <Button className="w-full" disabled={busy} onClick={() => handle("signup")}>
                  {busy ? "Creando…" : "Crear cuenta"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}