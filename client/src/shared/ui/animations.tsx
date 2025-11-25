"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  viewport = true
}: { 
  children: React.ReactNode; 
  delay?: number; 
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  viewport?: boolean;
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={!viewport ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={viewport ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={viewport ? { once: true, margin: "-50px" } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ 
  children, 
  className = "", 
  delay = 0,
  viewport = true
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  viewport?: boolean;
}) => {
    return (
        <motion.div
            initial="hidden"
            animate={!viewport ? "visible" : undefined}
            whileInView={viewport ? "visible" : undefined}
            viewport={viewport ? { once: true, margin: "-50px" } : undefined}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
