"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, FolderKanban, Github, LayoutTemplate } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  projectEmbedSrc,
  projectPreviewLink,
  projects,
  Project,
  UI_DESIGNS,
  UiDesign,
  uiDesignEmbedSrc,
  uiDesignPreviewLink,
} from "@/app/data/portfolio";
import { ProjectDevicePreview } from "@/app/components/ui/device-frame";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";

const WORK_VIEWS = [
  {
    id: "development",
    label: "Engineering",
    description:
      "AI agents, mobile apps, hackathon builds, and web projects — each with its outcome, my role, and the stack.",
  },
  {
    id: "ui-design",
    label: "UI Design",
    description: "Figma files and prototypes — wireframes through high-fidelity UI, ready for developer handoff.",
  },
] as const;

type WorkView = (typeof WORK_VIEWS)[number]["id"];

const filters = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

function previewLabel(project: Project) {
  if (project.prototype) return "Prototype";
  if (project.live) return "View live";
  if (project.figma) return "Figma";
  return "Preview";
}

function uiPreviewLabel(design: UiDesign) {
  if (design.prototype) return "Prototype";
  if (design.figmaLink) return "Figma file";
  if (design.figma) return "Figma";
  return "Preview";
}

type VisualPanelProps = {
  accent: string;
  title: string;
  device: Project["device"];
  embedSrc?: string;
  indexLabel: string;
  categoryLabel: string;
  onOpen: () => void;
  reversed: boolean;
};

function VisualPanel({
  accent,
  title,
  device,
  embedSrc,
  indexLabel,
  categoryLabel,
  onOpen,
  reversed,
}: VisualPanelProps) {
  return (
    <div className={`relative ${reversed ? "lg:order-2" : "lg:order-1"}`}>
      <div
        className={`pointer-events-none absolute -z-10 rounded-3xl bg-[var(--surface-warm)] ${
          reversed ? "-left-6 top-8 h-[88%] w-[92%]" : "-right-6 top-6 h-[90%] w-[94%]"
        }`}
        aria-hidden
      />

      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="group relative w-full overflow-hidden rounded-2xl text-left shadow-[0_24px_60px_-28px_rgba(12,18,34,0.28)]"
        style={{ background: accent }}
        aria-label={`Open ${title} preview`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.5),transparent_52%)]" />
        <div className="relative max-h-[340px] overflow-hidden md:max-h-[380px]">
          <ProjectDevicePreview
            variant={device}
            accent={accent}
            title={title}
            src={embedSrc}
            compact
          />
        </div>
        <div className="absolute inset-0 flex items-end justify-end bg-linear-to-t from-[var(--ink)]/25 via-transparent to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--ink)]">
            Expand preview <ArrowUpRight size={14} />
          </span>
        </div>
      </motion.button>

      <span
        className={`absolute top-4 z-10 rounded-full bg-[var(--ink)] px-3 py-1 text-[11px] font-semibold tracking-wider text-white ${
          reversed ? "left-4 lg:-left-3" : "right-4 lg:-right-3"
        }`}
      >
        {indexLabel}
      </span>

      <span
        className={`absolute bottom-4 z-10 max-w-[70%] rounded-lg border border-[var(--line)] bg-[var(--surface-elevated)]/95 px-3 py-2 text-[11px] font-medium text-[var(--ink-muted)] backdrop-blur-sm ${
          reversed ? "right-4 lg:-right-4" : "left-4 lg:-left-4"
        }`}
      >
        {categoryLabel}
      </span>
    </div>
  );
}

type StoryPanelProps = {
  eyebrow: string;
  title: string;
  problem: string;
  outcome: string;
  contribution: string;
  tags: string[];
  reversed: boolean;
  actions: ReactNode;
};

function StoryPanel({ eyebrow, title, problem, outcome, contribution, tags, reversed, actions }: StoryPanelProps) {
  return (
    <div className={`flex flex-col justify-center ${reversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="font-display mt-4 text-[clamp(1.65rem,3.5vw,2.5rem)] font-bold leading-[1.08] text-[var(--ink)]">
        {title}
      </h3>

      <dl className="mt-6 space-y-5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Overview</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-[var(--ink-muted)]">{problem}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Outcome</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-[var(--ink)]">{outcome}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">My role</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-[var(--ink-muted)]">{contribution}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Stack</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="tag-minimal">
                {tag}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
    </div>
  );
}

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  isLast: boolean;
  onOpen: () => void;
};

function DevelopmentShowcase({ project, index, isLast, onOpen }: ProjectShowcaseProps) {
  const reversed = index % 2 === 1;
  const embedSrc = projectEmbedSrc(project);
  const previewLink = projectPreviewLink(project);
  return (
    <SectionReveal delay={index * 0.05}>
      <article className={`relative py-14 md:py-20 ${index % 2 === 0 ? "lg:-mr-4" : "lg:-ml-4"}`}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-16">
          <VisualPanel
            accent={project.accent}
            title={project.title}
            device={project.device}
            embedSrc={embedSrc}
            indexLabel={project.number}
            categoryLabel={project.category}
            onOpen={onOpen}
            reversed={reversed}
          />

          <StoryPanel
            eyebrow={project.category}
            title={project.title}
            problem={project.description}
            outcome={project.outcome}
            contribution={project.contribution}
            tags={project.tech}
            reversed={reversed}
            actions={
              <>
                {previewLink ? (
                  <a href={previewLink} target="_blank" rel="noreferrer" className="btn-primary">
                    {previewLabel(project)} <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <button type="button" onClick={onOpen} className="btn-primary">
                    View project <ArrowUpRight className="h-4 w-4" />
                  </button>
                )}
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                ) : null}
              </>
            }
          />
        </div>
      </article>
      {isLast ? null : <div className="divider-editorial my-4" />}
    </SectionReveal>
  );
}

type DesignShowcaseProps = {
  design: UiDesign;
  index: number;
  isLast: boolean;
  onOpen: () => void;
};

function UiDesignShowcase({ design, index, isLast, onOpen }: DesignShowcaseProps) {
  const reversed = index % 2 === 1;
  const embedSrc = uiDesignEmbedSrc(design);
  const previewLink = uiDesignPreviewLink(design);

  return (
    <SectionReveal delay={index * 0.05}>
      <article className={`relative py-14 md:py-20 ${index % 2 === 0 ? "lg:-mr-4" : "lg:-ml-4"}`}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-16">
          {embedSrc ? (
            <VisualPanel
              accent={design.accent}
              title={design.title}
              device={design.device}
              embedSrc={embedSrc}
              indexLabel={design.number}
              categoryLabel="UI Design · Figma"
              onOpen={onOpen}
              reversed={reversed}
            />
          ) : (
            <div
              className={`flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--line-strong)] p-8 ${
                reversed ? "lg:order-2" : "lg:order-1"
              }`}
              style={{ background: design.accent }}
            >
              <LayoutTemplate className="h-8 w-8 text-[var(--accent-bright)]" />
              {previewLink ? (
                <a href={previewLink} target="_blank" rel="noreferrer" className="btn-secondary">
                  {uiPreviewLabel(design)} <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          )}

          <StoryPanel
            eyebrow="UI Design"
            title={design.title}
            problem={design.description}
            outcome={design.outcome}
            contribution={design.contribution}
            tags={design.tags}
            reversed={reversed}
            actions={
              <>
                {previewLink ? (
                  <a href={previewLink} target="_blank" rel="noreferrer" className="btn-primary">
                    Open in Figma <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                {embedSrc ? (
                  <button type="button" onClick={onOpen} className="btn-secondary">
                    Explore embed
                  </button>
                ) : null}
              </>
            }
          />
        </div>
      </article>
      {isLast ? null : <div className="divider-editorial my-4" />}
    </SectionReveal>
  );
}

export function ProjectsSection() {
  const [workView, setWorkView] = useState<WorkView>("development");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeDesign, setActiveDesign] = useState<UiDesign | null>(null);

  const activeView = WORK_VIEWS.find((view) => view.id === workView) ?? WORK_VIEWS[0];

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="section-projects scroll-mt-28 px-6 py-28 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          icon={FolderKanban}
          label="Selected work"
          title="Projects across AI, mobile, and web"
          description={activeView.description}
          centered
          large
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {WORK_VIEWS.map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => setWorkView(view.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                workView === view.id
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
              }`}
            >
              {view.id === "ui-design" ? <LayoutTemplate className="h-4 w-4" /> : null}
              {view.label}
            </button>
          ))}
        </motion.div>

        {workView === "development" ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    activeFilter === filter
                      ? "bg-[var(--accent-bright)] text-white"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>

            <div className="mt-10">
              {filtered.map((project, index) => (
                <DevelopmentShowcase
                  key={project.id}
                  project={project}
                  index={index}
                  isLast={index === filtered.length - 1}
                  onOpen={() => setActiveProject(project)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-12">
            {UI_DESIGNS.map((design, index) => (
              <UiDesignShowcase
                key={design.id}
                design={design}
                index={index}
                isLast={index === UI_DESIGNS.length - 1}
                onOpen={() => setActiveDesign(design)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--ink)]/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 md:p-8"
            >
              <p className="eyebrow">{activeProject.category}</p>
              <h3 className="font-display mt-2 text-2xl font-bold text-[var(--ink)]">{activeProject.title}</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Outcome</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--ink)]">{activeProject.outcome}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">My role</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">{activeProject.contribution}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.tech.map((item) => (
                  <span key={item} className="tag-minimal">
                    {item}
                  </span>
                ))}
              </div>
              <div className="relative mt-6 max-h-[50vh] overflow-hidden rounded-xl" style={{ background: activeProject.accent }}>
                <ProjectDevicePreview
                  variant={activeProject.device}
                  accent={activeProject.accent}
                  title={activeProject.title}
                  src={projectEmbedSrc(activeProject)}
                  interactive={!!projectEmbedSrc(activeProject)}
                />
                {activeProject.prototype && !projectEmbedSrc(activeProject) ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <a href={activeProject.prototype} target="_blank" rel="noreferrer" className="btn-primary">
                      <ExternalLink className="h-4 w-4" /> Open Figma prototype
                    </a>
                  </div>
                ) : null}
              </div>
              {projectPreviewLink(activeProject) ? (
                <a
                  href={projectPreviewLink(activeProject)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-bright)] hover:underline"
                >
                  <ExternalLink className="h-4 w-4" /> Open full preview
                </a>
              ) : null}
              <button type="button" onClick={() => setActiveProject(null)} className="mt-6 btn-secondary">
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeDesign ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--ink)]/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 md:p-8"
            >
              <p className="eyebrow">UI Design</p>
              <h3 className="font-display mt-2 text-2xl font-bold text-[var(--ink)]">{activeDesign.title}</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Outcome</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--ink)]">{activeDesign.outcome}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">My role</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">{activeDesign.contribution}</dd>
                </div>
              </dl>
              <div className="relative mt-6 max-h-[50vh] overflow-hidden rounded-xl" style={{ background: activeDesign.accent }}>
                <ProjectDevicePreview
                  variant={activeDesign.device}
                  accent={activeDesign.accent}
                  title={activeDesign.title}
                  src={uiDesignEmbedSrc(activeDesign)}
                  interactive={!!uiDesignEmbedSrc(activeDesign)}
                />
              </div>
              {uiDesignPreviewLink(activeDesign) ? (
                <a
                  href={uiDesignPreviewLink(activeDesign)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-bright)] hover:underline"
                >
                  <ExternalLink className="h-4 w-4" /> Open in Figma
                </a>
              ) : null}
              <button type="button" onClick={() => setActiveDesign(null)} className="mt-6 btn-secondary">
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
