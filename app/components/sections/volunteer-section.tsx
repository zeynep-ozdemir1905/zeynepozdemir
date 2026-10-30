"use client";

import { Heart } from "lucide-react";
import { Flower } from "@/app/components/ui/blob";
import { Panel } from "@/app/components/ui/panel";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";
import { VOLUNTEER } from "@/app/data/portfolio";

const TONES = ["bg-zest", "bg-bubblegum", "bg-aqua"] as const;

export function VolunteerSection() {
  return (
    <Panel
      id="volunteer"
      tone="lavender"
      labelledBy="volunteer-title"
      decor={
        <Flower lobes={7} depth={0.26} fill="#ffe4f0" className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rotate-12 opacity-80" />
      }
    >
      <SectionHeader
        id="volunteer-title"
        icon={Heart}
        label="Volunteer"
        large
        title={
          <>
            Leadership &{" "}
            <span className="marker" style={{ ["--marker" as string]: "#fff7e8" }}>
              community
            </span>
          </>
        }
        description="Design, marketing, and outreach work for student and community organizations."
      />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VOLUNTEER.map((role, index) => (
          <li key={`${role.title}-${role.org ?? index}`}>
            <SectionReveal delay={index * 0.05} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] border-2 border-ink bg-white p-6 shadow-[5px_5px_0_#1a1033]">
                <span className={`mb-5 h-3 w-16 rounded-full border-2 border-ink ${TONES[index % TONES.length]}`} aria-hidden />
                <h3 className="font-display text-xl leading-tight text-ink">{role.title}</h3>
                {role.org ? <p className="mt-1.5 text-sm font-bold text-grape">{role.org}</p> : null}
                {role.period ? (
                  <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">{role.period}</p>
                ) : null}
                <p className="mt-4 flex-1 text-sm font-medium leading-relaxed text-ink-muted">{role.description}</p>
              </article>
            </SectionReveal>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
