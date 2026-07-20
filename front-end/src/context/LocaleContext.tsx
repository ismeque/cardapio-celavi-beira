"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  translate,
  tr as trFn,
  trTag as trTagFn,
  type Locale,
  type LocalizedText,
  type MessageKey,
} from "@/lib/i18n";

const STORAGE_KEY = "celavi-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Traduz uma chave da interface (com {parâmetros} opcionais). */
  t: (key: MessageKey, params?: Record<string, string | number>) => string;
  /** Resolve um LocalizedText para o idioma atual. */
  tr: (value: LocalizedText | undefined | null) => string;
  /** Traduz uma etiqueta. */
  trTag: (tag: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Carrega preferência guardada (após hidratação, evita mismatch).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && LOCALES.includes(saved)) setLocaleState(saved);
    } catch {
      /* armazenamento indisponível */
    }
  }, []);

  // Mantém o atributo lang do <html> sincronizado.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(l: Locale) {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* armazenamento indisponível */
    }
  }

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(locale, key, params),
      tr: (v) => trFn(v, locale),
      trTag: (tag) => trTagFn(tag, locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale deve ser usado dentro de <LocaleProvider>");
  return ctx;
}
