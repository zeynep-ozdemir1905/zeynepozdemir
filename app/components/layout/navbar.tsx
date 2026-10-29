"use client";

import { Download, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROFILE, RESUME_PDF, socials } from "@/app/data/portfolio";

const NAV = [
  { id: "intro", label: "Intro", href: "#intro" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

type NavbarProps = {
  mobileOpen: boolean;
  onToggle: () => void;
};

export function Navbar({ mobileOpen, onToggle }: NavbarProps) {
  const webLinks = socials.filter((s) => s.label !== "Email");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { threshold: 0.2, rootMargin: "-15% 0px -60% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-6">
        <a href="#intro" className="flex shrink-0 items-center gap-3 no-underline">
          <span className="font-display text-lg font-bold text-[var(--ink)]">{PROFILE.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                active === id ? "text-[var(--ink)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {active === id ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2 -bottom-0.5 h-px bg-[var(--ink)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            href={RESUME_PDF.href}
            download={RESUME_PDF.fileName}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-medium text-[var(--ink)] sm:inline-flex"
          >
            <Download size={15} aria-hidden />
            Resume
          </motion.a>
          <motion.a
            href={PROFILE.emailHref}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden rounded-full bg-[var(--ink)] px-5 py-2 text-sm font-medium text-white sm:inline-flex"
          >
            Email me
          </motion.a>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg border border-[var(--line)] p-2 text-[var(--ink)] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-[var(--line)] bg-[var(--surface)] px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onToggle}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--ink-muted)] hover:bg-[var(--surface-warm)] hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={RESUME_PDF.href}
            download={RESUME_PDF.fileName}
            onClick={onToggle}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-4 py-3 text-sm font-medium text-white"
          >
            <Download size={15} aria-hidden />
            {RESUME_PDF.label}
          </a>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--line)] pt-4">
            {webLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="tag-minimal"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
