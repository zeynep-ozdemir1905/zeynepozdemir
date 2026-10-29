"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Code2,
  GitBranch,
  Layers,
  Palette,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS } from "@/app/data/portfolio";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";

const GROUP_META: Record<string, { icon: LucideIcon; accent: string }> = {
  Languages: { icon: Code2, accent: "from-slate-100 to-slate-50" },
  Frontend: { icon: Layers, accent: "from-blue-50 to-indigo-50/80" },
  "Backend & AI": { icon: Server, accent: "from-violet-50 to-fuchsia-50/80" },
  Design: { icon: Palette, accent: "from-rose-50 to-orange-50/80" },
  "Tools & Practices": { icon: GitBranch, accent: "from-emerald-50 to-teal-50/80" },
  "AI-Assisted Development": { icon: Bot, accent: "from-sky-50 to-cyan-50/80" },
};

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 px-6 py-28 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          icon={Sparkles}
          label="Capabilities"
          title="The stack behind the work"
          description="From Figma to production TypeScript and serverless AI backends, grouped by how I use them day to day."
          large
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((entry, index) => {
            const meta = GROUP_META[entry.group] ?? { icon: Sparkles, accent: "from-slate-50 to-white" };
            const Icon = meta.icon;

            return (
              <SectionReveal key={entry.group} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="group h-full rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(12,18,34,0.12)]"
                >
                  <div
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${meta.accent} text-[var(--accent)]`}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">{entry.group}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ scale: 1.04 }}
                        className="tag-minimal cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
