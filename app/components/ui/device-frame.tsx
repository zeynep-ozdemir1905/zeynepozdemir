"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type DeviceVariant = "mobile" | "desktop" | "dual";

type ScreenProps = {
  children?: ReactNode;
  src?: string;
  title?: string;
  accent?: string;
  interactive?: boolean;
};

function DeviceScreen({ children, src, title, accent, interactive }: ScreenProps) {
  if (src && interactive) {
    return (
      <iframe
        src={src}
        title={title ?? "Project preview"}
        className="h-full w-full border-0 bg-white"
        loading="lazy"
        allowFullScreen
      />
    );
  }

  if (src) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <iframe
          src={src}
          title={title ?? "Project preview"}
          className="pointer-events-none h-full w-full scale-[0.85] border-0 origin-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/5 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 p-3"
      style={{ background: accent ?? "linear-gradient(160deg, #e0f2fe, #bfdbfe)" }}
    >
      {children ?? (
        <div className="flex w-full flex-col items-center gap-2 opacity-90">
          <div className="h-2 w-16 rounded-full bg-white/70" />
          <div className="h-2 w-24 rounded-full bg-white/50" />
          <div className="mt-2 h-20 w-full max-w-[85%] rounded-lg bg-white/40" />
          {title ? (
            <p className="mt-1 max-w-[85%] truncate text-[11px] font-semibold text-[#1e3a5f]/70">{title}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

type MobileFrameProps = ScreenProps & {
  className?: string;
  size?: "sm" | "md";
};

export function MobileFrame({ className = "", size = "md", ...screen }: MobileFrameProps) {
  const w = screen.interactive ? "w-[min(280px,85vw)]" : size === "sm" ? "w-[108px]" : "w-[148px]";
  const h = screen.interactive ? "h-[min(520px,70vh)]" : size === "sm" ? "h-[220px]" : "h-[300px]";

  return (
    <div
      className={`relative shrink-0 rounded-[2rem] border-[3px] border-[#1e293b] bg-[#1e293b] p-1.5 shadow-xl shadow-[#0f172a]/25 ${w} ${h} ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-[5px] w-12 -translate-x-1/2 rounded-full bg-[#0f172a]" />
      <div className="h-full w-full overflow-hidden rounded-[1.5rem] bg-white">
        <DeviceScreen {...screen} />
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#334155]/80" />
    </div>
  );
}

type DesktopFrameProps = ScreenProps & {
  className?: string;
  wide?: boolean;
};

export function DesktopFrame({ className = "", wide = false, ...screen }: DesktopFrameProps) {
  const screenH = screen.interactive
    ? "h-[min(420px,55vh)]"
    : wide
      ? "h-[240px] md:h-[270px]"
      : "h-[200px] md:h-[220px]";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-[#334155] bg-[#1e293b] shadow-2xl shadow-[#0f172a]/30 ${
        wide ? "w-full max-w-[520px]" : "w-[min(100%,380px)]"
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[#334155] bg-[#0f172a] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-[#1e293b] px-2 py-0.5 text-[9px] text-slate-400">
          {screen.src && screen.title
            ? `${screen.title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.app`
            : "Project overview"}
        </div>
      </div>
      <div className={`overflow-hidden bg-white ${screenH}`}>
        <DeviceScreen {...screen} />
      </div>
    </div>
  );
}

type DualFrameProps = ScreenProps & {
  className?: string;
  mobileSrc?: string;
  desktopSrc?: string;
};

/** Figma-style desktop + mobile artboard pairing */
export function DualFrame({
  className = "",
  accent,
  title,
  src,
  mobileSrc,
  desktopSrc,
  interactive,
}: DualFrameProps) {
  const previewSrc = src;
  const desk = desktopSrc ?? previewSrc;
  const mob = mobileSrc ?? previewSrc;

  const minH = interactive ? "min-h-[480px]" : "min-h-[260px]";

  return (
    <div className={`relative flex ${minH} items-end justify-center px-4 py-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative z-0 mb-2 ${interactive ? "w-full max-w-[520px]" : "-mr-6"}`}
      >
        <DesktopFrame
          wide
          title={title}
          accent={accent}
          src={desk}
          interactive={interactive}
          className={interactive ? "" : "rotate-[-2deg]"}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 16, y: 8 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className={`relative z-10 mb-0 ${interactive ? "absolute right-4 bottom-8" : "-ml-4"}`}
      >
        <MobileFrame
          size={interactive ? "md" : "sm"}
          title={title}
          accent={accent}
          src={mob}
          interactive={interactive}
          className={interactive ? "shadow-2xl" : "rotate-[6deg] shadow-2xl"}
        />
      </motion.div>
      <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-[#93c5fd]/50 bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1e40af]">
        Desktop + Mobile
      </span>
    </div>
  );
}

type ProjectDevicePreviewProps = {
  variant: DeviceVariant;
  accent?: string;
  title: string;
  src?: string;
  interactive?: boolean;
  className?: string;
  /** Smaller frames for magazine-style project rows */
  compact?: boolean;
};

export function ProjectDevicePreview({
  variant,
  accent,
  title,
  src,
  interactive = false,
  className = "",
  compact = false,
}: ProjectDevicePreviewProps) {
  const screen = { accent, title, src, interactive: compact ? false : interactive };

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center justify-center ${compact ? "py-4" : "min-h-[280px] py-6"} ${className}`}
      >
        <MobileFrame {...screen} size={compact ? "md" : "md"} />
      </div>
    );
  }

  if (variant === "desktop") {
    return (
      <div
        className={`flex items-center justify-center px-4 ${compact ? "py-4" : "min-h-[280px] py-6"} ${className}`}
      >
        <DesktopFrame wide {...screen} />
      </div>
    );
  }

  return (
    <DualFrame
      {...screen}
      className={`${compact ? "!min-h-[240px]" : ""} ${className}`.trim()}
      interactive={interactive}
    />
  );
}
