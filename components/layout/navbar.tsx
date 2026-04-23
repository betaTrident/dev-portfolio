"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
        const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
            setActiveSection(navLinks.find((l) => l.href === `#${id}`)?.label ?? "About");
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    setActiveSection(label);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 108;
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-linear-to-b from-[#131313] to-transparent">
      <div className="relative flex items-center px-8 py-6 max-w-7xl mx-auto">
        {/* Wordmark */}
        {/* <div className="text-xl font-black tracking-tighter text-[#e5e2e1]">
          THE AR(K)TECH
        </div> */}

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium tracking-tight text-sm absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href, link.label)}
              className={cn(
                "relative transition-all duration-300 bg-transparent border-none outline-none cursor-pointer pb-1 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-all after:duration-300",
                activeSection === link.label
                  ? "text-primary font-bold after:w-full after:bg-primary"
                  : "text-on-surface-variant hover:text-on-surface after:w-0 after:bg-primary/70"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Resume CTA */}
        {/* <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block bg-linear-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm scale-95 hover:scale-100 active:scale-90 transition-transform"
        >
          Resume
        </a> */}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#e5e2e1] flex flex-col gap-1.5 p-2 ml-auto"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={cn("block w-6 h-0.5 bg-[#e5e2e1] transition-transform duration-300", menuOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block w-6 h-0.5 bg-[#e5e2e1] transition-opacity duration-300", menuOpen && "opacity-0")} />
          <span className={cn("block w-6 h-0.5 bg-[#e5e2e1] transition-transform duration-300", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-panel flex flex-col gap-2 px-8 pb-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href, link.label)}
              className={cn(
                "text-left py-2 text-sm font-medium transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer w-full border-l-2 pl-3",
                activeSection === link.label
                  ? "text-primary border-primary font-bold"
                  : "text-on-surface-variant border-transparent hover:text-on-surface"
              )}
            >
              {link.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-linear-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm text-center"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
