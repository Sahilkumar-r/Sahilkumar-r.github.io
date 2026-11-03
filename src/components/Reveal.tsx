"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const base = [0.22, 1, 0.36, 1] as const; // the B7 base curve

/** Scroll reveal: rises 32px and fades in once (transform and opacity only). Reduced motion: plain opacity. */
export default function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-motion
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: reduce ? 0.3 : 0.7, delay: reduce ? 0 : delay, ease: base }}
    >
      {children}
    </motion.div>
  );
}
