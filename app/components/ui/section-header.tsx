"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { easeOut } from "@/app/lib/motion";

type SectionHeaderProps = {
  id?: string;
  label: string;
  title: ReactNode;
  description?: string;
  icon?: LucideIcon;
  centered?: boolean;
  large?: boolean;
};

export function SectionHeader({ id, label, title, description, icon: Icon, centered, large }: SectionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut }}
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="eyebrow">
        {Icon ? <Icon size={14} aria-hidden /> : null}
        {label}
      </p>
      <h2
        id={id}
        className={`font-display mt-5 text-ink ${
          large ? "text-[clamp(2.25rem,5.2vw,4.25rem)] leading-[1]" : "text-[clamp(1.875rem,4vw,3rem)] leading-[1.05]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base font-medium leading-relaxed text-ink-muted md:text-lg ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
