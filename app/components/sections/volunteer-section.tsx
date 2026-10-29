"use client";

import { Heart } from "lucide-react";
import { VOLUNTEER } from "@/app/data/portfolio";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";

export function VolunteerSection() {
  return (
    <section id="volunteer" className="scroll-mt-28 px-6 py-28 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          icon={Heart}
          label="Volunteer"
          title="Leadership and community"
          description="Design, marketing, and outreach work for student and community organizations."
          large
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VOLUNTEER.map((role, index) => (
            <SectionReveal key={`${role.title}-${role.org ?? index}`} delay={index * 0.05}>
              <article className="flex h-full flex-col border-t border-[var(--line)] pt-6">
                <h3 className="text-lg font-semibold text-[var(--ink)]">{role.title}</h3>
                {role.org ? <p className="mt-1 text-sm font-medium text-[var(--accent-bright)]">{role.org}</p> : null}
                {role.period ? (
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                    {role.period}
                  </p>
                ) : null}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">{role.description}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
