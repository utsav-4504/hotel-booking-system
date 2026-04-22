import React from "react";

function SectionTitle({
  tag = "",
  title,
  subtitle = "",
  center = false,
  light = false
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      {tag && (
        <p
          className={`uppercase tracking-[0.28em] text-sm font-semibold ${
            light ? "text-yellow-400" : "text-yellow-500"
          }`}
        >
          {tag}
        </p>
      )}

      <h2
        className={`mt-3 text-3xl md:text-5xl font-bold leading-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg leading-8 ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;