"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLocale } from "@/context/LocaleContext";
import type { Product } from "@/lib/types";
import { formatMT } from "@/lib/utils";
import { Modal } from "./Modal";
import { MinusIcon, PlusIcon, StarIcon } from "./Icons";
import { ProductImage } from "./ProductImage";

interface ProductModalProps {
  product: Product | null;
  heroEmoji?: string;
  onClose: () => void;
}

export function ProductModal({ product, heroEmoji = "🍽️", onClose }: ProductModalProps) {
  const { add, setNote } = useCart();
  const { showToast } = useToast();
  const { t, tr, trTag } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [note, setNoteText] = useState("");

  // Repõe o estado sempre que abre um produto diferente.
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNoteText("");
    }
  }, [product]);

  function handleAdd() {
    if (!product) return;
    add(product, quantity);
    if (note.trim()) setNote(product.id, note.trim());
    showToast(t("addedToOrder", { qty: quantity, name: tr(product.name) }));
    onClose();
  }

  return (
    <Modal
      open={!!product}
      onClose={onClose}
      variant="sheet"
      label={product ? tr(product.name) : undefined}
    >
      {product && (
        <div className="flex flex-col overflow-y-auto">
          {/* Hero */}
          <div className="relative h-52">
            <ProductImage
              image={product.image}
              emoji={heroEmoji}
              alt={tr(product.name)}
              className="h-52 w-full"
              sizes="(max-width: 640px) 100vw, 512px"
              priority
              emojiClassName="text-7xl"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
          </div>

          <div className="flex flex-col gap-4 p-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-2xl font-semibold text-cream">{tr(product.name)}</h2>
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gold-soft bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold"
                  >
                    {trTag(tag)}
                  </span>
                ))}
              </div>
              {product.rating !== undefined && (
                <div className="mt-1.5 flex items-center gap-1 text-sm text-muted">
                  <StarIcon className="size-4 text-gold" />
                  <span className="font-medium text-cream">{product.rating.toFixed(1)}</span>
                  {product.ratingCount !== undefined && (
                    <span>· {t("reviews", { n: product.ratingCount })}</span>
                  )}
                </div>
              )}
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed text-muted">{tr(product.description)}</p>
            )}

            <p className="text-2xl font-semibold text-gold-gradient">{formatMT(product.price)}</p>

            {/* Nota */}
            <div>
              <label htmlFor="note" className="mb-1.5 block text-xs font-medium text-muted">
                {t("observations")}
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNoteText(e.target.value)}
                rows={2}
                placeholder={t("notePlaceholder")}
                className="w-full resize-none rounded-xl border border-line bg-ink/60 px-3 py-2.5 text-sm text-cream outline-none transition-colors placeholder:text-faint focus:border-gold-soft"
              />
            </div>

            {/* Quantidade + adicionar */}
            <div className="mt-1 flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-line bg-surface px-2 py-1.5">
                <button
                  type="button"
                  aria-label={t("decrease")}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="tap-highlight grid size-8 place-items-center rounded-full text-gold hover:bg-gold/10"
                >
                  <MinusIcon className="size-4" />
                </button>
                <span className="min-w-6 text-center font-semibold text-cream">{quantity}</span>
                <button
                  type="button"
                  aria-label={t("increase")}
                  onClick={() => setQuantity((q) => q + 1)}
                  className="tap-highlight grid size-8 place-items-center rounded-full text-gold hover:bg-gold/10"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="tap-highlight flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-[var(--shadow-gold)] transition-transform hover:brightness-105"
              >
                {t("add")} · {formatMT(product.price * quantity)}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
