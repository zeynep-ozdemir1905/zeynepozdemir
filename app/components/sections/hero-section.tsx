"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Flower, Sparkle } from "@/app/components/ui/blob";
import { HeroVisual } from "@/app/components/ui/hero-visual";
import { AI_WORKFLOW, HERO_COPY, PROFILE, RESUME_PDF, rotatingTitles, socials } from "@/app/data/portfolio";
import { staggerContainer, staggerItem } from "@/app/lib/motion";

const iconMap = { GitHub: Github, LinkedIn: Linkedin } as const;

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  const webSocials = socials.filter((s) => s.label in iconMap);

  return (
    <section id="intro" className="scroll-mt-24 px-3 pt-24 md:px-5 md:pt-28">
      <div className="panel relative overflow-hidden bg-lavender !pt-12 md:!pt-16">
        {/* Decorative stickers */}
        <Flower lobes={5} depth={0.3} fill="#f9a8c9" className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rotate-12" />
        <Flower lobes={4} depth={0.3} fill="#eaf7a6" className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 -rotate-6" />
        <Sparkle className="animate-wiggle pointer-events-none absolute right-[8%] top-10 h-8 w-8 text-ink" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={staggerItem} className="eyebrow">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
              </span>
              {HERO_COPY.badge}
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-display mt-6 text-[clamp(2.6rem,6.6vw,5.5rem)] leading-[0.96] text-ink"
            >
              {HERO_COPY.headline[0]}
              <span className="mt-3 block w-fit">
                <span className="marker" style={{ ["--marker" as string]: "#f9a8c9" }}>
                  {HERO_COPY.headline[1]}
                </span>
              </span>
            </motion.h1>

            <motion.div variants={staggerItem} className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-bold text-ink">
                <span key={titleIndex} className="inline-block animate-[fadeIn_0.4s_ease]">
                  {rotatingTitles[titleIndex]}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted">
                <MapPin size={15} aria-hidden /> {PROFILE.city} · {PROFILE.relocation}
              </span>
            </motion.div>

            <motion.p variants={staggerItem} className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              {HERO_COPY.subline}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
                <Sparkles size={14} aria-hidden />
                {AI_WORKFLOW.label}
              </span>
              {AI_WORKFLOW.tools.map((tool) => (
                <span key={tool} className="tag-minimal">
                  {tool}
                </span>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                {HERO_COPY.primaryCta} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a href={RESUME_PDF.href} download={RESUME_PDF.fileName} className="btn-secondary">
                <Download className="h-4 w-4" aria-hidden /> {RESUME_PDF.label}
              </a>
              <a href="#contact" className="btn-secondary">
                {HERO_COPY.secondaryCta}
              </a>
            </motion.div>

            <motion.div variants={staggerItem} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              {webSocials.map(({ label, href }) => {
                const Icon = iconMap[label as keyof typeof iconMap];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-ink underline decoration-2 underline-offset-4 hover:decoration-bubblegum"
                  >
                    <Icon size={16} aria-hidden />
                    {label}
                  </a>
                );
              })}
              <span className="text-sm font-medium text-ink-muted">{HERO_COPY.education}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <HeroVisual />
          </motion.div>
        </div>

        <a
          href="#about"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-ink md:flex"
          aria-label="Scroll to about section"
        >
          Scroll <ArrowDown size={14} className="animate-bounce" aria-hidden />
        </a>
      </div>
    </section>
  );
}
