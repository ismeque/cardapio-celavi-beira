"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import type { Product } from "@/lib/types";
import { cn, formatMT } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

interface ShowcaseItem {
  product: Product;
  emoji: string;
}

interface FeaturedShowcaseProps {
  items: ShowcaseItem[];
  onOpen: (product: Product, emoji: string) => void;
}

/** Carrossel hero de destaques — imagens grandes, auto-rotativo e deslizável. */
export function FeaturedShowcase({ items, onOpen }: FeaturedShowcaseProps) {
  const { t, tr, trTag } = useLocale();
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Centra o slide ativo.
  useEffect(() => {
    const el = scroller.current;
    const child = el?.children[active] as HTMLElement | undefined;
    if (el && child) {
      el.scrollTo({
        left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  // Auto-avanço.
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, [items.length]);

  function handleScroll() {
    const el = scroller.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement;
      const cc = child.offsetLeft + child.clientWidth / 2;
      const d = Math.abs(cc - center);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }

  if (items.length === 0) return null;

  return (
    <div>
      <div
        ref={scroller}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
      >
        {items.map(({ product, emoji }) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onOpen(product, emoji)}
            className="group relative aspect-[16/10] w-[86%] shrink-0 snap-center overflow-hidden rounded-3xl border border-line text-left sm:aspect-[2/1] sm:w-[72%]"
          >
            <ProductImage
              image={product.image}
              emoji={emoji}
              alt={tr(product.name)}
              className="h-full w-full transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 86vw, 640px"
              priority
              emojiClassName="text-7xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div className="min-w-0">
                {product.tags?.[0] && (
                  <span className="mb-2 inline-block rounded-full border border-gold-soft bg-ink/50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold backdrop-blur">
                    {trTag(product.tags[0])}
                  </span>
                )}
                <h3 className="truncate font-serif text-2xl font-semibold text-cream drop-shadow sm:text-3xl">
                  {tr(product.name)}
                </h3>
                <p className="mt-1 font-semibold text-gold-gradient">{formatMT(product.price)}</p>
              </div>
              <span className="shrink-0 rounded-full bg-gold-gradient px-4 py-2 text-sm font-bold text-ink shadow-[var(--shadow-gold)]">
                {t("orderNow")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.product.id}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-6 bg-gold" : "w-1.5 bg-line hover:bg-gold-deep",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
