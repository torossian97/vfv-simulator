import React from "react";

export function Select({ value, onValueChange, children }) {
  return (
    <select
      className="w-full border rounded px-3 py-2 mt-1 text-sm"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <div className={`border rounded px-3 py-2 ${className}`}>{children}</div>
  );
}

export function SelectValue({ placeholder }) {
  return <option disabled>{placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
