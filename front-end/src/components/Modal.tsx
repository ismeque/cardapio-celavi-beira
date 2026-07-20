"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { CloseIcon } from "./Icons";

type Variant = "center" | "sheet" | "drawer";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: Variant;
  /** Rótulo acessível do diálogo. */
  label?: string;
  /** Mostra o botão de fechar flutuante. */
  showClose?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  variant = "center",
  label,
  showClose = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const positions: Record<Variant, string> = {
    center: "items-center justify-center p-4",
    sheet: "items-end justify-center sm:items-center",
    drawer: "items-stretch justify-end",
  };

  const panels: Record<Variant, string> = {
    center:
      "w-full max-w-lg rounded-3xl [animation:scale-in_0.28s_cubic-bezier(0.16,1,0.3,1)_forwards]",
    sheet:
      "w-full max-w-lg rounded-t-3xl sm:rounded-3xl [animation:slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]",
    drawer:
      "h-full w-full max-w-md [animation:slide-in-right_0.32s_cubic-bezier(0.16,1,0.3,1)_forwards]",
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className={cn("fixed inset-0 z-50 flex", positions[variant])}
    >
      <div
        className="absolute inset-0 bg-black/70 [animation:fade-in_0.25s_ease_forwards]"
        onClick={onClose}
      />
      <div
        className={cn(
          "card-surface relative z-10 flex max-h-[92vh] flex-col overflow-hidden shadow-2xl",
          panels[variant],
        )}
      >
        {showClose && (
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="tap-highlight absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full border border-line bg-ink/70 text-muted backdrop-blur transition-colors hover:border-gold-soft hover:text-cream"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
