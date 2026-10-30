"use client";

import { Briefcase } from "lucide-react";
import { Flower } from "@/app/components/ui/blob";
import { Panel } from "@/app/components/ui/panel";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";
import { EXPERIENCE } from "@/app/data/portfolio";

const ROLE_TONES = ["bg-zest", "bg-lavender", "bg-aqua"] as const;

export function ExperienceSection() {
  return (
    <Panel
      id="experience"
      tone="peach"
      labelledBy="experience-title"
      decor={
        <Flower lobes={5} depth={0.3} fill="#f9a8c9" className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 -rotate-12 opacity-80" />
      }
    >
      <SectionHeader
        id="experience-title"
        icon={Briefcase}
        label="Experience"
        large
        title={
          <>
            Shipping product work{" "}
            <span className="marker" style={{ ["--marker" as string]: "#fff7e8" }}>
              with real teams
            </span>
          </>
        }
        description="From AI chat interfaces in production to client websites and a cross-platform health dashboard."
      />

      <ol className="mt-14 space-y-6">
        {EXPERIENCE.map((item, index) => {
          const current = item.date.includes("Present");
          return (
            <li key={`${item.company}-${item.role}`}>
              <SectionReveal delay={index * 0.05}>
                <article className="grid gap-6 rounded-[2rem] border-2 border-ink bg-white p-6 shadow-[6px_6px_0_#1a1033] md:grid-cols-[230px_1fr] md:gap-10 md:p-9">
                  <div>
                    <span
                      className={`font-display grid h-14 w-14 place-items-center rounded-2xl border-2 border-ink text-xl text-ink ${ROLE_TONES[index % ROLE_TONES.length]}`}
                      aria-hidden
                    >
                      {item.company.charAt(0)}
                    </span>
                    <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.1em] text-ink">{item.date}</p>
                    <p className="mt-1 text-sm font-medium text-ink-muted">{item.location}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="tag-minimal">{item.type}</span>
                      {current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-zest px-2.5 py-1 text-[11px] font-extrabold text-forest">
                          <span className="relative flex h-1.5 w-1.5" aria-hidden>
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
                          </span>
                          Current
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-ink md:text-3xl">{item.role}</h3>
                    <p className="mt-1 text-base font-bold text-grape">{item.company}</p>
                    <ul className="mt-5 space-y-3">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-[15px] font-medium leading-relaxed text-ink-muted">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-bubblegum" aria-hidden />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </SectionReveal>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
