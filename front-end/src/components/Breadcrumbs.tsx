"use client";

import { useLocale } from "@/context/LocaleContext";
import { ArrowLeftIcon, ChevronRightIcon } from "./Icons";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  trail: Crumb[];
  onBack: () => void;
}

export function Breadcrumbs({ trail, onBack }: BreadcrumbsProps) {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
      <button
        type="button"
        onClick={onBack}
        className="tap-highlight flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted transition-colors hover:border-gold-soft hover:text-cream"
      >
        <ArrowLeftIcon className="size-4" />
        {t("back")}
      </button>

      <nav aria-label="Navegação" className="no-scrollbar flex items-center gap-1 overflow-x-auto">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <span key={i} className="flex items-center gap-1 whitespace-nowrap">
              {i > 0 && <ChevronRightIcon className="size-3.5 text-faint" />}
              <button
                type="button"
                onClick={crumb.onClick}
                disabled={last || !crumb.onClick}
                className={cn(
                  "text-sm transition-colors",
                  last
                    ? "font-medium text-gold-gradient"
                    : "text-muted hover:text-cream",
                )}
              >
                {crumb.label}
              </button>
            </span>
          );
        })}
      </nav>
    </div>
  );
}
