import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TimeHorizonSelector({ value, onChange }) {
  return (
    <div className="p-4 border rounded-xl shadow">
      <Label className="text-lg font-semibold">Time Horizon</Label>
      <Select
        value={value.toString()}
        onValueChange={(v) => onChange(parseInt(v))}
      >
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3 years</SelectItem>
          <SelectItem value="5">5 years</SelectItem>
          <SelectItem value="7">7 years</SelectItem>
          <SelectItem value="10">10 years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
