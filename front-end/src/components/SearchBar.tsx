"use client";

import { useLocale } from "@/context/LocaleContext";
import { SearchIcon, CloseIcon } from "./Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { t } = useLocale();
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-faint" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t("searchMenu")}
        className="w-full rounded-full border border-line bg-surface/70 py-3 pl-12 pr-11 text-sm text-cream outline-none transition-colors placeholder:text-faint focus:border-gold-soft focus:bg-surface [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label={t("clearSearch")}
          onClick={() => onChange("")}
          className="tap-highlight absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-faint hover:text-cream"
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
