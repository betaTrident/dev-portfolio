"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const tickerItems = [
  { icon: "terminal", label: "TypeScript" },
  { icon: "javascript", label: "JavaScript (React, Node.js)" },
  { icon: "data_object", label: "Python (Django, Flask)" },
  { icon: "database", label: "SQL (PostgreSQL, MySQL)" },
  { icon: "storage", label: "NoSQL (MongoDB, Firebase)" },
  { icon: "cloud", label: "AWS / Cloud Native" },
  { icon: "hub", label: "Node.js" },
  { icon: "api", label: "REST & GraphQL" },
  { icon: "smart_toy", label: "Gemini AI / LLMs" },
  { icon: "memory", label: "IoT Systems" },
];

const bentoCards = [
  {
    span: "md:col-span-8",
    bg: "bg-surface-container-low",
    glow: true,
    label: "01 / Presentation Layer",
    title: "Frontend Engineering",
    desc: "Crafting fluid, accessible interfaces using modern JavaScript frameworks and type-safe systems.",
    chips: [
      { icon: "terminal", label: "TypeScript" },
      { icon: "javascript", label: "JavaScript" },
      { icon: "data_object", label: "React" },
    ],
    decorIcon: "layers",
    type: "chips",
  },
  {
    span: "md:col-span-4",
    bg: "bg-surface-container-high",
    glow: false,
    label: "03 / Data Store",
    title: "Persistence",
    desc: null,
    type: "table",
    rows: [
      { name: "PostgreSQL", tag: "RELATIONAL", highlight: true },
      { name: "MongoDB", tag: "DOCUMENT", highlight: false },
      { name: "Redis", tag: "CACHING", highlight: false },
      { name: "Firebase", tag: "REAL-TIME", highlight: false },
    ],
  },
  {
    span: "md:col-span-4",
    bg: "bg-surface-container-lowest",
    glow: false,
    label: "Specialized",
    title: "Intelligent Systems",
    desc: null,
    type: "specials",
    specials: [
      {
        icon: "smart_toy",
        name: "Google Gemini API",
        desc: "LLM orchestration and contextual AI integrations.",
      },
      {
        icon: "settings_input_component",
        name: "IoT Integration",
        desc: "Hardware-software bridge for sensor data networks.",
      },
    ],
  },
  {
    span: "md:col-span-8",
    bg: "bg-surface-container-low",
    glow: true,
    label: "02 / Logic & Services",
    title: "Backend Architecture",
    desc: "Building resilient server-side applications with emphasis on high-throughput and secure API design.",
    type: "icon-grid",
    iconGrid: [
      { icon: "hub", label: "Node.js" },
      { icon: "code", label: "Python" },
      { icon: "dns", label: "Django" },
      { icon: "api", label: "Flask" },
    ],
  },
];

const competencies = [
  {
    icon: "architecture",
    title: "Scalable Architecture",
    desc: "Designing systems that grow with demand, utilizing microservices and load-balancing strategies for high availability.",
  },
  {
    icon: "settings_ethernet",
    title: "API Engineering",
    desc: "Developing robust RESTful and GraphQL endpoints with strict documentation and security protocols.",
  },
  {
    icon: "memory",
    title: "IoT Systems",
    desc: "Connecting hardware to the cloud with real-time data pipelines and optimized edge processing.",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function TickerTrack() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Clone items for seamless loop
    const clone = el.cloneNode(true) as HTMLDivElement;
    el.parentElement?.appendChild(clone);

    const totalWidth = el.scrollWidth;
    const anim = gsap.to([el, clone], {
      x: `-=${totalWidth}`,
      ease: "none",
      duration: 28,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => { anim.kill(); };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-6" ref={trackRef}>
        {tickerItems.map((item, i) => (
          <div
            key={i}
            className="flex-none bg-surface-container-highest px-8 py-4 rounded-full flex items-center gap-4 hover:border-primary/40 border border-outline-variant/10 transition-colors cursor-default"
          >
            <span className="material-symbols-outlined text-primary">{item.icon}</span>
            <span className="font-bold text-lg tracking-tight whitespace-nowrap">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const competencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".bento-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }

    const compCards = competencyRef.current?.querySelectorAll(".comp-card");
    if (compCards) {
      gsap.fromTo(
        compCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: competencyRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="tech-stack" ref={sectionRef} className="py-32 bg-surface-container-lowest">

      {/* ── Marquee Ticker ─────────── */}
      <div className="max-w-7xl mx-auto px-8 mb-12 flex items-center gap-8">
        <h2 className="text-3xl font-bold tracking-tighter whitespace-nowrap">
          Engineered with Precision
        </h2>
        <div className="h-[1px] flex-grow bg-outline-variant/20 hidden md:block" />
      </div>

      <div className="py-4 mb-20">
        <TickerTrack />
      </div>

      {/* ── Bento Grid ─────────── */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-left">
          <span className="uppercase tracking-[0.2em] text-primary font-bold text-sm block mb-3">
            Technical Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Core Proficiencies
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Engineering digital ecosystems with a focus on modularity, scalability, and performance.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {bentoCards.map((card, i) => (
            <div
              key={i}
              className={`bento-card ${card.span} group relative overflow-hidden ${card.bg} rounded-xl p-8 transition-all duration-500 hover:scale-[1.02] ${card.glow ? "hover:shadow-[0_0_40px_-10px_rgba(173,198,255,0.15)]" : ""} ${card.bg === "bg-surface-container-lowest" ? "border border-outline-variant/10" : ""}`}
            >
              {card.type === "chips" && (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="uppercase tracking-[0.1em] text-primary mb-4 block text-xs font-bold">
                      {card.label}
                    </span>
                    <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                    <p className="text-on-surface-variant mb-8 max-w-md">{card.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {card.chips?.map((chip, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-3 bg-surface-container-highest px-5 py-3 rounded-full group-hover:bg-primary/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-primary">{chip.icon}</span>
                        <span className="font-medium">{chip.label}</span>
                      </div>
                    ))}
                  </div>
                  {card.decorIcon && (
                    <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <span className="material-symbols-outlined text-[160px]">{card.decorIcon}</span>
                    </div>
                  )}
                </div>
              )}

              {card.type === "table" && (
                <>
                  <span className="uppercase tracking-[0.1em] text-on-surface-variant mb-4 block text-xs font-bold">
                    {card.label}
                  </span>
                  <h3 className="text-2xl font-bold mb-6">{card.title}</h3>
                  <div className="space-y-4">
                    {card.rows?.map((row, j) => (
                      <div
                        key={j}
                        className={`flex justify-between items-center pb-2 ${j < (card.rows?.length ?? 0) - 1 ? "border-b border-outline-variant/20" : ""}`}
                      >
                        <span className="text-on-surface">{row.name}</span>
                        <span className={`text-xs font-mono ${row.highlight ? "text-primary" : "text-on-surface-variant"}`}>
                          {row.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {card.type === "specials" && (
                <div className="relative z-10">
                  <span className="uppercase tracking-[0.1em] text-primary mb-4 block text-xs font-bold">
                    {card.label}
                  </span>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <div className="space-y-4">
                    {card.specials?.map((s, j) => (
                      <div key={j} className="bg-surface-container p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-sm text-primary">{s.icon}</span>
                          <span className="text-sm font-bold">{s.name}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {card.type === "icon-grid" && (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="uppercase tracking-[0.1em] text-primary mb-4 block text-xs font-bold">
                      {card.label}
                    </span>
                    <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                    <p className="text-on-surface-variant mb-8 max-w-lg">{card.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {card.iconGrid?.map((g, j) => (
                      <div
                        key={j}
                        className="bg-surface-container-highest p-4 rounded-xl text-center group-hover:-translate-y-1 transition-transform"
                        style={{ transitionDelay: `${j * 75}ms` }}
                      >
                        <span className="material-symbols-outlined text-3xl mb-2 text-primary block">{g.icon}</span>
                        <div className="text-sm font-bold">{g.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Core Competencies ─────────── */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Core Competencies</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </div>

        <div ref={competencyRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competencies.map((c, i) => (
            <div
              key={i}
              className="comp-card glass-card p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">{c.icon}</span>
              </div>
              <h4 className="text-xl font-bold mb-3">{c.title}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
