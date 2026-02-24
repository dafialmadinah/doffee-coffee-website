"use client";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-black py-16 lg:py-20">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2A1C14] to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:justify-between lg:px-10">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-playfair)] text-lg tracking-[0.25em] text-[#F9F4EF]"
        >
          D~OFFEE
        </a>

        {/* Social links */}
        <ul className="flex items-center gap-8">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-xs tracking-wider text-[#C8BCA7]/60 transition-colors duration-300 hover:text-[#D48C45]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-xs tracking-wider text-[#C8BCA7]/40">
          &copy; {new Date().getFullYear()} d~offee Coffee Co.
        </p>
      </div>
    </footer>
  );
}
