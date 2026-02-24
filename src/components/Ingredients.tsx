"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Ingredient {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ingredients: Ingredient[] = [
  {
    title: "100% Arabica Espresso",
    description:
      "Single-origin beans roasted in micro-batches for a clean, bold foundation with notes of dark chocolate and toasted almond.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 text-[#D48C45]"
      >
        <path
          d="M12 36c0-8 6-12 12-12s12 4 12 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 24c0-4 2.5-8 6-10 3.5 2 6 6 6 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 14c0-3 1-5 2-7 1 2 2 4 2 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="36"
          x2="40"
          y2="36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Farm-Fresh Heavy Cream",
    description:
      "Locally sourced, cold-processed heavy cream that brings an impossibly smooth, velvety texture to every sip.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 text-[#D48C45]"
      >
        <ellipse
          cx="24"
          cy="14"
          rx="10"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 14v20c0 2.2 4.5 4 10 4s10-1.8 10-4V14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 24c0 2.2 4.5 4 10 4s10-1.8 10-4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    title: "Hand-Fractured Artisan Ice",
    description:
      "Crystal-clear, slow-melting cubes crafted from triple-filtered water — designed to chill without diluting the craft.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 text-[#D48C45]"
      >
        <rect
          x="12"
          y="12"
          width="24"
          height="24"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="12"
          x2="24"
          y2="36"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="12"
          y1="24"
          x2="36"
          y2="24"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
];

function Card({
  ingredient,
  index,
}: {
  ingredient: Ingredient;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-[#2A1C14] bg-[#0a0604]/60 p-8 transition-all duration-500 hover:border-[#D48C45]/30 hover:bg-[#0a0604]/80 lg:p-10"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,_rgba(212,140,69,0.04)_0%,_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-6">{ingredient.icon}</div>
        <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-light tracking-tight text-[#F9F4EF] lg:text-2xl">
          {ingredient.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#C8BCA7]/80 lg:text-base">
          {ingredient.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Ingredients() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="ingredients" className="relative bg-black py-32 lg:py-44">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2A1C14] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center lg:mb-24"
        >
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-[#D48C45]">
            What&apos;s Inside
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-light tracking-tight text-[#F9F4EF] md:text-5xl lg:text-6xl">
            Three Pillars of Craft
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {ingredients.map((ingredient, i) => (
            <Card key={ingredient.title} ingredient={ingredient} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
