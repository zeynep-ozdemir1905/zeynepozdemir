"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { LinkedInProfileCard } from "@/app/components/ui/linkedin-profile-card";
import { MagneticButton } from "@/app/components/ui/magnetic-button";
import {
  AI_WORKFLOW,
  CURRENT_ROLE,
  HERO_COPY,
  PROFILE,
  RESUME_PDF,
  aboutStats,
  rotatingTitles,
  socials,
} from "@/app/data/portfolio";
import { staggerContainer, staggerItem } from "@/app/lib/motion";

const iconMap = { GitHub: Github, LinkedIn: Linkedin } as const;

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, []);

  const webSocials = socials.filter((s) => s.label in iconMap);

  return (
    <section
      id="intro"
      className="relative flex min-h-[100svh] scroll-mt-28 items-center overflow-hidden px-6 pb-24 pt-28 md:pb-28 md:pt-32"
    >
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#1e3a5f]/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-96 w-96 rounded-full bg-[#c17f59]/[0.06] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.75fr] lg:gap-16 xl:gap-20">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={staggerItem} className="eyebrow mb-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#057642] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#057642]" />
              </span>
              {HERO_COPY.badge}
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.98] tracking-tight text-[var(--ink)]"
            >
              {HERO_COPY.headline[0]}
              <span className="mt-1 block pb-[0.14em] text-gradient">{HERO_COPY.headline[1]}</span>
            </motion.h1>

            <motion.div key={titleIndex} variants={staggerItem} className="mt-8">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-[var(--accent-bright)] md:text-xl"
                aria-live="polite"
              >
                {rotatingTitles[titleIndex]}
              </motion.p>
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] md:text-lg"
            >
              {HERO_COPY.subline}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                <Sparkles size={14} className="text-[var(--accent-bright)]" aria-hidden />
                {AI_WORKFLOW.label}
              </span>
              {AI_WORKFLOW.tools.map((tool) => (
                <span key={tool} className="tag-minimal">
                  {tool}
                </span>
              ))}
            </motion.div>

            <motion.p variants={staggerItem} className="mt-4 max-w-xl text-sm text-[var(--ink-soft)]">
              {HERO_COPY.education}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="#projects" variant="primary">
                {HERO_COPY.primaryCta} <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href={RESUME_PDF.href} download={RESUME_PDF.fileName} variant="secondary">
                {RESUME_PDF.label}
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                {HERO_COPY.secondaryCta}
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--line)] pt-8"
            >
              {webSocials.map(({ label, href }) => {
                const Icon = iconMap[label as keyof typeof iconMap];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {label}
                  </motion.a>
                );
              })}
              <span className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
                <MapPin size={16} strokeWidth={1.5} />
                {PROFILE.city} · {PROFILE.relocation}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] px-6 py-6 md:px-7">
                <p className="eyebrow mb-3">{CURRENT_ROLE.label}</p>
                <p className="font-display text-xl font-bold leading-tight text-[var(--ink)]">{CURRENT_ROLE.role}</p>
                <p className="mt-1 text-sm text-[var(--accent-bright)]">
                  {CURRENT_ROLE.company} · since {CURRENT_ROLE.since}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CURRENT_ROLE.stack.map((item) => (
                    <span key={item} className="tag-minimal">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] px-6 py-7 md:px-7">
                <p className="eyebrow mb-4 text-center lg:text-left">Connect on LinkedIn</p>
                <LinkedInProfileCard />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {aboutStats.slice(0, 2).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] px-5 py-4"
                  >
                    <p className="font-display text-2xl font-bold text-[var(--ink)]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-snug text-[var(--ink-soft)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] md:flex"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Explore</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
