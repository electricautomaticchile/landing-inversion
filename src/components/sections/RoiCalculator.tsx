import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Simple, client-only ROI estimator for distributoras.
 * No backend; pure derived values.
 * Assumptions are conservative and shown to the user.
 */
export const RoiCalculator = () => {
  const [meters, setMeters] = useState(2000);
  const [crewCost, setCrewCost] = useState(35000); // CLP por visita
  const [reposPerMonth, setReposPerMonth] = useState(220);
  const [devicePrice, setDevicePrice] = useState(80); // USD por dispositivo

  const result = useMemo(() => {
    const clpPerUsd = 950;
    const annualCrewSavings = reposPerMonth * 12 * crewCost * 0.85; // 85% reducción
    const annualSavingsUsd = annualCrewSavings / clpPerUsd;
    const investment = meters * devicePrice;
    const paybackMonths = annualSavingsUsd > 0 ? (investment / annualSavingsUsd) * 12 : 0;
    return {
      annualSavingsUsd: Math.round(annualSavingsUsd),
      investment,
      paybackMonths: Math.max(1, Math.round(paybackMonths)),
    };
  }, [meters, crewCost, reposPerMonth, devicePrice]);

  return (
    <Card className="p-6 md:p-8 shadow-card">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-4">
          <Field
            label="Nº de medidores a instrumentar"
            value={meters}
            min={100}
            step={100}
            onChange={setMeters}
          />
          <Field
            label="Costo promedio cuadrilla por visita (CLP)"
            value={crewCost}
            min={5000}
            step={1000}
            onChange={setCrewCost}
          />
          <Field
            label="Reposiciones / cortes manuales por mes"
            value={reposPerMonth}
            min={1}
            step={10}
            onChange={setReposPerMonth}
          />
          <Field
            label="Precio por dispositivo (USD)"
            value={devicePrice}
            min={30}
            step={5}
            onChange={setDevicePrice}
          />
        </div>
        <div className="rounded-xl bg-secondary text-secondary-foreground p-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-secondary-foreground/60">
            Resultado estimado
          </p>
          <div className="mt-4">
            <p className="text-sm text-secondary-foreground/70">Ahorro anual estimado</p>
            <p className="text-3xl md:text-4xl font-bold text-primary">
              USD {result.annualSavingsUsd.toLocaleString("es-CL")}
            </p>
          </div>
          <div className="mt-5">
            <p className="text-sm text-secondary-foreground/70">Inversión inicial</p>
            <p className="text-xl font-semibold">
              USD {result.investment.toLocaleString("es-CL")}
            </p>
          </div>
          <div className="mt-5">
            <p className="text-sm text-secondary-foreground/70">Payback</p>
            <p className="text-xl font-semibold">~ {result.paybackMonths} meses</p>
          </div>
          <p className="mt-6 text-[11px] text-secondary-foreground/50 leading-relaxed">
            * Estimación referencial: 85% reducción en visitas en terreno y tipo
            de cambio CLP 950/USD. Los valores reales se ajustan al contrato.
          </p>
        </div>
      </div>
    </Card>
  );
};

const Field = ({
  label,
  value,
  onChange,
  min,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  step: number;
}) => (
  <div className="grid gap-2">
    <Label className="text-sm">{label}</Label>
    <Input
      type="number"
      value={value}
      min={min}
      step={step}
      onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
    />
  </div>
);