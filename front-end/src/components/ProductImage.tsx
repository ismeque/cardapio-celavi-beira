"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  /** Caminho/URL da foto. Sem valor, mostra um fallback com o emoji. */
  image?: string;
  emoji: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Tamanho do emoji no estado fallback. */
  emojiClassName?: string;
}

/**
 * Mostra a foto do produto (otimizada por next/image) ou, na sua ausência,
 * um fundo premium com o emoji da categoria como marcador de posição.
 */
export function ProductImage({
  image,
  emoji,
  alt,
  className,
  sizes = "96px",
  priority = false,
  emojiClassName = "text-3xl",
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-surface-2 to-ink",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.22),transparent_60%)]" />
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className={cn("absolute inset-0 grid place-items-center", emojiClassName)}>
          <span className="drop-shadow-lg">{emoji}</span>
        </div>
      )}
    </div>
  );
}
