import React from "react";

export function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
}
