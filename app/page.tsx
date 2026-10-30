import { Navbar } from "@/app/components/layout/navbar";
import { AboutSection } from "@/app/components/sections/about-section";
import { ContactSection } from "@/app/components/sections/contact-section";
import { ExperienceSection } from "@/app/components/sections/experience-section";
import { HeroSection } from "@/app/components/sections/hero-section";
import { ProjectsSection } from "@/app/components/sections/projects-section";
import { SkillsSection } from "@/app/components/sections/skills-section";
import { VolunteerSection } from "@/app/components/sections/volunteer-section";
import { IntroSplash } from "@/app/components/ui/intro-splash";
import { MarqueeStrip } from "@/app/components/ui/marquee-strip";
import { ScrollProgress } from "@/app/components/ui/scroll-progress";
import { FOOTER_NAV, PROFILE } from "@/app/data/portfolio";

export default function PortfolioPage() {
  return (
    <>
      <IntroSplash />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="relative overflow-x-clip pt-20 md:pt-24">
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <VolunteerSection />
        <ContactSection />
      </main>
      <footer className="px-3 pb-4 pt-2 md:px-5 md:pb-6">
        <div className="panel relative overflow-hidden bg-ink text-white">
          <p
            className="font-display select-none text-center text-[clamp(2.75rem,12vw,10rem)] uppercase leading-[0.9]"
            style={{ color: "#1a1033", WebkitTextStroke: "4px #ffffff", paintOrder: "stroke fill" }}
            aria-hidden
          >
            Zeynep Ozdemir
          </p>
          <nav aria-label="Footer" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {FOOTER_NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-zest"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="mt-6 text-center text-sm font-medium text-white/70">
            {PROFILE.name} · {PROFILE.credential} · {PROFILE.city} · {PROFILE.relocation}
          </p>
        </div>
      </footer>
    </>
  );
}
