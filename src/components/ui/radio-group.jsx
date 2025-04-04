import React from "react";

export function RadioGroup({ value, onValueChange, children, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`} role="radiogroup">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
}

export function RadioGroupItem({ value, id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        id={id}
        name="strategy"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio text-blue-600"
      />
      <span>{label}</span>
    </label>
  );
}
