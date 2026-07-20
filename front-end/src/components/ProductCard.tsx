"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLocale } from "@/context/LocaleContext";
import type { Product } from "@/lib/types";
import { formatMT, cn } from "@/lib/utils";
import { MinusIcon, PlusIcon, StarIcon } from "./Icons";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  emoji?: string;
  onOpenDetails: (product: Product) => void;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-gold-soft bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold">
      {label}
    </span>
  );
}

export function ProductCard({ product, emoji = "🍽️", onOpenDetails }: ProductCardProps) {
  const { add, setQty, quantityOf } = useCart();
  const { showToast } = useToast();
  const { t, tr, trTag } = useLocale();
  const qty = quantityOf(product.id);
  const unavailable = product.available === false;
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
      onClick={() => !unavailable && onOpenDetails(product)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !unavailable) {
          e.preventDefault();
          onOpenDetails(product);
        }
      }}
      className={cn(
        "card-surface group flex items-stretch gap-3 rounded-2xl p-4 transition-all duration-300",
        unavailable
          ? "opacity-50"
          : "cursor-pointer hover:border-gold-soft hover:shadow-[var(--shadow-gold)]",
      )}
    >
      <ProductImage
        image={product.image}
        emoji={emoji}
        alt={name}
        className="size-20 shrink-0 self-center rounded-xl ring-1 ring-line sm:size-24"
        sizes="96px"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="font-serif text-lg font-semibold leading-tight text-cream">
            {name}
          </h3>
          {product.tags?.map((tag) => (
            <Tag key={tag} label={trTag(tag)} />
          ))}
        </div>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">{tr(product.description)}</p>
        )}

        <div className="mt-2 flex items-center gap-3">
          <span className="font-semibold text-gold-gradient">{formatMT(product.price)}</span>
          {product.rating !== undefined && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <StarIcon className="size-3.5 text-gold" />
              {product.rating.toFixed(1)}
              {product.ratingCount !== undefined && (
                <span className="text-faint">({product.ratingCount})</span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Ação */}
      <div className="flex shrink-0 items-center">
        {unavailable ? (
          <span className="rounded-full border border-line px-3 py-1.5 text-xs text-faint">
            {t("unavailable")}
          </span>
        ) : qty === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            className="tap-highlight flex items-center gap-1 rounded-full bg-gold-gradient px-3.5 py-2 text-sm font-semibold text-ink transition-transform hover:brightness-105"
          >
            <PlusIcon className="size-4" />
            <span className="hidden sm:inline">{t("add")}</span>
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 rounded-full border border-gold-soft bg-surface px-1.5 py-1"
          >
            <button
              type="button"
              aria-label={t("decrease")}
              onClick={() => setQty(product.id, qty - 1)}
              className="tap-highlight grid size-7 place-items-center rounded-full text-gold hover:bg-gold/10"
            >
              <MinusIcon className="size-4" />
            </button>
            <span className="min-w-5 text-center text-sm font-semibold text-cream">{qty}</span>
            <button
              type="button"
              aria-label={t("increase")}
              onClick={() => setQty(product.id, qty + 1)}
              className="tap-highlight grid size-7 place-items-center rounded-full text-gold hover:bg-gold/10"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
