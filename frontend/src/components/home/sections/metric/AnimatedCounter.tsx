"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

type AnimatedCounterProps = {
  value: number;
  isActive: boolean;
  duration?: number;
};

export default function AnimatedCounter({
  value,
  isActive,
  duration = 1.5,
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isActive) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [isActive, value, duration, count]);

  return <motion.span>{rounded}</motion.span>;
}
