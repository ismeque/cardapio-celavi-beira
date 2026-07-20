/** Tipos de domínio do cardápio CELA VI. */

import type { LocalizedText } from "./i18n";

export interface Product {
  id: string;
  name: LocalizedText;
  /** Descrição curta e apetitosa (opcional). */
  description?: LocalizedText;
  /** Preço em Meticais (MT). */
  price: number;
  /** Foto do produto: caminho local (/products/...) ou URL. Sem imagem usa fallback. */
  image?: string;
  /** Etiquetas de destaque, ex.: "Recomendado", "Novo", "Premium". */
  tags?: string[];
  /** Disponibilidade — indisponível fica esbatido e sem botão. */
  available?: boolean;
  /** Nota média (0–5) e nº de avaliações, opcional. */
  rating?: number;
  ratingCount?: number;
}

export interface Subcategory {
  id: string;
  name: LocalizedText;
  emoji: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: LocalizedText;
  emoji: string;
  description?: LocalizedText;
  /** Categorias com subníveis (ex.: Bebidas → Whisky, Gin…). */
  subcategories?: Subcategory[];
  /** Categorias que vão direto aos produtos (ex.: Shots, Caipirinha). */
  products?: Product[];
}

export interface Restaurant {
  name: string;
  tagline: string;
  location: string;
  logo: string;
  currency: string;
  /** Telefone em formato internacional, só dígitos (para WhatsApp). */
  whatsapp: string;
}

/** Item já dentro do carrinho. */
export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}
