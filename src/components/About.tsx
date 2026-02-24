"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-black py-32 lg:py-44"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2A1C14] to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-[#D48C45]">
            Our Story
          </p>
          <h2 className="mb-8 font-[family-name:var(--font-playfair)] text-4xl font-light leading-tight tracking-tight text-[#F9F4EF] md:text-5xl">
            Crafted with
            <br />
            <span className="italic">Obsession.</span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-[#C8BCA7]/80">
            <p>
              Every bottle begins at sunrise — with hands selecting only the
              ripest cherries from our partnered farms across the Colombian
              highlands. We roast in micro-batches of no more than 12 kilograms,
              ensuring every bean reaches its full aromatic potential.
            </p>
            <p>
              The cold-brew process takes 18 hours. No shortcuts. No
              compromises. The result is a concentrate so smooth, so rich, that
              it redefines what iced coffee can be. We then marry it with
              farm-fresh cream and our signature hand-fractured ice.
            </p>
            <p>
              This isn&apos;t just coffee. It&apos;s a daily ritual, elevated.
            </p>
          </div>

          {/* Accent line */}
          <div className="mt-10 h-px w-16 bg-[#D48C45]/50" />
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#2A1C14] bg-[#0a0604]">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A0F09] via-[#0a0604] to-black" />
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,140,69,0.06)_0%,_transparent_60%)]" />

            {/* Craft stats content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-8 py-12">
              {/* Top label */}
              <p className="text-xs tracking-[0.35em] uppercase text-[#D48C45]/70">
                Behind the Craft
              </p>

              {/* Stats grid */}
              <div className="grid w-full max-w-xs grid-cols-2 gap-8">
                {[
                  { value: "18h", label: "Cold Brew Time" },
                  { value: "12kg", label: "Micro-Batch Size" },
                  { value: "100%", label: "Arabica Beans" },
                  { value: "3×", label: "Filtered Water" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[#F9F4EF] md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-[#C8BCA7]/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative divider */}
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#D48C45]/40 to-transparent" />

              {/* Quote */}
              <p className="max-w-[240px] text-center font-[family-name:var(--font-playfair)] text-sm italic leading-relaxed text-[#C8BCA7]/60">
                &ldquo;No shortcuts. No compromises. Just craft.&rdquo;
              </p>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 h-8 w-8 border-l border-t border-[#D48C45]/20" />
            <div className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[#D48C45]/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
