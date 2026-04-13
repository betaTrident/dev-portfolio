"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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

const galleryImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3gNDSLFamoMN5hq9qsr6GzzF5bsfQJcQErJPqbQlxkrDHmFT-dFztVWWosPj3i7ag9Ao0iFdrWRbV8cljd4ldRqp-gpqho-QnmLJ0GmnlFe_lIc5ch-42UCBaracjXvfRMrGFguicqbP29Zf_cQUCo1973N5Lo8TDU0hxgbb60NHvnPJ8LGk88p9mBc6I_lgBljjjGus_Hxew-m847pC-fITwjEJ7we6-iEj24rZyWpSiJZV6O7osRGSEt4TqfGElTCqMbmpZQq4",
    alt: "Code development",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuDj8jcqE1mTbG9iObrg8AKTqzTW_NVBzWnYSTDPiMqerVrFvgogvsAOpHEAtRPpD-CKkSBO0I2xvSlxbt7FI1ovwt9oCDhp5v20Ux7pA4SNBoImoHyIQjxAXE9enFXDPj4azffxTSNmgLRHHuThsAT4OprLg8VtWucp1k_yd1c5kIIl9MvPJcqFGeUS3bRFaOeaFTXm4_6OCW3ruH_PNiAIpWEN_mrB9gPmAfNXKR81L62RRn8PqBv6opWGQVld6aH62hk0Hp2GM",
    alt: "Digital network",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1phgtkPBMWRi3L-wL6iZfRrgrIaVrGBHqxinNsOP9BfrWIr7d06aOTodtjjRi6x_gFCEU0CqmkQT-P0-p38Zft5cCdnFIbTI-UbIxlJ_bi7h06LMr3KjG46UoDTOt4Zw32kGPQPFrEbRjmzCJhmcYYUvdWtgAZ2owvyy_wGK6DP3Ou8y3xpC2Wr3LpKZ_cepEKhkfBiDAn9iMdQ329YXC4RyuGf0JBq_cl8Evw7tEfpqPRVwoaCUu6MP1nh7RaFVgm9U2AtByXJQ",
    alt: "Collaboration",
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

      {/* ── Signature Gallery ─────────── */}
      <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
        {galleryImages.map((img) => (
          <div
            key={img.alt}
            className="aspect-video bg-surface-container-lowest rounded-xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60 z-10" />
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
