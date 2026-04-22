import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({
  isOpen = false,
  onClose,
  title = "Modal Title",
  children,
  size = "md"
}) {
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };

  return (
    <div className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8">
      {/* Backdrop Click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={`relative w-full ${sizes[size]} bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-200">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition flex items-center justify-center"
            aria-label="Close Modal"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;