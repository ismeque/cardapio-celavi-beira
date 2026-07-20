import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function BellIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3.5h2l2.2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.8a1.6 1.6 0 0 0 1.6-1.3l1.4-7.7H6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18M8 6V4h8v2m1 0-.7 14a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" viewBox="0 0 24 24" {...props}>
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2c5.46 0 9.9-4.43 9.9-9.9 0-5.45-4.44-9.9-9.9-9.9Zm5.8 14.13c-.24.68-1.4 1.3-1.94 1.34-.5.05-1.13.24-3.8-.8-3.2-1.26-5.24-4.5-5.4-4.71-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.1-2.66.29-.32.63-.4.84-.4h.6c.19 0 .45-.07.7.54.25.6.86 2.1.94 2.25.08.16.13.34.02.55-.1.21-.16.34-.32.53-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.84 1.39 1.8 2.25 1.24 1.1 2.29 1.45 2.61 1.61.32.16.5.13.69-.08.19-.21.8-.93 1.01-1.25.21-.32.42-.27.71-.16.29.11 1.85.87 2.17 1.03.32.16.53.24.61.37.08.13.08.76-.16 1.44Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c.3 3.8 2.2 5.7 6 6-3.8.3-5.7 2.2-6 6-.3-3.8-2.2-5.7-6-6 3.8-.3 5.7-2.2 6-6Z" />
      <path d="M19 13c.15 1.5 1 2.35 2.5 2.5-1.5.15-2.35 1-2.5 2.5-.15-1.5-1-2.35-2.5-2.5 1.5-.15 2.35-1 2.5-2.5Z" />
    </svg>
  );
}
