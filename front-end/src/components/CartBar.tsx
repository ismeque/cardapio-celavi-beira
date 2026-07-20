"use client";

import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";
import { formatMT } from "@/lib/utils";
import { CartIcon } from "./Icons";

export function CartBar() {
  const { count, total, openCart } = useCart();
  const { t } = useLocale();

  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4 [animation:float-up_0.3s_ease_forwards]">
      <button
        type="button"
        onClick={openCart}
        className="pointer-events-auto mx-auto flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-gold-gradient px-5 py-3.5 text-ink shadow-[var(--shadow-gold)] transition-transform hover:brightness-105 active:scale-[0.98]"
      >
        <span className="flex items-center gap-2 font-semibold">
          <span className="relative">
            <CartIcon className="size-5" />
            <span className="absolute -right-2 -top-2 grid min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-gold">
              {count}
            </span>
          </span>
          {t("viewOrder")}
        </span>
        <span className="font-bold">{formatMT(total)}</span>
      </button>
    </div>
  );
}
