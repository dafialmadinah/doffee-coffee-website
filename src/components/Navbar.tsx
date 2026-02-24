"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = ["The Craft", "Ingredients", "About"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0604]/70 backdrop-blur-xl border-b border-[#2A1C14]/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-playfair)] text-xl tracking-[0.25em] text-[#F9F4EF] lg:text-2xl"
        >
          D~OFFEE
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm tracking-wider text-[#C8BCA7] transition-colors duration-300 hover:text-[#D48C45]"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className="block h-[1.5px] w-6 bg-[#F9F4EF]" />
          <span className="block h-[1.5px] w-4 bg-[#F9F4EF]" />
        </button>
      </div>
    </motion.nav>
  );
}
