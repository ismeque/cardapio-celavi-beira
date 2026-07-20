/** Utilitários partilhados. */

/** Junta classes condicionais (mini clsx). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formata um valor em Meticais: 150 -> "MT 150". */
export function formatMT(value: number): string {
  return `MT ${value.toLocaleString("pt-MZ", { maximumFractionDigits: 0 })}`;
}

/** Normaliza texto para busca (remove acentos e caixa). */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
