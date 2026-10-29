import Link from "next/link";
import {
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  RESUME_PDF,
  RESUME_SUMMARY,
  SKILL_GROUPS,
  VOLUNTEER,
  projects,
} from "@/app/data/portfolio";

const featured = projects.slice(0, 4);

export const metadata = {
  title: "Resume | Zeynep Ozdemir",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[var(--surface)] px-6 py-16 text-[var(--ink)]">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-8">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-2 text-[var(--ink-muted)]">{PROFILE.headline}</p>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              {PROFILE.city} ({PROFILE.relocation.toLowerCase()}) · {PROFILE.emailDisplay} · {PROFILE.phoneDisplay}
            </p>
          </div>
          <div className="flex gap-2">
            <a href={RESUME_PDF.href} download={RESUME_PDF.fileName} className="btn-primary">
              Download PDF
            </a>
            <Link href="/" className="btn-secondary">
              Portfolio
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="eyebrow">Summary</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">{RESUME_SUMMARY}</p>
        </section>

        <section className="mt-12">
          <h2 className="eyebrow">Technical skills</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {SKILL_GROUPS.map((group) => (
              <div key={group.group} className="grid gap-1 sm:grid-cols-[160px_1fr]">
                <dt className="font-semibold">{group.group}</dt>
                <dd className="text-[var(--ink-muted)]">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="eyebrow">Professional experience</h2>
          <div className="mt-6 space-y-8">
            {EXPERIENCE.map((item) => (
              <article key={`${item.company}-${item.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">
                    {item.role}, {item.company}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]">{item.date}</p>
                </div>
                <p className="text-sm text-[var(--ink-soft)]">
                  {item.location} · {item.type}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[var(--ink-muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="eyebrow">Leadership and volunteering</h2>
          <div className="mt-6 space-y-5">
            {VOLUNTEER.map((role) => (
              <article key={`${role.org}-${role.title}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">
                    {role.title}, {role.org}
                  </h3>
                  {role.period ? (
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]">{role.period}</p>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">{role.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="eyebrow">Projects</h2>
          <div className="mt-6 space-y-5">
            {featured.map((project) => (
              <article key={project.id}>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">{project.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="eyebrow">Education</h2>
          <div className="mt-6 space-y-4 text-sm">
            {EDUCATION.map((edu) => (
              <p key={edu.degree}>
                <span className="font-semibold">{edu.degree}</span>
                <br />
                <span className="text-[var(--ink-muted)]">
                  {edu.school}, {edu.location} · {edu.date}
                </span>
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
