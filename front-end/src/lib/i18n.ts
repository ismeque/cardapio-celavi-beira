/** Infraestrutura de internacionalização (PT/EN). */

export type Locale = "pt" | "en";

export const LOCALES: Locale[] = ["pt", "en"];
export const DEFAULT_LOCALE: Locale = "pt";

/** Texto que pode ser uma string simples ou um par traduzido. */
export type LocalizedText = string | { pt: string; en: string };

/** Resolve um LocalizedText para o idioma pedido (com fallback para PT). */
export function tr(value: LocalizedText | undefined | null, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.pt ?? "";
}

/** Dicionário de textos da interface. As chaves de PT e EN têm de coincidir. */
const messages = {
  pt: {
    callWaiter: "Chamar Atendente",
    callWaiterShort: "Atendente",
    history: "Histórico de Pedidos",
    historyShort: "Histórico",
    cart: "Carrinho",
    tagline: "Nosso Magnífico Cardápio",
    waiterToast: "A chamar o atendente… já vem à sua mesa!",
    back: "Voltar",
    menuRoot: "Cardápio",
    searchAll: "Buscar em todo o cardápio…",
    searchMenu: "Buscar neste menu…",
    menuKicker: "Cardápio",
    homeTitle: "O que vai querer?",
    homeSubtitle: "Explore o nosso cardápio por categorias",
    categories: "Categorias",
    featured: "Destaques",
    orderNow: "Pedir",
    explorePrefix: "Explore {name}",
    chooseSub: "Escolha uma subcategoria",
    seeMore: "Ver mais",
    items: "itens",
    item: "item",
    results: "resultados",
    result: "resultado",
    add: "Adicionar",
    unavailable: "Indisponível",
    decrease: "Diminuir",
    increase: "Aumentar",
    remove: "Remover",
    clearSearch: "Limpar busca",
    observations: "Observações (opcional)",
    notePlaceholder: "Ex.: sem gelo, bem passado, sem cebola…",
    reviews: "{n} avaliações",
    yourOrder: "Seu Pedido",
    close: "Fechar",
    cartEmptyTitle: "O seu carrinho está vazio",
    cartEmptySub: "Explore o cardápio e adicione os seus favoritos.",
    exploreMenu: "Explorar cardápio",
    clearCart: "Limpar carrinho",
    total: "Total",
    sendOrder: "Enviar pedido",
    orderConfirmNote: "O pedido é confirmado com o atendente.",
    checkoutToast: "A abrir o WhatsApp para confirmar o pedido…",
    whatsappGreeting: "Olá {name}! Gostaria de fazer o seguinte pedido:",
    addedToCart: "{name} adicionado ao carrinho",
    addedToOrder: "{qty}× {name} adicionado ao pedido",
    viewOrder: "Ver pedido",
    historyTitle: "Histórico de Pedidos",
    historyEmptyTitle: "Ainda não há pedidos",
    historyEmptySub: "Os seus pedidos enviados aparecerão aqui para consulta rápida.",
    nothingFound: "Nada encontrado",
    noResultsFor: "Não encontrámos resultados para “{query}”. Tente outra pesquisa.",
    adjustSearch: "Tente ajustar a sua pesquisa.",
    footerCopyright: "Cardápio Digital",
    location: "Beira, Moçambique",
    developedBy: "Desenvolvido por",
    language: "Idioma",
  },
  en: {
    callWaiter: "Call Waiter",
    callWaiterShort: "Waiter",
    history: "Order History",
    historyShort: "History",
    cart: "Cart",
    tagline: "Our Magnificent Menu",
    waiterToast: "Calling the waiter… on the way to your table!",
    back: "Back",
    menuRoot: "Menu",
    searchAll: "Search the entire menu…",
    searchMenu: "Search this menu…",
    menuKicker: "Menu",
    homeTitle: "What would you like?",
    homeSubtitle: "Explore our menu by categories",
    categories: "Categories",
    featured: "Highlights",
    orderNow: "Order",
    explorePrefix: "Explore {name}",
    chooseSub: "Choose a subcategory",
    seeMore: "See more",
    items: "items",
    item: "item",
    results: "results",
    result: "result",
    add: "Add",
    unavailable: "Unavailable",
    decrease: "Decrease",
    increase: "Increase",
    remove: "Remove",
    clearSearch: "Clear search",
    observations: "Notes (optional)",
    notePlaceholder: "e.g., no ice, well done, no onion…",
    reviews: "{n} reviews",
    yourOrder: "Your Order",
    close: "Close",
    cartEmptyTitle: "Your cart is empty",
    cartEmptySub: "Explore the menu and add your favorites.",
    exploreMenu: "Explore menu",
    clearCart: "Clear cart",
    total: "Total",
    sendOrder: "Send order",
    orderConfirmNote: "Your order is confirmed with the waiter.",
    checkoutToast: "Opening WhatsApp to confirm your order…",
    whatsappGreeting: "Hello {name}! I'd like to place the following order:",
    addedToCart: "{name} added to cart",
    addedToOrder: "{qty}× {name} added to order",
    viewOrder: "View order",
    historyTitle: "Order History",
    historyEmptyTitle: "No orders yet",
    historyEmptySub: "Your sent orders will appear here for quick reference.",
    nothingFound: "Nothing found",
    noResultsFor: "No results for “{query}”. Try another search.",
    adjustSearch: "Try adjusting your search.",
    footerCopyright: "Digital Menu",
    location: "Beira, Mozambique",
    developedBy: "Developed by",
    language: "Language",
  },
} as const;

export type MessageKey = keyof (typeof messages)["pt"];

/** Traduz uma chave da interface, com substituição opcional de {parâmetros}. */
export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  let text: string = messages[locale][key] ?? messages.pt[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.split(`{${k}}`).join(String(v));
    }
  }
  return text;
}

/** Dicionário de etiquetas (tags) — traduzidas de forma centralizada. */
const TAGS: Record<string, { pt: string; en: string }> = {
  Recomendado: { pt: "Recomendado", en: "Recommended" },
  Novo: { pt: "Novo", en: "New" },
  Premium: { pt: "Premium", en: "Premium" },
  Popular: { pt: "Popular", en: "Popular" },
  Assinatura: { pt: "Assinatura", en: "Signature" },
  Partilhar: { pt: "Partilhar", en: "To Share" },
  Vegetariano: { pt: "Vegetariano", en: "Vegetarian" },
  Picante: { pt: "Picante", en: "Spicy" },
};

/** Traduz uma etiqueta conhecida (fallback: devolve a original). */
export function trTag(tag: string, locale: Locale): string {
  return TAGS[tag]?.[locale] ?? tag;
}
