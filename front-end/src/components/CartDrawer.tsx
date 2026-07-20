"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLocale } from "@/context/LocaleContext";
import { RESTAURANT } from "@/data/menu";
import { formatMT } from "@/lib/utils";
import { saveOrder } from "@/lib/orders";
import { Modal } from "./Modal";
import { CartIcon, MinusIcon, PlusIcon, TrashIcon, WhatsappIcon } from "./Icons";

interface CartDrawerProps {
  onExplore: () => void;
}

export function CartDrawer({ onExplore }: CartDrawerProps) {
  const { items, count, total, isOpen, closeCart, setQty, remove, clear } = useCart();
  const { showToast } = useToast();
  const { t, tr } = useLocale();

  function handleCheckout() {
    const orderLines = items.map((i) => ({
      name: tr(i.product.name),
      quantity: i.quantity,
      price: i.product.price,
      note: i.note,
    }));
    const lines = orderLines.map(
      (l) =>
        `• ${l.quantity}× ${l.name} — ${formatMT(l.price * l.quantity)}` +
        (l.note ? `\n   (${l.note})` : ""),
    );
    const message =
      `${t("whatsappGreeting", { name: RESTAURANT.name })}\n\n` +
      `${lines.join("\n")}\n\n` +
      `*${t("total")}: ${formatMT(total)}*`;
    const url = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(message)}`;
    saveOrder(orderLines, total);
    window.open(url, "_blank", "noopener,noreferrer");
    showToast(t("checkoutToast"), "info");
    clear();
    closeCart();
  }

  return (
    <Modal open={isOpen} onClose={closeCart} variant="drawer" label={t("yourOrder")} showClose={false}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-cream">{t("yourOrder")}</h2>
          <p className="text-xs text-muted">
            {count} {t(count === 1 ? "item" : "items")}
          </p>
        </div>
        <button
          type="button"
          onClick={closeCart}
          className="tap-highlight rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-gold-soft hover:text-cream"
        >
          {t("close")}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-line bg-surface text-muted">
            <CartIcon className="size-7" />
          </span>
          <div>
            <p className="font-serif text-lg text-cream">{t("cartEmptyTitle")}</p>
            <p className="mt-1 text-sm text-muted">{t("cartEmptySub")}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              closeCart();
              onExplore();
            }}
            className="tap-highlight rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-ink"
          >
            {t("exploreMenu")}
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {items.map((item) => (
              <div key={item.product.id} className="card-surface rounded-2xl p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-medium text-cream">{tr(item.product.name)}</h3>
                    <p className="text-sm text-gold">{formatMT(item.product.price)}</p>
                    {item.note && (
                      <p className="mt-1 line-clamp-2 text-xs italic text-muted">“{item.note}”</p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label={t("remove")}
                    onClick={() => remove(item.product.id)}
                    className="tap-highlight grid size-8 shrink-0 place-items-center rounded-full text-faint transition-colors hover:bg-danger/10 hover:text-danger"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-line bg-ink/50 px-1.5 py-1">
                    <button
                      type="button"
                      aria-label={t("decrease")}
                      onClick={() => setQty(item.product.id, item.quantity - 1)}
                      className="tap-highlight grid size-7 place-items-center rounded-full text-gold hover:bg-gold/10"
                    >
                      <MinusIcon className="size-4" />
                    </button>
                    <span className="min-w-5 text-center text-sm font-semibold text-cream">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={t("increase")}
                      onClick={() => setQty(item.product.id, item.quantity + 1)}
                      className="tap-highlight grid size-7 place-items-center rounded-full text-gold hover:bg-gold/10"
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                  <span className="font-semibold text-cream">
                    {formatMT(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={clear}
              className="mx-auto mt-2 block text-xs text-faint underline-offset-4 hover:text-danger hover:underline"
            >
              {t("clearCart")}
            </button>
          </div>

          <div className="border-t border-line bg-ink/60 px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted">{t("total")}</span>
              <span className="font-serif text-2xl font-semibold text-gold-gradient">
                {formatMT(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="tap-highlight flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[var(--shadow-gold)] transition-transform hover:brightness-105"
            >
              <WhatsappIcon className="size-5" />
              {t("sendOrder")}
            </button>
            <p className="mt-2 text-center text-[11px] text-faint">
              {t("orderConfirmNote")}
            </p>
          </div>
        </>
      )}
    </Modal>
  );
}
