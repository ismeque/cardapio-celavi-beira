"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { getOrders, type Order } from "@/lib/orders";
import { formatMT } from "@/lib/utils";
import { Modal } from "./Modal";
import { ClockIcon } from "./Icons";

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryModal({ open, onClose }: HistoryModalProps) {
  const { t, locale } = useLocale();
  const intlLocale = locale === "pt" ? "pt-MZ" : "en-GB";
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (open) setOrders(getOrders());
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} variant="sheet" label={t("historyTitle")}>
      <div className="flex items-center gap-2 border-b border-line px-5 py-4">
        <ClockIcon className="size-5 text-gold" />
        <h2 className="font-serif text-xl font-semibold text-cream">{t("historyTitle")}</h2>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-line bg-surface text-muted">
            <ClockIcon className="size-7" />
          </span>
          <p className="font-serif text-lg text-cream">{t("historyEmptyTitle")}</p>
          <p className="max-w-xs text-sm text-muted">{t("historyEmptySub")}</p>
        </div>
      ) : (
        <div className="max-h-[70vh] space-y-3 overflow-y-auto p-5">
          {orders.map((order) => (
            <div key={order.id} className="card-surface rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gold">{order.id}</span>
                <span className="text-xs text-muted">{formatDate(order.date, intlLocale)}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm text-muted">
                    <span className="truncate pr-2">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="shrink-0 text-cream">
                      {formatMT(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                <span className="text-xs uppercase tracking-wide text-faint">{t("total")}</span>
                <span className="font-semibold text-gold-gradient">{formatMT(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
