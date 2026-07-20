"use client";

import { useLocale } from "@/context/LocaleContext";
import { LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = { pt: "PT", en: "EN" };

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-full border border-line bg-surface/60 p-0.5"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "tap-highlight rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === l ? "bg-gold-gradient text-ink" : "text-muted hover:text-cream",
          )}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
