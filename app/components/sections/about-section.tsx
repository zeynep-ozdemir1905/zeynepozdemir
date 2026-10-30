"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles, User } from "lucide-react";
import { Flower } from "@/app/components/ui/blob";
import { Panel } from "@/app/components/ui/panel";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";
import { ABOUT_COPY, AI_WORKFLOW, EDUCATION, RESUME_SUMMARY, aboutStats } from "@/app/data/portfolio";

const STAT_TONES = [
  { bg: "bg-zest", r: "-1.5deg" },
  { bg: "bg-bubblegum", r: "1.5deg" },
  { bg: "bg-lavender", r: "1deg" },
  { bg: "bg-peach", r: "-1deg" },
] as const;

export function AboutSection() {
  return (
    <Panel
      id="about"
      tone="aqua"
      labelledBy="about-title"
      decor={
        <Flower lobes={6} depth={0.3} fill="#fff7e8" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-12 opacity-80" />
      }
    >
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionReveal>
          <SectionHeader
            id="about-title"
            label="About"
            icon={User}
            large
            title={
              <>
                {ABOUT_COPY.titleLead} <span className="marker" style={{ ["--marker" as string]: "#eaf7a6" }}>{ABOUT_COPY.titleMark}</span>
              </>
            }
            description={ABOUT_COPY.description}
          />

          <div className="mt-12 grid grid-cols-2 gap-4">
            {aboutStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: Number.parseFloat(STAT_TONES[index].r) }}
                whileHover={{ rotate: 0, y: -4 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.07 }}
                className={`rounded-3xl border-2 border-ink p-5 shadow-[4px_4px_0_#1a1033] ${STAT_TONES[index].bg}`}
              >
                <p className="font-display text-4xl text-ink md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-ink-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="space-y-5">
          <div className="card-white p-6 md:p-7">
            <p className="eyebrow">Summary</p>
            <p className="mt-4 text-base font-medium leading-relaxed text-ink-muted">{RESUME_SUMMARY}</p>
          </div>

          <div className="rounded-3xl border-2 border-ink bg-zest p-6 shadow-[5px_5px_0_#1a1033] md:p-7">
            <p className="eyebrow">
              <Sparkles size={14} aria-hidden />
              {AI_WORKFLOW.label}
            </p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-ink md:text-base">{AI_WORKFLOW.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {AI_WORKFLOW.tools.map((tool) => (
                <span key={tool} className="tag-minimal">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="card-white p-6 md:p-7">
            <p className="eyebrow">
              <GraduationCap size={14} aria-hidden />
              Education
            </p>
            <ul className="mt-5 space-y-5">
              {EDUCATION.map((edu) => (
                <li key={edu.degree} className="border-l-4 border-bubblegum pl-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">{edu.date}</p>
                  <h3 className="mt-1 font-bold text-ink">{edu.degree}</h3>
                  <p className="mt-0.5 text-sm font-medium text-ink-muted">
                    {edu.school} · {edu.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </Panel>
  );
}
