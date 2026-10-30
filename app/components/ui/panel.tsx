import type { ReactNode } from "react";

const TONES = {
  lavender: "bg-lavender",
  bubblegum: "bg-bubblegum",
  blush: "bg-blush",
  zest: "bg-zest",
  aqua: "bg-aqua",
  peach: "bg-peach",
  grape: "bg-grape text-white",
  cream: "bg-cream",
  ink: "bg-ink text-white",
} as const;

export type PanelTone = keyof typeof TONES;

type PanelProps = {
  id?: string;
  tone: PanelTone;
  children: ReactNode;
  className?: string;
  /** Decorative sticker shapes rendered behind the content */
  decor?: ReactNode;
  labelledBy?: string;
};

/** A big rounded colour-block "tile" — the page is a stack of these, like the reference grid. */
export function Panel({ id, tone, children, className = "", decor, labelledBy }: PanelProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="scroll-mt-24 px-3 py-2 md:px-5 md:py-3">
      <div className={`panel relative overflow-hidden ${TONES[tone]} ${className}`}>
        {decor}
        <div className="relative mx-auto w-full max-w-7xl">{children}</div>
      </div>
    </section>
  );
}
