import Image from "next/image";
import { cn } from "@/lib/utils";
import { RESTAURANT } from "@/data/menu";

/** Proporção largura/altura do logótipo oficial (recorte 1047×738). */
const RATIO = 1047 / 738;

const HEIGHTS = { sm: 40, md: 72, lg: 180 } as const;

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

export function Logo({ size = "md", className, priority = false }: LogoProps) {
  const height = HEIGHTS[size];
  const width = Math.round(height * RATIO);
  return (
    <Image
      src={RESTAURANT.logo}
      alt={`${RESTAURANT.name} ${RESTAURANT.location.split(",")[0]}`}
      width={width}
      height={height}
      priority={priority}
      className={cn(
        "w-auto object-contain drop-shadow-[0_0_18px_rgba(212,175,55,0.18)]",
        className,
      )}
      style={{ height }}
    />
  );
}
