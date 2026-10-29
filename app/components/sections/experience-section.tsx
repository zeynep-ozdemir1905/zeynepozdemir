"use client";

import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/app/data/portfolio";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-alt scroll-mt-28 px-6 py-28 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          icon={Briefcase}
          label="Experience"
          title="Shipping product work with real teams"
          description="From AI chat interfaces in production to client websites and a cross-platform health dashboard."
          large
        />
        <div className="mt-16 space-y-0">
          {EXPERIENCE.map((item, index) => (
            <SectionReveal key={`${item.company}-${item.role}`} delay={index * 0.05}>
              <article className="grid gap-6 border-b border-[var(--line)] py-10 md:grid-cols-[220px_1fr] md:gap-12">
                <div>
                  <p className="text-sm font-medium text-[var(--ink-soft)]">{item.date}</p>
                  <p className="mt-2 text-sm text-[var(--accent-bright)]">{item.location}</p>
                  <span className="tag-minimal mt-3">{item.type}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--ink)]">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--ink-muted)]">{item.company}</p>
                  <ul className="mt-5 space-y-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-warm)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
