import React from "react";
import { cn } from "@/lib/utils";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={cn(
          "relative bg-slate-600 rounded-lg shadow-lg w-full max-w-2xl p-6 scale-up-top-normal",
          className
        )}
        style={{
          transformOrigin: "center 0%", // This ensures animation starts from top
          perspective: "1000px",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-fg hover:text-foreground transition-colors"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
