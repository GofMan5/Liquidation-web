"use client";

import { motion } from "framer-motion";


export default function HeroIllustration() {

  const nodes = [0, 72, 144, 216, 288].map((angle) => ({
    cx: (400 + Math.cos((angle * Math.PI) / 180) * 220).toFixed(3),
    cy: (400 + Math.sin((angle * Math.PI) / 180) * 220).toFixed(3),
    x2: (400 + Math.cos((angle * Math.PI) / 180) * 180).toFixed(3),
    y2: (400 + Math.sin((angle * Math.PI) / 180) * 180).toFixed(3),
  }));

  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center relative">
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[800px] opacity-90"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#48C4B9" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#48C4B9" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#48C4B9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2EB9DF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#48C4B9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#48C4B9" stopOpacity="0" />
          </radialGradient>
          <filter id="blur-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx="400"
          cy="400"
          r="300"
          fill="url(#glow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M400 250 L530 325 L530 475 L400 550 L270 475 L270 325 Z"
          stroke="#48C4B9"
          strokeWidth="2"
          fill="url(#grad1)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "400px 400px" }}
        >
          <circle cx="400" cy="400" r="180" stroke="#27272a" strokeWidth="1" strokeDasharray="10 10" />
          <circle cx="400" cy="400" r="220" stroke="#48C4B9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 8" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "400px 400px" }}
        >
           <path
            d="M400 160 L400 200 M400 600 L400 640 M160 400 L200 400 M600 400 L640 400"
            stroke="#48C4B9"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          <circle cx="400" cy="400" r="260" stroke="#27272a" strokeWidth="1" />
        </motion.g>

        {nodes.map((node, i) => (
          <motion.g
            key={i}
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 3 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5 
            }}
          >
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#48C4B9"
              filter="url(#blur-glow)"
            />
            <line
              x1={node.cx}
              y1={node.cy}
              x2={node.x2}
              y2={node.y2}
              stroke="#48C4B9"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </motion.g>
        ))}

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <path d="M580 250 L650 250 L670 270" stroke="#27272a" strokeWidth="2" fill="none" />
            <rect x="650" y="245" width="40" height="10" rx="2" fill="#48C4B9" fillOpacity="0.2" />
            
            <path d="M220 550 L150 550 L130 530" stroke="#27272a" strokeWidth="2" fill="none" />
            <rect x="110" y="545" width="40" height="10" rx="2" fill="#48C4B9" fillOpacity="0.2" />
        </motion.g>
        
        <motion.rect
            x="500"
            y="500"
            width="120"
            height="80"
            rx="8"
            fill="url(#grad2)"
            stroke="#48C4B9"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            transition={{ delay: 0.5, duration: 1 }}
        />
         <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
         >
            <line x1="520" y1="520" x2="600" y2="520" stroke="#48C4B9" strokeWidth="2" strokeOpacity="0.6" />
            <line x1="520" y1="535" x2="580" y2="535" stroke="#48C4B9" strokeWidth="2" strokeOpacity="0.4" />
            <line x1="520" y1="550" x2="590" y2="550" stroke="#48C4B9" strokeWidth="2" strokeOpacity="0.4" />
         </motion.g>

        <motion.path
           d="M400 350 L440 390 L400 430 L360 390 Z"
           fill="#48C4B9"
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        />
      </svg>
    </div>
  );
}
