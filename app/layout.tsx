import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Providers } from "@/app/components/ui/providers";
import { PROFILE, SITE_URL, socials } from "@/app/data/portfolio";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Zeynep Ozdemir | Junior Software Engineer — Frontend & Full-Stack";
const DESCRIPTION =
  "Calgary-based junior software engineer building accessible, responsive products in React, Next.js, and TypeScript — AI chat interfaces, serverless LLM agents, and end-to-end design. Open to Canada and US.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Zeynep Ozdemir" },
  description: DESCRIPTION,
  applicationName: "Zeynep Ozdemir — Portfolio",
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  keywords: [
    "junior software engineer",
    "frontend developer",
    "full-stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX",
    "Calgary",
    "Alberta",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zeynep Ozdemir | Junior Software Engineer",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Zeynep Ozdemir",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeynep Ozdemir | Junior Software Engineer",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff7e8",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: "Junior Software Engineer",
  description: DESCRIPTION,
  url: SITE_URL,
  email: PROFILE.emailDisplay,
  telephone: PROFILE.phoneDisplay,
  address: { "@type": "PostalAddress", addressLocality: "Calgary", addressRegion: "AB", addressCountry: "CA" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Southern Alberta Institute of Technology (SAIT)" },
  worksFor: { "@type": "Organization", name: "Thrive Creative Ltd" },
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Figma", "Accessibility", "LLM APIs"],
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${display.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          // Static, server-built JSON — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
