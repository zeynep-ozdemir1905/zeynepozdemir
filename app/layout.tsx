import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zeynepportfoy.vercel.app"),
  title: "Zeynep Ozdemir | Junior Software Engineer — Frontend & Full-Stack",
  description:
    "Portfolio of Zeynep Ozdemir, a Calgary-based junior software engineer building accessible products in React, Next.js, and TypeScript, with AI chat interfaces, serverless LLM agents, and end-to-end design experience.",
  openGraph: {
    title: "Zeynep Ozdemir | Junior Software Engineer",
    description:
      "Frontend & full-stack engineer with a UI/UX foundation. React, Next.js, TypeScript, and LLM-powered products. Open to Canada and US.",
    url: "https://zeynepportfoy.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
