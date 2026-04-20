"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePhoto from "../assets/colinaPortrait.jpg";

gsap.registerPlugin(ScrollTrigger);

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
      className="scroll-mt-28 pt-16 pb-20 px-8 max-w-7xl mx-auto"
    >
      {/* ── About Bio ─────────────────── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div ref={headingRef} className="lg:col-span-5">
          <div className="mb-8">
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-[3px] ring-[#3b82f6] p-1 bg-surface-container-highest">
              <Image
                src={profilePhoto}
                alt="Profile photo"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-tight">
            Bridging{" "}
            <span className="text-primary">Systems</span> &amp; Code.
          </h2>
        </div>
        <div ref={contentRef} className="lg:col-span-7 pt-4">
          <div className="space-y-6">
            <p className="text-xl text-on-surface-variant leading-relaxed">
              I&apos;m a Full-Stack Software Engineer focused on building production-ready digital products that solve real business problems. I design and develop scalable web applications end-to-end, with strong attention to clean architecture, maintainable code, and user-centered experiences.
            </p>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              My work covers modern application development and system optimization, helping teams ship faster and operate more efficiently. I enjoy turning complex ideas into practical software that delivers measurable impact.
            </p>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              I&apos;m also actively diving deeper into AI Engineering, integrating AI capabilities into modern applications and exploring data-driven features that elevate product value. My current focus includes building AI-powered solutions and applying generative AI to improve workflows and accelerate development.
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
    </section>
  );
}
