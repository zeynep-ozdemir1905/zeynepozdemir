"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, FolderKanban, Github, LayoutTemplate, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Flower, Squiggle } from "@/app/components/ui/blob";
import { ProjectDevicePreview } from "@/app/components/ui/device-frame";
import { Panel } from "@/app/components/ui/panel";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";
import {
  projectEmbedSrc,
  projectPreviewLink,
  projects,
  UI_DESIGNS,
  uiDesignEmbedSrc,
  uiDesignPreviewLink,
  type Project,
  type UiDesign,
} from "@/app/data/portfolio";

const WORK_VIEWS = [
  {
    id: "development",
    label: "Engineering",
    description:
      "AI agents, mobile apps, hackathon builds, and web projects, each with its outcome, my role, and the stack.",
  },
  {
    id: "ui-design",
    label: "UI Design",
    description: "Figma files and prototypes, from wireframes through high-fidelity UI, ready for developer handoff.",
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

type TileProps = {
  index: number;
  accent: string;
  number: string;
  category: string;
  title: string;
  device: Project["device"];
  artId?: string;
  overview: string;
  outcome: string;
  contribution: string;
  tags: string[];
  actions: ReactNode;
  onOpen: () => void;
};

/** One project = one coloured tile: art on the colour, story on a white card. */
function ProjectTile({
  index,
  accent,
  number,
  category,
  title,
  device,
  artId,
  overview,
  outcome,
  contribution,
  tags,
  actions,
  onOpen,
}: TileProps) {
  const reversed = index % 2 === 1;

  return (
    <SectionReveal delay={0.04}>
      <article
        className="grid overflow-hidden rounded-[2rem] border-2 border-ink shadow-[6px_6px_0_#1a1033] lg:grid-cols-[1.05fr_0.95fr]"
        style={{ background: accent }}
      >
        <div className={`relative flex items-center justify-center p-6 md:p-10 ${reversed ? "lg:order-2" : ""}`}>
          <span
            className="font-display text-outline pointer-events-none absolute left-6 top-4 select-none text-6xl leading-none md:text-7xl"
            style={{ ["--outline-fill" as string]: accent }}
            aria-hidden
          >
            {number}
          </span>
          <Squiggle className="pointer-events-none absolute bottom-5 right-6 h-6 w-24" />
          <motion.button
            type="button"
            onClick={onOpen}
            whileHover={{ y: -6, rotate: reversed ? -1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative mt-10 w-full max-w-[560px] rounded-2xl text-left"
            aria-label={`Open ${title} preview`}
          >
            <ProjectDevicePreview variant={device} accent={accent} title={title} artId={artId} compact />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-xs font-extrabold text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              Expand <ArrowUpRight size={14} aria-hidden />
            </span>
          </motion.button>
        </div>

        <div
          className={`flex flex-col justify-center bg-white p-7 md:p-10 ${
            reversed ? "border-b-2 border-ink lg:order-1 lg:border-b-0 lg:border-r-2" : "border-t-2 border-ink lg:border-l-2 lg:border-t-0"
          }`}
        >
          <p className="eyebrow self-start">{category}</p>
          <h3 className="font-display mt-4 text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.05] text-ink">{title}</h3>

          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">Overview</dt>
              <dd className="mt-1.5 text-[15px] font-medium leading-relaxed text-ink-muted">{overview}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">Outcome</dt>
              <dd className="mt-1.5 text-[15px] font-semibold leading-relaxed text-ink">{outcome}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">My role</dt>
              <dd className="mt-1.5 text-[15px] font-medium leading-relaxed text-ink-muted">{contribution}</dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
            {tags.map((tag) => (
              <li key={tag} className="tag-minimal">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </div>
      </article>
    </SectionReveal>
  );
}

type ModalProps = {
  label: string;
  title: string;
  onClose: () => void;
  wide?: boolean;
  children: ReactNode;
};

function Modal({ label, title, onClose, wide, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[92vh] w-full overflow-y-auto rounded-[2rem] border-2 border-ink bg-white p-6 shadow-[8px_8px_0_#f9a8c9] md:p-9 ${
          wide ? "max-w-5xl" : "max-w-4xl"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-zest text-ink transition hover:rotate-90"
        >
          <X size={18} aria-hidden />
        </button>
        <p className="eyebrow">{label}</p>
        <h3 className="font-display mt-3 pr-12 text-3xl text-ink">{title}</h3>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ModalFacts({ outcome, contribution }: { outcome: string; contribution: string }) {
  return (
    <dl className="mt-5 grid gap-4 md:grid-cols-2">
      <div>
        <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">Outcome</dt>
        <dd className="mt-1 text-sm font-semibold leading-relaxed text-ink">{outcome}</dd>
      </div>
      <div>
        <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">My role</dt>
        <dd className="mt-1 text-sm font-medium leading-relaxed text-ink-muted">{contribution}</dd>
      </div>
    </dl>
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

  const pill = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2 text-sm font-bold transition ${
      active ? "bg-ink text-white" : "bg-white text-ink hover:bg-zest"
    }`;

  return (
    <Panel
      id="projects"
      tone="cream"
      labelledBy="projects-title"
      decor={
        <>
          <Flower lobes={7} depth={0.28} fill="#ffe4f0" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rotate-12" />
          <Flower lobes={6} depth={0.3} fill="#eaf7a6" className="pointer-events-none absolute -left-24 top-[40%] h-64 w-64 -rotate-12 opacity-70" />
        </>
      }
    >
      <SectionHeader
        id="projects-title"
        icon={FolderKanban}
        label="Selected work"
        centered
        large
        title={
          <>
            Projects across{" "}
            <span className="marker" style={{ ["--marker" as string]: "#d9cef7" }}>
              AI, mobile & web
            </span>
          </>
        }
        description={activeView.description}
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Work type">
        {WORK_VIEWS.map((view) => (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={workView === view.id}
            onClick={() => setWorkView(view.id)}
            className={pill(workView === view.id)}
          >
            {view.id === "ui-design" ? <LayoutTemplate className="h-4 w-4" aria-hidden /> : null}
            {view.label}
          </button>
        ))}
      </div>

      {workView === "development" ? (
        <>
          <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border-2 px-4 py-1.5 text-xs font-extrabold transition ${
                  activeFilter === filter
                    ? "border-ink bg-bubblegum text-ink"
                    : "border-transparent text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-10 md:space-y-14">
            {filtered.map((project, index) => {
              const previewLink = projectPreviewLink(project);
              return (
                <ProjectTile
                  key={project.id}
                  index={index}
                  accent={project.accent}
                  number={project.number}
                  category={project.category}
                  title={project.title}
                  device={project.device}
                  artId={project.id}
                  overview={project.description}
                  outcome={project.outcome}
                  contribution={project.contribution}
                  tags={project.tech}
                  onOpen={() => setActiveProject(project)}
                  actions={
                    <>
                      {previewLink ? (
                        <a href={previewLink} target="_blank" rel="noreferrer" className="btn-primary">
                          {previewLabel(project)} <ExternalLink className="h-4 w-4" aria-hidden />
                        </a>
                      ) : (
                        <button type="button" onClick={() => setActiveProject(project)} className="btn-primary">
                          View project <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </button>
                      )}
                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">
                          <Github className="h-4 w-4" aria-hidden /> GitHub
                        </a>
                      ) : null}
                    </>
                  }
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="mt-12 space-y-10 md:space-y-14">
          {UI_DESIGNS.map((design, index) => {
            const previewLink = uiDesignPreviewLink(design);
            return (
              <ProjectTile
                key={design.id}
                index={index}
                accent={design.accent}
                number={design.number}
                category="UI Design · Figma"
                title={design.title}
                device={design.device}
                overview={design.description}
                outcome={design.outcome}
                contribution={design.contribution}
                tags={design.tags}
                onOpen={() => setActiveDesign(design)}
                actions={
                  <>
                    {previewLink ? (
                      <a href={previewLink} target="_blank" rel="noreferrer" className="btn-primary">
                        Open in Figma <ExternalLink className="h-4 w-4" aria-hidden />
                      </a>
                    ) : null}
                    <button type="button" onClick={() => setActiveDesign(design)} className="btn-secondary">
                      Explore preview
                    </button>
                  </>
                }
              />
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {activeProject ? (
          <Modal
            key="project-modal"
            label={activeProject.category}
            title={activeProject.title}
            onClose={() => setActiveProject(null)}
          >
            <ModalFacts outcome={activeProject.outcome} contribution={activeProject.contribution} />
            <ul className="mt-4 flex flex-wrap gap-2">
              {activeProject.tech.map((item) => (
                <li key={item} className="tag-minimal">
                  {item}
                </li>
              ))}
            </ul>
            <div
              className="relative mt-6 max-h-[50vh] overflow-hidden rounded-2xl border-2 border-ink"
              style={{ background: activeProject.accent }}
            >
              <ProjectDevicePreview
                variant={activeProject.device}
                accent={activeProject.accent}
                title={activeProject.title}
                src={projectEmbedSrc(activeProject)}
                artId={activeProject.id}
                interactive={!!projectEmbedSrc(activeProject)}
              />
              {activeProject.prototype && !projectEmbedSrc(activeProject) ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <a href={activeProject.prototype} target="_blank" rel="noreferrer" className="btn-primary">
                    <ExternalLink className="h-4 w-4" aria-hidden /> Open Figma prototype
                  </a>
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {projectPreviewLink(activeProject) ? (
                <a href={projectPreviewLink(activeProject)} target="_blank" rel="noreferrer" className="btn-primary">
                  <ExternalLink className="h-4 w-4" aria-hidden /> Open full preview
                </a>
              ) : null}
              {activeProject.github ? (
                <a href={activeProject.github} target="_blank" rel="noreferrer" className="btn-secondary">
                  <Github className="h-4 w-4" aria-hidden /> GitHub
                </a>
              ) : null}
            </div>
          </Modal>
        ) : null}

        {activeDesign ? (
          <Modal key="design-modal" label="UI Design" title={activeDesign.title} onClose={() => setActiveDesign(null)} wide>
            <ModalFacts outcome={activeDesign.outcome} contribution={activeDesign.contribution} />
            <div
              className="relative mt-6 max-h-[50vh] overflow-hidden rounded-2xl border-2 border-ink"
              style={{ background: activeDesign.accent }}
            >
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
                className="btn-primary mt-6"
              >
                <ExternalLink className="h-4 w-4" aria-hidden /> Open in Figma
              </a>
            ) : null}
          </Modal>
        ) : null}
      </AnimatePresence>
    </Panel>
  );
}
