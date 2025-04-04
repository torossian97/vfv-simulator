import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function SummaryPanel({ result }) {
  const { finalValue, totalShares, avgCost, irr, maxDrawdown } = result;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Final Portfolio Value</p>
          <p className="text-xl font-semibold">
            ${finalValue.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Total Shares Accumulated
          </p>
          <p className="text-xl font-semibold">{totalShares.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Average Share Price</p>
          <p className="text-xl font-semibold">${avgCost.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Internal Rate of Return (IRR)
          </p>
          <p className="text-xl font-semibold">
            {isFinite(irr) ? `${(irr * 100).toFixed(2)}%` : "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Max Drawdown</p>
          <p className="text-xl font-semibold">
            {(maxDrawdown * 100).toFixed(2)}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
