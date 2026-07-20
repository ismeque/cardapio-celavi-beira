"use client";

import { useLocale } from "@/context/LocaleContext";
import { ChevronRightIcon } from "./Icons";

interface CategoryCardProps {
  emoji: string;
  name: string;
  description?: string;
  count?: number;
  onClick: () => void;
}

export function CategoryCard({ emoji, name, description, count, onClick }: CategoryCardProps) {
  const { t } = useLocale();
  return (
    <button
      type="button"
      onClick={onClick}
      className="group card-surface tap-highlight relative flex h-full flex-col overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-soft hover:shadow-[var(--shadow-gold)]"
    >
      {/* brilho no topo */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <span className="grid size-12 place-items-center rounded-xl bg-ink/60 text-2xl ring-1 ring-line transition-transform duration-300 group-hover:scale-110 group-hover:ring-gold-soft">
        {emoji}
      </span>

      <h3 className="mt-3 font-serif text-lg font-semibold leading-tight text-cream">
        {name}
      </h3>

      {description && (
        <p className="mt-1 line-clamp-2 text-xs text-muted">{description}</p>
      )}

      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-xs font-medium tracking-wide text-gold">{t("seeMore")}</span>
        <span className="flex items-center gap-1 text-faint">
          {count !== undefined && (
            <span className="text-[11px]">
              {count} {t(count === 1 ? "item" : "items")}
            </span>
          )}
          <ChevronRightIcon className="size-4 text-gold transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}
