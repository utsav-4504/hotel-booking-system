import React from "react";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  className = ""
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800",
    gold:
      "bg-yellow-500 text-slate-900 hover:bg-yellow-400",
    outline:
      "border border-slate-300 text-slate-900 hover:bg-slate-100",
    danger:
      "bg-red-600 text-white hover:bg-red-500",
    success:
      "bg-green-600 text-white hover:bg-green-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-7 py-4 text-lg"
  };

  const width = fullWidth ? "w-full" : "";
  const state = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${width} ${state} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;