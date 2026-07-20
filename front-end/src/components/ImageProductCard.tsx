"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLocale } from "@/context/LocaleContext";
import type { Product } from "@/lib/types";
import { formatMT } from "@/lib/utils";
import { ProductImage } from "./ProductImage";
import { PlusIcon } from "./Icons";

interface ImageProductCardProps {
  product: Product;
  emoji: string;
  onOpen: (product: Product, emoji: string) => void;
}

/** Cartão de produto com foto (photo-forward) — usado nos destaques da home. */
export function ImageProductCard({ product, emoji, onOpen }: ImageProductCardProps) {
  const { add } = useCart();
  const { showToast } = useToast();
  const { t, tr, trTag } = useLocale();
  const name = tr(product.name);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    add(product);
    showToast(t("addedToCart", { name }));
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(product, emoji)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(product, emoji);
        }
      }}
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-line text-left"
    >
      <ProductImage
        image={product.image}
        emoji={emoji}
        alt={name}
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 45vw, 240px"
        emojiClassName="text-6xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      {product.tags?.[0] && (
        <span className="absolute left-2 top-2 rounded-full border border-gold-soft bg-ink/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold backdrop-blur">
          {trTag(product.tags[0])}
        </span>
      )}

      <button
        type="button"
        aria-label={t("add")}
        onClick={handleAdd}
        className="tap-highlight absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-gold-gradient text-ink shadow-[var(--shadow-gold)] transition-transform hover:brightness-105"
      >
        <PlusIcon className="size-5" />
      </button>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-tight text-cream drop-shadow">
          {name}
        </h3>
        <p className="mt-0.5 text-sm font-semibold text-gold">{formatMT(product.price)}</p>
      </div>
    </div>
  );
}
