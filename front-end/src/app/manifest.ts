import type { MetadataRoute } from "next";
import { RESTAURANT } from "@/data/menu";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${RESTAURANT.name} — Cardápio Digital`,
    short_name: RESTAURANT.name,
    description: `Cardápio digital do ${RESTAURANT.name}. Bebidas premium e alta gastronomia.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    lang: "pt",
    categories: ["food", "lifestyle"],
    icons: [
      { src: "/icon-celavi.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-celavi.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
