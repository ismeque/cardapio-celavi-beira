"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "@/data/menu";
import type { Category, Product, Subcategory } from "@/lib/types";
import type { LocalizedText } from "@/lib/i18n";
import { normalize } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { CategoryCard } from "./CategoryCard";
import { CategoryNav } from "./CategoryNav";
import { FeaturedShowcase } from "./FeaturedShowcase";
import { ImageProductCard } from "./ImageProductCard";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { CartDrawer } from "./CartDrawer";
import { CartBar } from "./CartBar";
import { HistoryModal } from "./HistoryModal";
import { SearchBar } from "./SearchBar";
import { HomeSkeleton, ProductListSkeleton } from "./Skeletons";
import { SearchIcon, SparkleIcon } from "./Icons";

type Resolver = (value: LocalizedText | undefined | null) => string;
type TagResolver = (tag: string) => string;

interface FlatProduct {
  product: Product;
  emoji: string;
  path: string;
}

function matches(product: Product, q: string, tr: Resolver, trTag: TagResolver): boolean {
  if (!q) return true;
  const haystack = [
    tr(product.name),
    tr(product.description),
    ...(product.tags ?? []),
    ...(product.tags ?? []).map(trTag),
  ];
  return haystack.some((h) => normalize(h).includes(q));
}

export function MenuExperience() {
  const { t, tr, trTag } = useLocale();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ product: Product; emoji: string } | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Índice plano para busca global (recalcula ao mudar de idioma).
  const allProducts = useMemo<FlatProduct[]>(() => {
    const list: FlatProduct[] = [];
    for (const c of CATEGORIES) {
      c.products?.forEach((p) => list.push({ product: p, emoji: c.emoji, path: tr(c.name) }));
      c.subcategories?.forEach((s) =>
        s.products.forEach((p) =>
          list.push({ product: p, emoji: s.emoji, path: `${tr(c.name)} · ${tr(s.name)}` }),
        ),
      );
    }
    return list;
  }, [tr]);

  // Simula carregamento inicial (mostra skeletons).
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  function goHome() {
    setCategory(null);
    setSubcategory(null);
    setSearch("");
    scrollUp();
  }
  function openCategory(c: Category) {
    setCategory(c);
    setSubcategory(null);
    setSearch("");
    scrollUp();
  }
  function openSubcategory(s: Subcategory) {
    setSubcategory(s);
    setSearch("");
    scrollUp();
  }
  function back() {
    if (subcategory) setSubcategory(null);
    else if (category) setCategory(null);
    setSearch("");
    scrollUp();
  }

  const hasSubs = !!category?.subcategories?.length;
  const view: "home" | "subcategories" | "products" = subcategory
    ? "products"
    : category
      ? hasSubs
        ? "subcategories"
        : "products"
      : "home";

  const activeProducts: Product[] | null = subcategory
    ? subcategory.products
    : category && !hasSubs
      ? category.products ?? []
      : null;

  const q = normalize(search);
  const filteredProducts = activeProducts?.filter((p) => matches(p, q, tr, trTag)) ?? [];
  const globalResults = q
    ? allProducts.filter(({ product }) => matches(product, q, tr, trTag))
    : [];

  const heroEmoji = subcategory?.emoji ?? category?.emoji ?? "🍽️";

  const openProduct = (product: Product, emoji: string) => setModal({ product, emoji });

  const recommendedCat = CATEGORIES.find((c) => c.id === "recomendados");
  const heroItems =
    recommendedCat?.products?.map((p) => ({ product: p, emoji: recommendedCat.emoji })) ?? [];
  const recommendedIds = new Set(heroItems.map((i) => i.product.id));
  const featured = allProducts
    .filter((f) => f.product.image && !recommendedIds.has(f.product.id))
    .slice(0, 8);

  const trail: Crumb[] = [{ label: t("menuRoot"), onClick: goHome }];
  if (category) {
    trail.push({
      label: tr(category.name),
      onClick: hasSubs ? () => openCategory(category) : undefined,
    });
  }
  if (subcategory) trail.push({ label: tr(subcategory.name) });

  return (
    <>
      <Header
        onOpenHistory={() => setHistoryOpen(true)}
        stickyBar={
          view === "home" ? (
            <CategoryNav categories={CATEGORIES} onSelect={openCategory} />
          ) : undefined
        }
      />

      {view !== "home" && <Breadcrumbs trail={trail} onBack={back} />}

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-2">
        {/* HOME */}
        {view === "home" && (
          <section>
            <div className="py-4">
              <SearchBar value={search} onChange={setSearch} placeholder={t("searchAll")} />
            </div>

            {q ? (
              <SearchResults results={globalResults} onOpen={setModal} />
            ) : (
              <>
                {loading ? (
                  <HomeSkeleton />
                ) : (
                  <div className="mt-5 space-y-8">
                    <FeaturedShowcase items={heroItems} onOpen={openProduct} />

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <SparkleIcon className="size-4 text-gold" />
                        <h2 className="font-serif text-xl font-semibold text-cream">
                          {t("featured")}
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {featured.map((f) => (
                          <ImageProductCard
                            key={f.product.id}
                            product={f.product}
                            emoji={f.emoji}
                            onOpen={openProduct}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* SUBCATEGORIAS */}
        {view === "subcategories" && category && (
          <section>
            <div className="mb-5 mt-2">
              <h2 className="font-serif text-3xl font-semibold text-cream">
                {t("explorePrefix", { name: tr(category.name) })}
              </h2>
              <p className="mt-1 text-sm text-muted">{t("chooseSub")}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {category.subcategories!.map((s) => (
                <CategoryCard
                  key={s.id}
                  emoji={s.emoji}
                  name={tr(s.name)}
                  count={s.products.length}
                  onClick={() => openSubcategory(s)}
                />
              ))}
            </div>
          </section>
        )}

        {/* PRODUTOS */}
        {view === "products" && (
          <section>
            <div className="mb-4 mt-2 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-ink/60 text-2xl ring-1 ring-line">
                {heroEmoji}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">
                {tr(subcategory?.name ?? category?.name)}
              </h2>
            </div>

            <div className="mb-5">
              <SearchBar value={search} onChange={setSearch} placeholder={t("searchMenu")} />
            </div>

            {loading ? (
              <ProductListSkeleton />
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-3">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    emoji={heroEmoji}
                    onOpenDetails={(product) => setModal({ product, emoji: heroEmoji })}
                  />
                ))}
              </div>
            ) : (
              <EmptyState query={search} />
            )}
          </section>
        )}
      </main>

      <Footer />
      <CartBar />

      <ProductModal
        product={modal?.product ?? null}
        heroEmoji={modal?.emoji}
        onClose={() => setModal(null)}
      />
      <CartDrawer onExplore={goHome} />
      <HistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </>
  );
}

function SearchResults({
  results,
  onOpen,
}: {
  results: FlatProduct[];
  onOpen: (m: { product: Product; emoji: string }) => void;
}) {
  const { t } = useLocale();
  if (results.length === 0) return <EmptyState />;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        {results.length} {t(results.length === 1 ? "result" : "results")}
      </p>
      {results.map(({ product, emoji, path }) => (
        <div key={product.id}>
          <p className="mb-1 ml-1 text-[11px] uppercase tracking-wide text-faint">
            {emoji} {path}
          </p>
          <ProductCard
            product={product}
            emoji={emoji}
            onOpenDetails={(p) => onOpen({ product: p, emoji })}
          />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ query }: { query?: string }) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full border border-line bg-surface text-muted">
        <SearchIcon className="size-7" />
      </span>
      <p className="font-serif text-lg text-cream">{t("nothingFound")}</p>
      <p className="max-w-xs text-sm text-muted">
        {query ? t("noResultsFor", { query }) : t("adjustSearch")}
      </p>
    </div>
  );
}
