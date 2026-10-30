"use client";

import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Flower, SpinBadge } from "@/app/components/ui/blob";
import { Panel } from "@/app/components/ui/panel";
import { SectionHeader } from "@/app/components/ui/section-header";
import { SectionReveal } from "@/app/components/ui/section-reveal";
import { PROFILE, socials } from "@/app/data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

/** Plain HTML form endpoint: delivers submissions straight to this inbox, no API key needed. */
const FORM_ENDPOINT = `https://formsubmit.co/${PROFILE.emailDisplay}`;

const fieldClass =
  "w-full rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-[15px] font-medium text-ink outline-none transition placeholder:text-ink-soft focus:bg-white focus:shadow-[3px_3px_0_#1a1033]";
const labelClass = "mb-1.5 block text-xs font-extrabold uppercase tracking-[0.12em] text-ink";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Spam trap: real visitors never see or fill this field. Bots get a fake
    // "sent" state (nothing is submitted) so they don't retry or probe the form.
    if (data.get("_honey")) {
      form.reset();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(FORM_ENDPOINT.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (!res.ok || json.success === false || json.success === "false") {
        setError(json.message ?? "Something went wrong. Please email me directly.");
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
    <Panel
      id="contact"
      tone="bubblegum"
      labelledBy="contact-title"
      decor={
        <>
          <Flower lobes={8} depth={0.22} fill="#eaf7a6" className="pointer-events-none absolute -left-20 bottom-[-5rem] h-72 w-72 -rotate-6" />
          <div className="pointer-events-none absolute right-8 top-8 hidden md:block">
            <SpinBadge text="Say hello ✺ Say hello ✺ " size={132} bg="#fff7e8" />
          </div>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <SectionReveal>
          <SectionHeader
            id="contact-title"
            icon={Mail}
            label="Contact"
            large
            title={
              <>
                Let&apos;s build{" "}
                <span className="marker" style={{ ["--marker" as string]: "#eaf7a6" }}>
                  something
                </span>{" "}
                together
              </>
            }
            description="Open to junior software engineering roles across Canada and the US. I reply quickly and am happy to walk through any project in detail."
          />
          <ul className="mt-8 space-y-3 text-[15px] font-bold text-ink">
            <li className="flex items-center gap-3">
              <Mail size={18} aria-hidden />
              <a href={PROFILE.emailHref} className="underline decoration-2 underline-offset-4 hover:bg-zest">
                {PROFILE.emailDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} aria-hidden />
              {PROFILE.city} · {PROFILE.relocation}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {socials.map((social) => (
              <a key={social.label} href={social.href} className="tag-minimal">
                {social.label}
              </a>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          {status === "sent" ? (
            <div
              role="status"
              className="flex flex-col items-start gap-4 rounded-[2rem] border-2 border-ink bg-white p-8 shadow-[6px_6px_0_#1a1033]"
            >
              <CheckCircle2 className="h-9 w-9 text-forest" aria-hidden />
              <h3 className="font-display text-3xl text-ink">Message sent</h3>
              <p className="text-base font-medium leading-relaxed text-ink-muted">
                Thanks for reaching out. I&apos;ll reply to the email you provided as soon as I can.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn-secondary">
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="grid gap-5 rounded-[2rem] border-2 border-ink bg-white p-6 shadow-[6px_6px_0_#1a1033] md:p-8"
              action={FORM_ENDPOINT}
              method="POST"
              onSubmit={onSubmit}
              aria-describedby={status === "error" ? "form-error" : undefined}
            >
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  Role or project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={4000}
                  placeholder="Tell me about the role or project you are hiring for"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <input type="hidden" name="_subject" value="New message from your portfolio" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="_honey">Leave this empty</label>
                <input id="_honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" ? (
                <p id="form-error" role="alert" className="rounded-xl border-2 border-cherry bg-blush px-4 py-2.5 text-sm font-bold text-ink">
                  {error}
                </p>
              ) : null}

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send message"} <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          )}
        </SectionReveal>
      </div>
    </Panel>
  );
}
