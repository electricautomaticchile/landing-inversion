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
import { investorSchema, submitInvestorLead } from "@/lib/forms/leads";

const tickets = [
  "USD 5K – 10K",
  "USD 10K – 25K",
  "USD 25K – 50K",
  "USD 50K – 80K (lead)",
  "Solo quiero conocer la oportunidad",
];

export const InvestorForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ticket, setTicket] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      ticket,
      message: String(fd.get("message") ?? ""),
    };
    const parsed = investorSchema.safeParse(raw);
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
      await submitInvestorLead(parsed.data);
      navigate("/gracias");
    } catch (err) {
      console.error(err);
      toast({
        title: "No pudimos enviar tu mensaje",
        description: "Intenta nuevamente o escríbenos por email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" name="name" required maxLength={120} placeholder="Tu nombre" />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required maxLength={255} placeholder="tucorreo@fondo.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="organization">Fondo / empresa</Label>
          <Input id="organization" name="organization" maxLength={200} placeholder="Acme Ventures" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ticket">Ticket estimado</Label>
        <Select value={ticket} onValueChange={setTicket}>
          <SelectTrigger id="ticket">
            <SelectValue placeholder="Selecciona un rango" />
          </SelectTrigger>
          <SelectContent>
            {tickets.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
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
          placeholder="Cuéntanos brevemente tu tesis o qué te interesa de ElectricAutomaticChile."
        />
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
          "Solicitar pitch deck completo"
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        Te responderemos en menos de 48 horas hábiles. Tus datos solo se usan
        para este contacto.
      </p>
    </form>
  );
};