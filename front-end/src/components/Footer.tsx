"use client";

import { useLocale } from "@/context/LocaleContext";
import { RESTAURANT } from "@/data/menu";
import { Logo } from "./Logo";
import { PhoneIcon, MailIcon, WhatsappIcon } from "./Icons";

const DEVELOPER = {
  name: "Ismael Jacinto Dias Meque",
  phones: [
    { label: "+258 87 971 0431", tel: "+258879710431", wa: "258879710431" },
    { label: "+258 84 401 0431", tel: "+258844010431", wa: "258844010431" },
  ],
  email: "ismeques@gmail.com",
};

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-10 text-center">
        <Logo size="sm" className="opacity-90" />
        <div className="hairline h-px w-32" />
        <p className="text-xs tracking-widest text-muted uppercase">
          {t("footerCopyright")} © {new Date().getFullYear()} • {RESTAURANT.name}
        </p>
        <p className="text-[11px] text-faint">{t("location")}</p>

        {/* Crédito do desenvolvedor */}
        <div className="mt-6 flex w-full max-w-md flex-col items-center gap-2 border-t border-line pt-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-faint">{t("developedBy")}</p>
          <p className="font-serif text-lg font-semibold tracking-wide text-gold-gradient">
            {DEVELOPER.name}
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
            {DEVELOPER.phones.map((p) => (
              <span key={p.tel} className="flex items-center gap-2">
                <a
                  href={`tel:${p.tel}`}
                  className="tap-highlight flex items-center gap-1.5 transition-colors hover:text-gold"
                >
                  <PhoneIcon className="size-3.5 text-gold" />
                  {p.label}
                </a>
                <a
                  href={`https://wa.me/${p.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${p.label}`}
                  className="tap-highlight text-[#25D366] transition-transform hover:scale-110"
                >
                  <WhatsappIcon className="size-4" />
                </a>
              </span>
            ))}
            <a
              href={`mailto:${DEVELOPER.email}`}
              className="tap-highlight flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <MailIcon className="size-3.5 text-gold" />
              {DEVELOPER.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
