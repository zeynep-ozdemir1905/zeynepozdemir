"use client";

import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Flower } from "@/app/components/ui/blob";
import { PROFILE, RESUME_PDF, socials } from "@/app/data/portfolio";

const NAV = [
  { id: "intro", label: "Home", href: "#intro" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const onToggle = () => setMobileOpen((value) => !value);
  const webLinks = socials.filter((s) => s.label !== "Email");
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      // threshold must stay 0: the active band is a thin strip of the viewport, so a
      // ratio like 0.15 can never be met by tall sections (Projects) and the link sticks.
      { threshold: 0, rootMargin: "-30% 0px -60% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 md:px-5"
    >
      <div className="mx-auto max-w-6xl rounded-3xl border-2 border-ink bg-white/95 shadow-[4px_4px_0_#1a1033] backdrop-blur md:rounded-full">
        <div className="flex items-center justify-between gap-3 py-2 pl-3 pr-2.5 md:pl-4">
          <a href="#intro" className="flex shrink-0 items-center gap-2.5" aria-label={`${PROFILE.name} — home`}>
            <span className="relative grid h-9 w-9 place-items-center">
              <Flower lobes={7} depth={0.24} fill="#f9a8c9" stroke="#1a1033" className="absolute inset-0 h-full w-full" />
              <span className="font-display relative text-sm text-ink">Z</span>
            </span>
            <span className="font-display text-lg text-ink">{PROFILE.name}</span>
          </a>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {NAV.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                aria-current={active === id ? "true" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                  active === id ? "bg-zest text-ink" : "text-ink-muted hover:bg-blush hover:text-ink"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_PDF.href}
              download={RESUME_PDF.fileName}
              className="hidden items-center gap-1.5 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-bold text-ink transition hover:bg-zest sm:inline-flex"
            >
              <Download size={15} aria-hidden />
              Resume
            </a>
            <a
              href={`mailto:${PROFILE.emailDisplay}`}
              className="hidden rounded-full border-2 border-ink bg-bubblegum px-4 py-1.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 sm:inline-flex"
            >
              Email me
            </a>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-white text-ink md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden border-t-2 border-ink px-4 pb-4 pt-3 md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={onToggle}
                  className="rounded-xl px-3 py-2.5 text-base font-bold text-ink hover:bg-zest"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={RESUME_PDF.href}
              download={RESUME_PDF.fileName}
              onClick={onToggle}
              className="btn-primary mt-4 w-full"
            >
              <Download size={15} aria-hidden />
              {RESUME_PDF.label}
            </a>
            <div className="mt-4 flex flex-wrap gap-2">
              {webLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="tag-minimal">
                  {link.label}
                </a>
              ))}
              <a href={`mailto:${PROFILE.emailDisplay}`} className="tag-minimal">
                Email
              </a>
            </div>
          </motion.div>
        ) : null}
      </div>
    </motion.header>
  );
}
