export type DevicePreview = "mobile" | "desktop" | "dual";
//this file contains the data for the projects and the UI designs where you can 
// embed the Figma files and prototypes or the live site links

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  accent: string;
  /** How the project appears in device chrome (Figma-style frames) */
  device: DevicePreview;
  /** Figma design file embed (iframe) */
  figma?: string;
  /** Figma prototype — opens in Figma (not embedded) */
  prototype?: string;
  live?: string;
  /** Source repository — the GitHub button only renders when this is set */
  github?: string;
  /** Impact / result — one tight sentence for recruiters */
  outcome: string;
  /** Your role and key deliverables — one tight sentence */
  contribution: string;
  /** Extended narrative for modals and resume page */
  details: string;
};

/** External link: live site, prototype, or figma */
export function projectPreviewLink(project: Project) {
  return project.live ?? project.prototype ?? project.figma;
}

/** URL safe to load inside an iframe (excludes raw Figma /proto links) */
export function projectEmbedSrc(project: Project) {
  if (project.live) return project.live;
  if (project.figma && !project.figma.includes("/proto/")) return project.figma;
  return undefined;
}

export type UiDesign = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  device: DevicePreview;
  /** Figma embed URL — Share → Embed → copy iframe src (embed.figma.com/...) */
  figma: string;
  /** Optional link to open the file in Figma */
  figmaLink?: string;
  prototype?: string;
  /** Impact / result — one tight sentence */
  outcome: string;
  /** Design role and deliverables — one tight sentence */
  contribution: string;
  /** Extended narrative for modals */
  details?: string;
};

/** Add designs here — paste your Figma embed URL into `figma`. */
export const UI_DESIGNS: UiDesign[] = [
  {
    id: "go-apricot-ui",
    number: "01",
    title: "Go Apricot",
    description: "Mobile workforce check-in flows — wireframes through high-fidelity UI.",
    tags: ["Mobile", "UX Research", "Prototyping"],
    accent: "#ffd2b3",
    device: "mobile",
    figma:
      "https://embed.figma.com/design/90lijAgk5ZeqkDhio7gfR1/Capstone-Employee?node-id=0-1&embed-host=share",
    figmaLink: "https://www.figma.com/design/90lijAgk5ZeqkDhio7gfR1/Capstone-Employee",
    outcome: "Clear mobile hierarchy for industrial field check-in workflows.",
    contribution: "Wireframes through high-fidelity screens with touch-friendly targets and readable layouts.",
    details: "Capstone mobile UI exploring industrial check-in workflows with clear hierarchy and touch targets.",
  },
  {
    id: "calgary-gift-card-ui",
    number: "02",
    title: "Calgary Gift Card App",
    description: "Gift-card onboarding and purchase flows with a warm, approachable visual system.",
    tags: ["Mobile", "UI Design", "Wireframes"],
    accent: "#a8e4db",
    device: "mobile",
    figma:
      "https://embed.figma.com/design/93G7mly7oPhtVMvHCH9C5a/Wireframe-Zeynep?node-id=0-1&embed-host=share",
    figmaLink: "https://www.figma.com/design/93G7mly7oPhtVMvHCH9C5a/Wireframe-Zeynep",
    outcome: "Warm, approachable mobile flows for gift-card onboarding and purchase.",
    contribution: "Wireframes and polished screens focused on gifting interactions and readable mobile layouts.",
    details: "Wireframes and polished screens focused on gifting interactions and readable mobile layouts.",
  },
  {
    id: "laise-ui",
    number: "03",
    title: "Laise",
    description: "UI design for Laise — polished layouts with clear hierarchy and a cohesive visual system.",
    tags: ["Web", "UI Design", "Figma"],
    accent: "#d9cef7",
    device: "desktop",
    figma:
      "https://embed.figma.com/design/QyqmbgUfTTaXKFIdnxtDdw/Laise-Farjeen?node-id=1-2&embed-host=share",
    figmaLink: "https://www.figma.com/design/QyqmbgUfTTaXKFIdnxtDdw/Laise-Farjeen",
    outcome: "Cohesive web UI with consistent spacing, typography, and visual hierarchy.",
    contribution: "High-fidelity screens and component patterns ready for developer handoff.",
    details: "High-fidelity UI screens for Laise with thoughtful spacing, typography, and component structure.",
  },
];

export function uiDesignEmbedSrc(design: UiDesign) {
  if (design.figma && !design.figma.includes("/proto/")) return design.figma;
  return undefined;
}

export function uiDesignPreviewLink(design: UiDesign) {
  return design.prototype ?? design.figmaLink ?? (design.figma || undefined);
}

/** In-page anchors for footer / secondary navigation. */
export const FOOTER_NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Resume (PDF)", href: "/Zeynep_Ozdemir_Resume.pdf" },
];

export const SITE_URL = "https://zeynepportfoy.vercel.app";

export const PROFILE = {
  name: "Zeynep Ozdemir",
  headline: "Junior Software Engineer | Frontend & Full-Stack",
  phoneDisplay: "(587) 664-6405",
  phoneHref: "tel:+15876646405",
  emailDisplay: "barikazeynep2@gmail.com",
  emailHref: "mailto:barikazeynep2@gmail.com",
  city: "Calgary, AB",
  relocation: "Open to Canada and US",
  openToWork: true,
  credential: "Junior Software Engineer · Frontend & Full-Stack",
};

/** ATS resume PDF served from /public for header download. */
// The PDF lives in /public — replace public/Zeynep_Ozdemir_Resume.pdf to update the download.
export const RESUME_PDF = {
  href: "/Zeynep_Ozdemir_Resume.pdf",
  fileName: "Zeynep_Ozdemir_Resume.pdf",
  label: "Download resume",
};

export const rotatingTitles = [
  "Junior Software Engineer",
  "Frontend & Full-Stack Developer",
  "UI/UX Designer",
];

/** Hero — recruiter-first messaging */
export const HERO_COPY = {
  badge: "Available for junior software engineer roles",
  /** Two-part headline: [plain, gradient] */
  headline: ["Frontend & full-stack engineering,", "grounded in design"] as const,
  subline:
    "I build accessible, responsive products in React, Next.js, and TypeScript — currently shipping AI chat interfaces and backend services at Thrive Creative.",
  education: "SAIT · B.IT Software Development (expected Apr 2028) · IT Diploma, Software Development (2026)",
  primaryCta: "See my work",
  secondaryCta: "Get in touch",
};

/** Currently — the first thing a recruiter wants to know. */
export const CURRENT_ROLE = {
  label: "Currently",
  role: "Junior Software Engineer (Product)",
  company: "Thrive Creative Ltd",
  since: "Sept 2026",
  stack: ["TypeScript", "GraphQL", "MySQL"],
};

/** Professional summary — mirrors the resume. */
export const RESUME_SUMMARY =
  "Junior software engineer with a frontend and UI/UX foundation, building accessible, responsive products in React, Next.js, and TypeScript. Currently shipping AI chat interfaces and backend services in a product engineering role, collaborating cross-functionally with senior and product engineers. Owns projects end to end, from user research and Figma design through production deployment, and has built serverless AI agents with LLM APIs.";

/** AI-assisted development — highlighted in hero, About, and Skills. */
export const AI_WORKFLOW = {
  label: "AI-assisted workflow",
  tools: ["Claude", "Gemini", "Cursor"],
  summary:
    "I use Claude, Gemini, and Cursor as AI coding agents to speed up coding, debugging, and code review, and I've built LLM-powered features with the Gemini API.",
};

/** Short pitch used in the About section header. */
export const ABOUT_COPY = {
  titleLead: "An engineer who designs, and a",
  titleMark: "designer who ships",
  description:
    "I started in UI/UX and grew into full-stack engineering. That means I can sit in a design review, write the React, wire up the API, and deploy it — then document how it all fits together.",
};

/** Skills ticker (marquee strip). */
export const MARQUEE_ITEMS = [
  "TypeScript",
  "•",
  "React",
  "•",
  "Next.js",
  "•",
  "React Native",
  "•",
  "Node.js",
  "•",
  "GraphQL",
  "•",
  "Supabase",
  "•",
  "LLM APIs",
  "•",
  "Claude",
  "•",
  "Gemini",
  "•",
  "Cursor",
  "•",
  "Figma",
  "•",
  "Accessibility (WCAG)",
  "•",
] as const;

export const aboutStats = [
  { label: "Product & client roles", value: "3" },
  { label: "Projects built", value: "6" },
  { label: "Hackathon award", value: "1" },
  { label: "Accessibility standard", value: "WCAG" },
];

export type Experience = {
  date: string;
  role: string;
  company: string;
  location: string;
  type: string;
  bullets: string[];
};

/** Professional experience — most recent first. */
export const EXPERIENCE: Experience[] = [
  {
    date: "Sept 2026 - Present",
    role: "Junior Software Engineer (Product)",
    company: "Thrive Creative Ltd",
    location: "Calgary, AB",
    type: "Internship",
    bullets: [
      "Build features for AI-powered products, including conversational chat interfaces and supporting backend services, using TypeScript, MySQL, and GraphQL, contributing to iterative production releases.",
      "Resolve defects flagged in GitLab merge requests, using Claude to speed up debugging and code review and keep merge requests moving through review.",
      "Document code architecture in written reports that help the team understand system structure and prioritize improvements.",
      "Clarify requirements, user flows, and edge cases with product engineers, and report bugs to senior engineers with clear, reproducible detail to align technical decisions with product goals.",
      "Collaborate with senior and product engineers on iterative releases, applying user-centered design to improve product usability.",
    ],
  },
  {
    date: "July 2026 - Present",
    role: "UI/UX Designer and Front-End Developer",
    company: "Project90 UCalgary",
    location: "Calgary, AB",
    type: "Volunteer",
    bullets: [
      "Designed Figma prototypes and built reusable, accessible React components for a cross-platform health dashboard, using a data-driven architecture so new modules require no UI changes.",
      "Conducted UX research and analyzed user feedback to refine designs, improving usability and visual consistency across screens.",
    ],
  },
  {
    date: "June 2026 - July 2026",
    role: "Web Developer and Designer",
    company: "Tech Connect Alberta",
    location: "Calgary, AB",
    type: "Contract / Summer Internship",
    bullets: [
      "Sole designer and developer for startup clients, owning the full project lifecycle: client discovery, UX research, design, development, hosting, and handoff.",
      "Delivered responsive multi-page websites with JavaScript, TypeScript, Tailwind CSS, and Vite, deployed on Vercel with consistent rendering across devices.",
      "Translated client business goals into cohesive UI designs, managing communication and iterating on stakeholder feedback.",
    ],
  },
];

export type VolunteerRole = {
  title: string;
  org?: string;
  period?: string;
  description: string;
};

export const VOLUNTEER: VolunteerRole[] = [
  {
    title: "Marketing and Designer",
    org: "Enactus SAIT",
    period: "June 2026 - Present",
    description:
      "Produced on-brand social media graphics and campaign assets in Canva and Figma to support recruitment and outreach, using AI tools to accelerate content production.",
  },
  {
    title: "Social Media and Digital Marketing Manager",
    org: "IDI Calgary",
    period: "2022 - Present",
    description:
      "Manage Instagram, Facebook, YouTube, and the WordPress site; apply SEO improvements and monthly analytics reviews to guide content strategy and grow audience engagement.",
  },
  {
    title: "Ambassador and Marketing",
    org: "Tech Connect Alberta",
    description:
      "Contributed to Tech Connect Alberta's marketing and social media, and represented the organization at networking events.",
  },
];

export const EDUCATION = [
  {
    date: "Expected April 2028",
    degree: "Bachelor of Information Technology, Software Development",
    school: "Southern Alberta Institute of Technology (SAIT)",
    location: "Calgary, AB",
    note: "Degree pathway continuing from diploma completion.",
  },
  {
    date: "Completed April 2026",
    degree: "Diploma, Information Technology, Software Development",
    school: "Southern Alberta Institute of Technology (SAIT)",
    location: "Calgary, AB",
    note: "Focus on UX/UI design, React, and accessible web development.",
  },
];

export const SKILL_GROUPS = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL (MySQL)"],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Native (Expo)",
      "Tailwind CSS",
      "Vite",
      "Responsive Design",
      "Accessibility (WCAG)",
    ],
  },
  {
    group: "Backend & AI",
    items: ["Node.js", "GraphQL", "Serverless Functions (Vercel)", "Supabase", "LLM APIs (Gemini)", "Resend"],
  },
  {
    group: "Design",
    items: ["Figma", "UX Research", "Prototyping", "User Testing", "Marketing"],
  },
  {
    group: "Tools & Practices",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Merge Requests & Code Review",
      "Agile/Scrum",
      "Debugging",
      "Testing",
    ],
  },
  {
    group: "AI-Assisted Development",
    items: ["Claude", "Gemini", "Cursor"],
  },
];

export const projects: Project[] = [
  // Edit projects here. Embed codes and live-site links are stored per project.
  {
    id: "lofty",
    number: "01",
    title: "Lofty — Real Estate AI Agent",
    category: "AI & Full-Stack",
    description:
      "A serverless AI agent that automates real estate lead and inquiry handling, giving agents faster first responses to prospects.",
    tech: ["Gemini", "Supabase", "Resend", "Vercel Serverless", "TypeScript"],
    accent: "#d9cef7",
    device: "desktop",
    github: "https://github.com/crv0326/real-estate-AI-agent",
    outcome: "Faster first responses to prospects, with every lead captured and followed up automatically.",
    contribution:
      "Designed, prototyped, and deployed the agent on Vercel; authored the technical specification covering architecture, data flow, and APIs.",
    details:
      "Integrated Gemini for conversation handling, Supabase for lead storage, and Resend for automated follow-up emails. Authored a technical specification covering architecture, data flow, and APIs, demonstrating end-to-end AI solution development.",
  },
  {
    id: "go-apricot",
    number: "02",
    title: "GoApricot",
    category: "Mobile",
    description:
      "A cross-platform mobile app for industrial workforce check-ins, taken from concept to an App Store-ready build.",
    tech: ["React Native (Expo)", "TypeScript", "Tailwind CSS", "Figma"],
    accent: "#ffd2b3",
    device: "mobile",
    figma:
      "https://embed.figma.com/design/90lijAgk5ZeqkDhio7gfR1/Capstone-Employee?node-id=0-1&embed-host=share",
    outcome: "App Store-ready cross-platform build, validated through an interactive prototype and user testing.",
    contribution:
      "Lead designer and developer — led the team, established the Git workflow, and led pull request reviews to keep code quality consistent.",
    details:
      "Led a team in designing and building a cross-platform mobile app in React Native (Expo), TypeScript, and Tailwind CSS, from concept to App Store-ready build. Validated the design with an interactive Figma prototype and user testing; established the team Git workflow and led pull request reviews.",
  },
  {
    id: "lockin-ai",
    number: "03",
    title: "LockIn AI",
    category: "Hackathon",
    description:
      "A gamified Chrome extension with a lockdown-style focus browser, timed study sessions, and distraction control.",
    tech: ["Chrome Extension", "TypeScript", "UI Design", "Hackathon"],
    accent: "#eaf7a6",
    device: "desktop",
    outcome: "Won the Community Choice Award at the hackathon.",
    contribution:
      "Built the focus-session experience: timed study sessions, distraction control, and a virtual garden with a reactive companion.",
    details:
      "Completed sessions grow a virtual garden with a reactive companion, encouraging sustained focus. Won the Community Choice Award.",
  },
  {
    id: "firewatch",
    number: "04",
    title: "Firewatch",
    category: "Hackathon",
    description:
      "A wildfire risk prediction tool that estimates fire danger before ignition across Alberta, British Columbia, and Saskatchewan.",
    tech: ["Hackathon", "Risk Prediction", "Business Proposal", "Pitch"],
    accent: "#f9a8c9",
    device: "desktop",
    github: "https://github.com/SaladStik/Firewatch",
    outcome: "A pre-ignition risk view for three western provinces, pitched with a full business case.",
    contribution: "Co-built the tool and wrote the business proposal and pitch.",
    details:
      "Co-built a wildfire risk prediction tool that estimates fire danger before ignition across Alberta, British Columbia, and Saskatchewan; contributed the business proposal and pitch.",
  },
  {
    id: "mlc",
    number: "05",
    title: "MLC Subsea Navigation",
    category: "Web",
    description: "Front-end web design and build of a responsive, multi-page brand website for a marine and subsea services company.",
    tech: ["Vite", "JavaScript", "Tailwind CSS", "Figma"],
    accent: "#a8e4db",
    device: "desktop",
    prototype:
      "https://www.figma.com/proto/qhs7vi6wQTljzR0POBCpWJ/ds_projectdrillsense?node-id=0-1&t=U6d9Nk78Tav6tFYn-1",
    github: "https://github.com/zeynep-ozdemir1905/mlcproj",
    outcome: "A responsive brand website with a cohesive visual identity across every page.",
    contribution: "Designed the UI in Figma and built the front end with Vite and Tailwind CSS.",
    details:
      "Designed and built a polished, fully responsive multi-page website with a cohesive visual identity and structured layouts for a premium client-facing brand presence.",
  },
  {
    id: "pengloo-party",
    number: "06",
    title: "Pengloo Party",
    category: "Game",
    description:
      "A cozy multiplayer penguin town built in Godot — a revised version of the original hackathon game, with developer handoff docs and UI mockups.",
    tech: ["Godot", "GDScript", "Multiplayer", "UI Mockups"],
    accent: "#c0cbff",
    device: "desktop",
    github: "https://github.com/amadeusk1/mruhacks",
    outcome: "A playable multiplayer prototype documented with a developer handoff and 48 UI screen concepts.",
    contribution: "Contributed to the revised version of the game, built with a team.",
    details:
      "A cozy multiplayer penguin town built in Godot. The repository includes prototype gameplay and networking, a developer handoff covering requirements and server architecture, and UI mockups across 12 boards.",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/zeynep-ozdemir1905" },
  { label: "LinkedIn", href: "https://ca.linkedin.com/in/zeynep-ozdemir-yyc" },
  { label: "Email", href: "mailto:barikazeynep2@gmail.com" },
];

/** Official LinkedIn profile badge — https://www.linkedin.com/badges/profile/create */
export const LINKEDIN_BADGE = {
  vanity: "zeynep-ozdemir-yyc",
  href: "https://ca.linkedin.com/in/zeynep-ozdemir-yyc?trk=profile-badge",
  locale: "en_US",
  size: "medium" as const,
  theme: "dark" as const,
  type: "VERTICAL" as const,
};
