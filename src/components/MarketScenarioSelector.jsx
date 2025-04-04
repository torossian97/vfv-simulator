import React from "react";
import { Label } from "../components/ui/label";
import { Select, SelectItem } from "../components/ui/select";

const crashShapeOptions = [
  { label: "Linear Crash", value: "linear" },
  { label: "Volatile Crash", value: "volatile" },
];

export function MarketScenarioSelector({ value, onChange }) {
  const handleChange = (field, val) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="p-4 border rounded-xl shadow space-y-4">
      <Label className="text-lg font-semibold">Market Crash Scenario</Label>

      <div className="space-y-2">
        <Label htmlFor="crashPercent">Crash Severity (%)</Label>
        <input
          id="crashPercent"
          type="number"
          value={value.crashPercent}
          onChange={(e) =>
            handleChange("crashPercent", parseFloat(e.target.value))
          }
          className="w-full border rounded px-3 py-1"
        />

        <Label htmlFor="crashDurationMonths">Crash Duration (months)</Label>
        <input
          id="crashDurationMonths"
          type="number"
          value={value.crashDurationMonths}
          onChange={(e) =>
            handleChange("crashDurationMonths", parseFloat(e.target.value))
          }
          className="w-full border rounded px-3 py-1"
        />

        <Label htmlFor="crashShape">Crash Shape</Label>
        <Select
          value={value.crashShape ?? "linear"}
          onValueChange={(v) => handleChange("crashShape", v)}
        >
          {crashShapeOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>

        <Label htmlFor="recoveryType">Recovery Type</Label>
        <Select
          value={value.recoveryType}
          onValueChange={(val) => handleChange("recoveryType", val)}
        >
          <SelectItem value="flat">Flat (no recovery)</SelectItem>
          <SelectItem value="gradual">Gradual (with growth)</SelectItem>
        </Select>

        <Label htmlFor="growthRate">Avg Annual Growth (%)</Label>
        <input
          id="growthRate"
          type="number"
          step="0.1"
          value={value.growthRate ?? 0.07}
          onChange={(e) =>
            handleChange("growthRate", parseFloat(e.target.value))
          }
          className="w-full border rounded px-3 py-1"
        />
      </div>
    </div>
  );
}
