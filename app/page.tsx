"use client";

import { useEffect, useState } from "react";
import { BackgroundEffects } from "@/app/components/layout/background-effects";
import { Navbar } from "@/app/components/layout/navbar";
import { AboutSection } from "@/app/components/sections/about-section";
import { ContactSection } from "@/app/components/sections/contact-section";
import { ExperienceSection } from "@/app/components/sections/experience-section";
import { HeroSection } from "@/app/components/sections/hero-section";
import { ProjectsSection } from "@/app/components/sections/projects-section";
import { SkillsSection } from "@/app/components/sections/skills-section";
import { VolunteerSection } from "@/app/components/sections/volunteer-section";
import { LoadingScreen } from "@/app/components/ui/loading-screen";
import { MarqueeStrip } from "@/app/components/ui/marquee-strip";
import { ScrollProgress } from "@/app/components/ui/scroll-progress";
import { FOOTER_NAV } from "@/app/data/portfolio";

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative overflow-hidden text-[var(--ink)]">
      <LoadingScreen loading={loading} />
      <ScrollProgress />
      <BackgroundEffects />
      <Navbar mobileOpen={mobileOpen} onToggle={() => setMobileOpen((value) => !value)} />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <VolunteerSection />
      <ContactSection />
      <footer className="border-t border-[var(--line)] px-6 pb-16 pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {FOOTER_NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[var(--ink-soft)]">
            Zeynep Ozdemir · Junior Software Engineer · Calgary, AB · Open to Canada and US
          </p>
        </div>
      </footer>
    </main>
  );
}
