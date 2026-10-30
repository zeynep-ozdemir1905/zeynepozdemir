"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-1.5 origin-left border-b-2 border-ink"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #f9a8c9, #eaf7a6, #a8e4db)",
      }}
    />
  );
}
