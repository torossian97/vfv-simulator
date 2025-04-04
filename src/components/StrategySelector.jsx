import React from "react";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function StrategySelector({ value, onChange, config, onConfigChange }) {
  const handleConfigChange = (field, val) => {
    onConfigChange({ ...config, [field]: val });
  };

  return (
    <div className="p-4 border rounded-xl shadow space-y-4">
      <div>
        <Label className="text-lg font-semibold">Investment Strategy</Label>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-2 mt-2"
        >
          <RadioGroupItem
            value="cashOnly"
            id="cashOnly"
            label="Cash (no investing, just cash decay)"
          />
          <RadioGroupItem value="lumpSum" id="lumpSum" label="Lump Sum" />
          <RadioGroupItem value="dca" id="dca" label="Regular DCA" />
          <RadioGroupItem
            value="adaptiveDca"
            id="adaptiveDca"
            label="Adaptive DCA (buy more on dips)"
          />
          <RadioGroupItem
            value="exponentialDca"
            id="exponentialDca"
            label="Exponential DCA (reactive to drops)"
          />
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="initialCash">Initial Cash ($)</Label>
        <input
          id="initialCash"
          type="number"
          value={config.initialCash}
          onChange={(e) =>
            handleConfigChange("initialCash", parseFloat(e.target.value))
          }
          className="w-full border rounded px-3 py-1"
        />

        {(value === "dca" ||
          value === "adaptiveDca" ||
          value === "exponentialDca") && (
          <>
            <Label htmlFor="weeklyDca">DCA Amount ($)</Label>
            <input
              id="weeklyDca"
              type="number"
              value={config.weeklyDca}
              onChange={(e) =>
                handleConfigChange("weeklyDca", parseFloat(e.target.value))
              }
              className="w-full border rounded px-3 py-1"
            />
          </>
        )}

        {value === "dca" && (
          <>
            <Label htmlFor="dcaFrequency">DCA Frequency (weeks)</Label>
            <input
              id="dcaFrequency"
              type="number"
              value={config.dcaFrequency ?? 1}
              onChange={(e) =>
                handleConfigChange("dcaFrequency", parseInt(e.target.value))
              }
              className="w-full border rounded px-3 py-1"
            />
          </>
        )}

        {value === "cashOnly" && (
          <>
            <Label htmlFor="cashDecayRate">Annual Cash Decay Rate (%)</Label>
            <input
              id="cashDecayRate"
              type="number"
              value={config.cashDecayRate ?? 0}
              onChange={(e) =>
                handleConfigChange("cashDecayRate", parseFloat(e.target.value))
              }
              className="w-full border rounded px-3 py-1"
            />
          </>
        )}
      </div>

      {(value === "adaptiveDca" || value === "exponentialDca") && (
        <div className="space-y-2">
          <Label className="text-md font-semibold">DCA Rules</Label>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="drop10">
                Drop ≥ 10% (percent of initial cash)
              </Label>
              <input
                id="drop10"
                type="number"
                value={config.drop10 || ""}
                onChange={(e) =>
                  handleConfigChange("drop10", parseFloat(e.target.value))
                }
                className="w-full border rounded px-3 py-1"
              />
            </div>
            <div>
              <Label htmlFor="drop20">Drop ≥ 20%</Label>
              <input
                id="drop20"
                type="number"
                value={config.drop20 || ""}
                onChange={(e) =>
                  handleConfigChange("drop20", parseFloat(e.target.value))
                }
                className="w-full border rounded px-3 py-1"
              />
            </div>
            <div>
              <Label htmlFor="drop30">Drop ≥ 30%</Label>
              <input
                id="drop30"
                type="number"
                value={config.drop30 || ""}
                onChange={(e) =>
                  handleConfigChange("drop30", parseFloat(e.target.value))
                }
                className="w-full border rounded px-3 py-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
