"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PROFILE, socials } from "@/app/data/portfolio";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "peer w-full border-b border-[var(--line-strong)] bg-transparent px-0 pb-3 pt-6 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--ink)]";
const labelClass = "absolute left-0 top-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)]";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Please try again or email me directly.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-alt scroll-mt-28 px-6 py-28 md:py-36">
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <SectionReveal>
          <SectionHeader
            icon={Mail}
            label="Contact"
            title="Let's build something together"
            description="Open to junior software engineering roles across Canada and the US. I reply quickly and am happy to walk through any project in detail."
            large
          />
          <p className="mt-8 text-sm text-[var(--ink-muted)]">
            Prefer email?{" "}
            <a href={PROFILE.emailHref} className="font-medium text-[var(--accent-bright)] hover:underline">
              {PROFILE.emailDisplay}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social) => (
              <motion.a key={social.label} href={social.href} whileHover={{ y: -2 }} className="tag-minimal">
                {social.label}
              </motion.a>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          {status === "sent" ? (
            <div
              role="status"
              className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-8"
            >
              <CheckCircle2 className="h-8 w-8 text-[#057642]" aria-hidden />
              <h3 className="font-display text-2xl font-bold text-[var(--ink)]">Message sent</h3>
              <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
                Thanks for reaching out. I&apos;ll reply to the email you provided as soon as I can.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn-secondary">
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="grid gap-5 border-t border-[var(--line)] pt-8 lg:border-t-0 lg:pt-0"
              onSubmit={onSubmit}
              noValidate={false}
            >
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder=" "
                  className={fieldClass}
                />
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder=" "
                  className={fieldClass}
                />
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={4000}
                  placeholder=" "
                  className={`${fieldClass} resize-none`}
                />
                <label htmlFor="message" className={labelClass}>
                  Role or project you are hiring for
                </label>
              </div>

              {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" ? (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              ) : null}

              <button type="submit" disabled={status === "sending"} className="btn-primary mt-4 w-full disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send message"} <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
