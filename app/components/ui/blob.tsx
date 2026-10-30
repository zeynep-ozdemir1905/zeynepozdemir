import type { CSSProperties, ReactNode } from "react";

/**
 * Sticker toolkit — flower/cloud blobs, spinning text badge, sparkles, squiggles.
 * Pure SVG, no client JS: motion comes from CSS classes so it stays cheap.
 */

/** Builds a scalloped "flower" outline inside a 0–1 box (round tops, sharp valleys). */
export function flowerPath(lobes: number, depth = 0.28, points = 220): string {
  const cmds: string[] = [];
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * Math.PI * 2;
    const wave = Math.pow(Math.abs(Math.sin((lobes * t) / 2)), 0.62);
    const r = 0.5 * (1 - depth + depth * wave);
    const x = 0.5 + r * Math.cos(t);
    const y = 0.5 + r * Math.sin(t);
    cmds.push(`${i === 0 ? "M" : "L"}${x.toFixed(4)} ${y.toFixed(4)}`);
  }
  return `${cmds.join(" ")} Z`;
}

type FlowerProps = {
  lobes?: number;
  depth?: number;
  fill?: string;
  stroke?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** A flat flower/cloud sticker shape. */
export function Flower({ lobes = 8, depth = 0.26, fill = "#fff", stroke, className = "", style, children }: FlowerProps) {
  return (
    <svg viewBox="0 0 1 1" className={className} style={style} aria-hidden>
      <path d={flowerPath(lobes, depth)} fill={fill} stroke={stroke} strokeWidth={stroke ? 0.012 : 0} strokeLinejoin="round" />
      {children}
    </svg>
  );
}

/** Defines a reusable clip-path (objectBoundingBox) for masking photos into a flower. */
export function FlowerClip({ id, lobes = 8, depth = 0.26 }: { id: string; lobes?: number; depth?: number }) {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={flowerPath(lobes, depth)} />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Circular text that slowly rotates, with a sparkle in the middle. */
export function SpinBadge({
  text,
  size = 120,
  className = "",
  bg = "#eaf7a6",
}: {
  text: string;
  size?: number;
  className?: string;
  bg?: string;
}) {
  const id = `spin-${text.length}-${size}`;
  return (
    <div
      className={`relative grid place-items-center rounded-full border-2 border-ink ${className}`}
      style={{ width: size, height: size, background: bg }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <text fontSize="11.5" fontWeight="800" letterSpacing="2.4" fill="#1a1033" style={{ textTransform: "uppercase" }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <Sparkle className="relative h-7 w-7 text-ink" />
    </div>
  );
}

/** Four-point sparkle star. */
export function Sparkle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" fill="currentColor" />
    </svg>
  );
}

/** Hand-drawn wavy underline. */
export function Squiggle({ className = "", color = "#1a1033" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M2 7 C 14 -1, 24 15, 36 7 S 58 -1, 70 7 S 92 15, 104 7 S 126 -1, 138 7 S 160 15, 172 7 S 190 1, 198 7"
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
