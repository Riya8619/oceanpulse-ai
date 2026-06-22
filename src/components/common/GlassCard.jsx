import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`bg-card/40 backdrop-blur-xl border border-border/40 rounded-xl shadow-lg shadow-black/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}