"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, CalendarCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Flower, Sparkle, SpinBadge } from "@/app/components/ui/blob";
import { CURRENT_ROLE } from "@/app/data/portfolio";

/** Floating stack stickers around the monogram. */
const STICKERS = [
  { label: "TypeScript", bg: "bg-bubblegum", pos: "left-0 top-36", r: "-8deg", delay: "0s" },
  { label: "Gemini", bg: "bg-peach", pos: "left-14 top-1", r: "6deg", delay: "1.2s" },
  { label: "Next.js", bg: "bg-zest", pos: "right-0 top-[17rem]", r: "7deg", delay: "0.6s" },
  { label: "Figma", bg: "bg-aqua", pos: "right-20 top-[3.25rem]", r: "-6deg", delay: "1.8s" },
] as const;

const STEPS = 5;

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1.5" aria-label="Agent is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function ChatCard() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), 1900);
    return () => window.clearInterval(id);
  }, [reduce]);

  const current = reduce ? 3 : step;

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-[5px_5px_0_#1a1033]">
      <div className="flex items-center gap-2.5 border-b-2 border-ink bg-lavender px-3 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-white">
          <Bot size={14} aria-hidden />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[12px] font-extrabold text-ink">Lofty · AI leasing agent</p>
          <p className="flex items-center gap-1 text-[10px] font-medium text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-forest" /> Replies in seconds
          </p>
        </div>
      </div>

      <div className="flex min-h-[9.5rem] flex-col justify-end gap-2 px-3 py-3 text-[12px] leading-snug">
        <AnimatePresence initial={false}>
          <motion.div
            key="visitor"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-white"
          >
            Is the 2-bed on 17th Ave still available?
          </motion.div>

          {current === 1 ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="w-fit rounded-2xl rounded-bl-sm bg-blush px-3"
            >
              <TypingDots />
            </motion.div>
          ) : null}

          {current >= 2 ? (
            <motion.div
              key="agent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-[88%] rounded-2xl rounded-bl-sm bg-blush px-3 py-2 text-ink"
            >
              Yes! Viewing Thursday at 4 PM?
            </motion.div>
          ) : null}

          {current >= 3 ? (
            <motion.div
              key="booked"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex w-fit items-center gap-1.5 rounded-lg bg-zest px-2.5 py-1.5 text-[11px] font-bold text-forest"
            >
              <CalendarCheck2 size={13} aria-hidden /> Booked · Thu 4:00 PM
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[36rem] w-full max-w-[30rem] sm:h-[38rem]">
      {/* Background cloud */}
      <Flower
        lobes={4}
        depth={0.3}
        fill="#f0787c"
        className="absolute -right-6 top-24 h-44 w-44 rotate-12 opacity-95"
      />
      <Sparkle className="animate-wiggle absolute left-6 top-24 h-6 w-6 text-ink" />
      <Sparkle className="animate-wiggle absolute bottom-40 right-3 h-5 w-5 text-ink" style={{ animationDelay: "0.8s" }} />

      {/* Monogram sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.15 }}
        className="absolute left-1/2 top-6 h-[19rem] w-[19rem] -translate-x-1/2 sm:h-[20rem] sm:w-[20rem]"
      >
        <div className="animate-float h-full w-full" style={{ ["--r" as string]: "0deg" }}>
          <Flower
            lobes={8}
            depth={0.22}
            fill="#f9a8c9"
            stroke="#1a1033"
            className="absolute inset-0 h-full w-full drop-shadow-[0_18px_22px_rgba(26,16,51,0.25)]"
          />
          <div className="absolute inset-0 grid place-items-center" aria-hidden>
            <span className="font-display text-[7rem] leading-none text-ink sm:text-[8rem]">ZO</span>
          </div>
        </div>
      </motion.div>

      <SpinBadge
        text="Open to work ✺ Canada & US ✺ "
        size={108}
        className="absolute right-0 top-0 rotate-12 shadow-[4px_4px_0_#1a1033]"
      />

      {/* Stack stickers */}
      {STICKERS.map((s) => (
        <span
          key={s.label}
          className={`animate-float absolute z-20 rounded-full border-2 border-ink px-3.5 py-1.5 text-xs font-extrabold text-ink shadow-[3px_3px_0_#1a1033] ${s.bg} ${s.pos}`}
          style={{ ["--r" as string]: s.r, animationDelay: s.delay, transform: `rotate(${s.r})` }}
        >
          {s.label}
        </span>
      ))}

      {/* Chat card */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 left-0 z-30 w-[15.5rem] sm:w-[16.5rem]"
      >
        <ChatCard />
      </motion.div>

      {/* Currently card */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 z-20 w-[12.5rem] rounded-2xl border-2 border-ink bg-zest p-3.5 shadow-[5px_5px_0_#1a1033]"
      >
        <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
          </span>
          {CURRENT_ROLE.label}
        </p>
        <p className="mt-1.5 text-[13px] font-extrabold leading-tight text-ink">{CURRENT_ROLE.role}</p>
        <p className="mt-0.5 text-[12px] font-medium text-ink-muted">{CURRENT_ROLE.company}</p>
      </motion.div>
    </div>
  );
}
