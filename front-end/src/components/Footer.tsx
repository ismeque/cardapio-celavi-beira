"use client";

import { useLocale } from "@/context/LocaleContext";
import { RESTAURANT } from "@/data/menu";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-10 text-center">
        <Logo size="sm" className="opacity-90" />
        <div className="hairline h-px w-32" />
        <p className="text-xs tracking-widest text-muted uppercase">
          {t("footerCopyright")} © {new Date().getFullYear()} • {RESTAURANT.name}
        </p>
        <p className="text-[11px] text-faint">{t("location")}</p>
      </div>
    </footer>
  );
}
