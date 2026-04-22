import React from "react";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  icon = null,
  className = ""
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full ${
            icon ? "pl-11" : "pl-4"
          } pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-900 disabled:bg-slate-100 disabled:cursor-not-allowed`}
        />
      </div>
    </div>
  );
}

export default InputField;