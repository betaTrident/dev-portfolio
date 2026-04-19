"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillsGlobeCanvas } from "@/components/3d/skills-globe";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

gsap.registerPlugin(ScrollTrigger);

type StackItem = {
  label: string;
};

type StackGroup = {
  title: string;
  items: StackItem[];
};

const featuredStackGroups: StackGroup[] = [
  {
    title: "Frontend",
    items: [
      { label: "JavaScript" },
      { label: "TypeScript" },
      { label: "React" },
      { label: "Next.js" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Node.js" },
      { label: "Python" },
      { label: "PostgreSQL" },
      { label: "MongoDB" },
      { label: "NestJS" },
      { label: "Express.js" },
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      { label: "TensorFlow" },
      { label: "PyTorch" },
      { label: "LangChain" },
      { label: "LlamaIndex" },
      { label: "OpenAI" },
      { label: "Anthropic" },
    ],
  },
];

const allStackGroups: StackGroup[] = [
  ...featuredStackGroups,
  {
    title: "Databases & Data",
    items: [{ label: "MySQL" }, { label: "SQLite" }, { label: "Redis" }, { label: "Firebase" }],
  },
  {
    title: "Cloud & DevOps",
    items: [{ label: "AWS" }, { label: "Docker" }, { label: "GitHub" }, { label: "Git" }],
  },
  {
    title: "Tools & Platforms",
    items: [{ label: "Figma" }, { label: "Strapi" }, { label: "Nx Monorepo" }, { label: "Framer" }, { label: "Sanity" }],
  },
  {
    title: "Additional Languages",
    items: [{ label: "HTML" }, { label: "CSS" }, { label: "PHP" }],
  },
];

// ─── Main Section ─────────────────────────────────────────────────────────────

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const panels = sectionRef.current?.querySelectorAll(".stack-panel");
    if (panels) {
      gsap.fromTo(
        panels,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
        <div className="h-px grow bg-outline-variant/20 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="stack-panel lg:col-span-6">
            <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 md:p-7">
              <Dialog>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-primary/90 mb-2">
                      Technical Overview
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Core Stack</h3>
                  </div>

                  <DialogTrigger asChild>
                    <button className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-on-surface transition-colors">
                      View All
                      <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        arrow_outward
                      </span>
                    </button>
                  </DialogTrigger>
                </div>

                <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto bg-surface-container-low text-on-surface">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-extrabold tracking-tight">Complete Tech Stack</DialogTitle>
                    <DialogDescription>
                      Full technology inventory grouped by domain.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allStackGroups.map((group) => (
                      <div key={group.title} className="rounded-xl border border-outline-variant/20 bg-surface-container p-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                          {group.title}
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {group.items.map((item) => (
                            <span
                              key={item.label}
                              className="rounded-lg border border-outline-variant/25 bg-surface-container-high px-3 py-2 text-sm text-on-surface"
                            >
                              {item.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-5">
                {featuredStackGroups.map((group) => (
                  <div
                    key={group.title}
                    className="border-b border-outline-variant/20 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
                      <h4 className="min-w-44 pt-1 text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                        {group.title}
                      </h4>

                      <div className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <div
                          key={item.label}
                          className="group rounded-lg border border-outline-variant/25 bg-surface-container px-3 py-2.5 transition-colors hover:border-primary/45"
                        >
                          <span className="text-sm font-medium text-on-surface/90 group-hover:text-on-surface">
                            {item.label}
                          </span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="stack-panel lg:col-span-6">
            <div className="py-2 md:py-4">
              <SkillsGlobeCanvas sizePx={460} className="mb-7" />
              <div className="mx-auto mt-2 w-fit rounded-full border border-outline-variant/25 bg-surface-container px-5 py-2.5">
                <p className="text-center text-sm text-on-surface-variant">
                  Drag to rotate. Hover or click any node to inspect technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
