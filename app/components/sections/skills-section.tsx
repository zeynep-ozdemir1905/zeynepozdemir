"use client";

import { motion } from "framer-motion";
import { Bot, Code2, GitBranch, Layers, Palette, Server, Sparkles, type LucideIcon } from "lucide-react";
import { Flower } from "@/app/components/ui/blob";
import { Panel } from "@/app/components/ui/panel";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";
import { SKILL_GROUPS } from "@/app/data/portfolio";

const GROUP_META: Record<string, { icon: LucideIcon; bg: string; rotate: string }> = {
  Languages: { icon: Code2, bg: "bg-lavender", rotate: "-0.8deg" },
  Frontend: { icon: Layers, bg: "bg-bubblegum", rotate: "0.8deg" },
  "Backend & AI": { icon: Server, bg: "bg-aqua", rotate: "-0.6deg" },
  Design: { icon: Palette, bg: "bg-peach", rotate: "0.7deg" },
  "Tools & Practices": { icon: GitBranch, bg: "bg-white", rotate: "-0.7deg" },
  "AI-Assisted Development": { icon: Bot, bg: "bg-blush", rotate: "0.6deg" },
};

export function SkillsSection() {
  return (
    <Panel
      id="skills"
      tone="zest"
      labelledBy="skills-title"
      decor={
        <Flower lobes={6} depth={0.3} fill="#d9cef7" className="pointer-events-none absolute -right-20 bottom-[-6rem] h-80 w-80 rotate-6 opacity-80" />
      }
    >
      <SectionHeader
        id="skills-title"
        icon={Sparkles}
        label="Capabilities"
        large
        title={
          <>
            The stack{" "}
            <span className="text-outline" style={{ ["--outline-fill" as string]: "#eaf7a6" }}>behind</span> the work
          </>
        }
        description="From Figma to production TypeScript and serverless AI backends, grouped by how I use them day to day."
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((entry, index) => {
          const meta = GROUP_META[entry.group] ?? { icon: Sparkles, bg: "bg-white", rotate: "0deg" };
          const Icon = meta.icon;
          return (
            <li key={entry.group}>
              <SectionReveal delay={index * 0.05} className="h-full">
                <motion.article
                  whileHover={{ y: -6, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  style={{ rotate: meta.rotate }}
                  className={`h-full rounded-[1.75rem] border-2 border-ink p-6 shadow-[5px_5px_0_#1a1033] ${meta.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-white text-ink">
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="font-display text-xl text-ink">{entry.group}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {entry.items.map((item) => (
                      <li key={item} className="tag-minimal">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </SectionReveal>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
