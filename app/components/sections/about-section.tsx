"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles, User } from "lucide-react";
import { ABOUT_COPY, AI_WORKFLOW, EDUCATION, RESUME_SUMMARY, aboutStats } from "@/app/data/portfolio";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 border-t border-[var(--line)] px-6 py-28 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <SectionReveal>
          <SectionHeader
            label="About"
            title={ABOUT_COPY.title}
            description={ABOUT_COPY.description}
            icon={User}
            large
          />
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[var(--line)] pt-10">
            {aboutStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <p className="font-display text-3xl font-bold text-[var(--ink)] md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <p className="eyebrow">Summary</p>
          <p className="mt-6 text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">{RESUME_SUMMARY}</p>

          <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[var(--accent-bright)]" strokeWidth={1.5} />
              <p className="eyebrow">{AI_WORKFLOW.label}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">{AI_WORKFLOW.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {AI_WORKFLOW.tools.map((tool) => (
                <span key={tool} className="tag-minimal">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-[var(--line)] pt-10">
            <div className="flex items-center gap-3">
              <GraduationCap size={18} className="text-[var(--accent-bright)]" strokeWidth={1.5} />
              <p className="eyebrow">Education</p>
            </div>
            <div className="mt-6 space-y-6">
              {EDUCATION.map((edu) => (
                <div key={edu.degree}>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink-soft)]">{edu.date}</p>
                  <h4 className="mt-2 font-semibold text-[var(--ink)]">{edu.degree}</h4>
                  <p className="mt-1 text-sm text-[var(--accent-bright)]">
                    {edu.school} · {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
