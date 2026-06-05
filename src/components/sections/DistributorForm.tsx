import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { distributorSchema, submitDistributorLead } from "@/lib/forms/leads";
import { Turnstile } from "@/components/Turnstile";

const meterRanges = [
  "Menos de 1.000",
  "1.000 – 10.000",
  "10.000 – 100.000",
  "Más de 100.000",
];

export const DistributorForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [meters, setMeters] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      role: String(fd.get("role") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      email: String(fd.get("email") ?? ""),
      meterCount: meters,
      message: String(fd.get("message") ?? ""),
      turnstileToken,
    };
    const parsed = distributorSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString();
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await submitDistributorLead(parsed.data);
      navigate("/gracias");
    } catch (err) {
      console.error(err);
      toast({
        title: "No pudimos enviar tu solicitud",
        description: "Intenta nuevamente o escríbenos por email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre *</Label>
          <Input id="name" name="name" required maxLength={120} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Cargo</Label>
          <Input id="role" name="role" maxLength={120} placeholder="Gerente de operaciones" />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="organization">Distribuidora *</Label>
          <Input id="organization" name="organization" required maxLength={200} />
          {errors.organization && (
            <p className="text-xs text-destructive">{errors.organization}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email corporativo *</Label>
          <Input id="email" name="email" type="email" required maxLength={255} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="meters">Nº aproximado de medidores</Label>
        <Select value={meters} onValueChange={setMeters}>
          <SelectTrigger id="meters">
            <SelectValue placeholder="Selecciona un rango" />
          </SelectTrigger>
          <SelectContent>
            {meterRanges.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Cuéntanos qué problema operativo te gustaría resolver primero."
        />
      </div>
      <div className="grid gap-2">
        <Turnstile onVerify={setTurnstileToken} />
        {errors.turnstileToken && <p className="text-xs text-destructive">{errors.turnstileToken}</p>}
      </div>
      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          "Agendar demo técnica"
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        Coordinaremos una demo en menos de 48 horas hábiles.
      </p>
    </form>
  );
};
