"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,140,69,0.06)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-sm tracking-[0.3em] uppercase text-[#D48C45]"
        >
          d~offee Iced Coffee
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-playfair)] text-6xl leading-[1.05] font-light tracking-tight text-[#F9F4EF] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          The Art of
          <br />
          <span className="italic">the Pour.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed tracking-tight text-[#C8BCA7] md:text-lg"
        >
          Experience the perfect balance of bold espresso and velvet cream.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-[#D48C45]">
            Scroll to discover
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-[#D48C45]"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="8"
              cy="8"
              r="2"
              fill="currentColor"
              animate={{ cy: [8, 14, 8] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
