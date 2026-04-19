"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    side: "right",
    period: "Present",
    periodColor: "text-primary",
    title: "Software Engineering Intern",
    subtitle: "Current Engagement",
    desc: "Architecting modern web solutions within an agile team. Focusing on the scalability of React components and the efficiency of Node.js microservices. Contributing to CI/CD pipelines and unit testing suites to ensure 99.9% uptime.",
    tags: [
      { label: "React", highlight: true },
      { label: "TypeScript", highlight: true },
      { label: "AWS", highlight: true },
    ],
    dotClass: "bg-primary shadow-[0_0_20px_rgba(173,198,255,0.5)]",
    dotPosition: "left-dot",
  },
  {
    side: "left",
    period: "2019 — 2023",
    periodColor: "text-outline",
    title: "ICT / LIS Coordinator",
    subtitle: "Systems Management & Strategy",
    desc: "Spearheaded digital transformation for educational resources. Managed end-to-end network infrastructure, implemented secure data management protocols, and bridged the gap between technical complexity and user accessibility.",
    tags: [
      { label: "IT Management", highlight: false },
      { label: "Network Arch", highlight: false },
      { label: "Strategy", highlight: false },
    ],
    dotClass: "bg-outline-variant",
    dotPosition: "right-dot",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-8 max-w-7xl mx-auto"
    >
      {/* ── About Bio ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
        <div ref={headingRef} className="lg:col-span-5">
          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-tight">
            Bridging{" "}
            <span className="text-primary">Systems</span> &amp; Code.
          </h2>
        </div>
        <div ref={contentRef} className="lg:col-span-7 pt-4">
          <div className="space-y-6">
            <p className="text-xl text-on-surface-variant leading-relaxed">
              My journey didn&apos;t start in an IDE. It started in the server
              rooms and administrative hubs of complex institutions. As an ICT
              Coordinator, I learned how technology serves humanity at
              scale—managing infrastructures that supported hundreds of users
              daily.
            </p>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              That foundation in systems thinking and problem-solving naturally
              evolved into a passion for building the very software I used to
              manage. Today, as a Full-Stack Developer, I combine the precision
              of an architect with the agility of a creator, building digital
              solutions that are as robust as they are intuitive.
            </p>
            <div className="flex gap-4 pt-4 flex-wrap">
              {["Infrastructure", "Architecture", "Full-Stack"].map((tag) => (
                <div
                  key={tag}
                  className="bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/10"
                >
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Experience Timeline ─────────── */}
      <div className="flex items-center gap-4 mb-16">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary whitespace-nowrap">
          Professional Evolution
        </h3>
        <div className="h-[1px] flex-grow bg-outline-variant/20" />
      </div>

      <div className="relative">
        {/* Vertical timeline line — desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-outline-variant/20 to-transparent" />

        <div className="space-y-16">
          {timelineItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 relative group"
            >
              {/* Left column — date or content depending on side */}
              {item.side === "right" ? (
                <>
                  <div className="lg:text-right flex flex-col justify-center">
                    <div className={`${item.periodColor} font-bold text-lg mb-2`}>{item.period}</div>
                    <h4 className="text-3xl font-bold text-on-surface">{item.title}</h4>
                    <p className="text-on-surface-variant uppercase tracking-widest text-sm mt-2">{item.subtitle}</p>
                  </div>
                  <div className="bg-surface-container-low p-8 rounded-xl relative group-hover:bg-surface-container-high transition-colors duration-500">
                    <div className={`hidden lg:block absolute -left-[70px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${item.dotClass} z-10`} />
                    <p className="text-on-surface-variant leading-relaxed mb-6">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag.label} className={`px-3 py-1 bg-surface-container-lowest text-xs rounded-full border border-outline-variant/10 ${tag.highlight ? "text-primary" : "text-on-surface-variant"}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-2 lg:order-1 bg-surface-container-low p-8 rounded-xl relative group-hover:bg-surface-container-high transition-colors duration-500">
                    <div className={`hidden lg:block absolute -right-[70px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${item.dotClass} z-10`} />
                    <p className="text-on-surface-variant leading-relaxed mb-6">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag.label} className={`px-3 py-1 bg-surface-container-lowest text-xs rounded-full border border-outline-variant/10 ${tag.highlight ? "text-primary" : "text-on-surface-variant"}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 flex flex-col justify-center">
                    <div className={`${item.periodColor} font-bold text-lg mb-2`}>{item.period}</div>
                    <h4 className="text-3xl font-bold text-on-surface">{item.title}</h4>
                    <p className="text-on-surface-variant uppercase tracking-widest text-sm mt-2">{item.subtitle}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
