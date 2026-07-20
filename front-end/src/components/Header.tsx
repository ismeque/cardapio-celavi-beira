"use client";

import type { ReactNode } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLocale } from "@/context/LocaleContext";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BellIcon, CartIcon, ClockIcon } from "./Icons";

interface HeaderProps {
  onOpenHistory: () => void;
  stickyBar?: ReactNode;
}

export function Header({ onOpenHistory, stickyBar }: HeaderProps) {
  const { count, openCart } = useCart();
  const { showToast } = useToast();
  const { t } = useLocale();

  return (
    <>
      {/* Barra fixa: controlos (+ navegação de categorias na home) */}
      <div className="sticky top-0 z-40 glass border-b border-line/80">
        {/* Barra de controlos */}
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast(t("waiterToast"), "gold")}
              className="tap-highlight flex items-center gap-2 rounded-full bg-gold-gradient px-3.5 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-gold)] transition-transform hover:brightness-105 sm:text-sm"
            >
              <BellIcon className="size-4" />
              <span className="hidden sm:inline">{t("callWaiter")}</span>
              <span className="sm:hidden">{t("callWaiterShort")}</span>
            </button>

            <button
              type="button"
              onClick={onOpenHistory}
              aria-label={t("history")}
              className="tap-highlight flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-gold-soft hover:text-cream sm:px-3.5 sm:text-sm"
            >
              <ClockIcon className="size-4" />
              <span className="hidden sm:inline">{t("history")}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={openCart}
              aria-label={`${t("cart")} (${count})`}
              className="tap-highlight relative flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-2 text-xs font-medium text-cream transition-colors hover:border-gold-soft sm:px-3.5 sm:text-sm"
            >
              <CartIcon className="size-4" />
              <span className="hidden sm:inline">{t("cart")}</span>
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-gold-gradient px-1 text-[11px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {stickyBar && <div className="mx-auto max-w-5xl px-4 pb-2.5">{stickyBar}</div>}
      </div>

      {/* Marca (rola com a página) */}
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-6 pt-6 text-center">
        <Logo size="lg" priority />
        <p className="mt-3 font-serif text-base italic tracking-wide text-champagne/80 sm:text-lg">
          {t("tagline")}
        </p>
        <div className="hairline mt-4 h-px w-40" />
      </div>
    </>
  );
}
