"use client";

import { useLocale } from "@/context/LocaleContext";
import type { Category } from "@/lib/types";

interface CategoryNavProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

/** Barra horizontal de categorias (chips) — navegação rápida na home. */
export function CategoryNav({ categories, onSelect }: CategoryNavProps) {
  const { t, tr } = useLocale();

  return (
    <nav aria-label={t("categories")}>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c)}
            className="tap-highlight flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-gold-soft hover:bg-surface"
          >
            <span className="text-base leading-none">{c.emoji}</span>
            <span className="whitespace-nowrap">{tr(c.name)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
