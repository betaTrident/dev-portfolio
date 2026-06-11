"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePhoto from "../assets/colinaPortrait.jpg";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant fade-in animations for the columns on scroll trigger
    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-28 py-20 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* ── Left Column: Profile Card & Identity (Col Span 5) ── */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-start">
          
          {/* Portrait with custom Tangerine-to-Orange glowing ring border */}
          <div className="relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-br from-primary via-primary/80 to-primary-container shadow-[0_0_36px_rgba(255,138,71,0.35)] mb-8 flex items-center justify-center group hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(255,138,71,0.5)] transition-all duration-500">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0c0d10]">
              <Image
                src={profilePhoto}
                alt="Kent Bryan A. Colina"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Subcategory bullet and label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
              <span className="text-[8px] animate-pulse">●</span> ABOUT ME
            </span>
          </div>

          {/* Editorial Headline */}
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface leading-[1.05] mb-6">
            Bridging <span className="text-primary">Systems</span> &amp; Code.
          </h2>

          {/* High-impact value subtitle */}
          <p className="text-lg text-on-surface-variant font-light leading-relaxed mb-8 max-w-sm">
            Full-Stack Software Engineer | AI Engineer
          </p>

          {/* Minimal dividing line */}
          <div className="h-px bg-outline-variant/10 w-full mb-8" />

          {/* Recruiter-friendly Social Meta Row */}
          <div className="flex flex-col gap-4 text-sm text-on-surface-variant/90 w-full">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-lg select-none">location_on</span>
              <span className="font-light">Philippines</span>
            </div>
            <a 
              href="mailto:colinakb24@gmail.com" 
              className="flex items-center gap-3 hover:text-primary transition-colors group w-fit"
            >
              <span className="material-symbols-outlined text-primary text-lg select-none group-hover:scale-110 transition-transform">mail</span>
              <span className="font-light">colinakb24@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/kent-colina/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 hover:text-primary transition-colors group w-fit"
            >
              <svg className="w-[18px] h-[18px] fill-primary group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span className="font-semibold underline decoration-primary/30 group-hover:decoration-primary/80 transition-colors">LinkedIn</span>
            </a>
          </div>

        </div>

        {/* ── Right Column: Story & Detailed Expertise (Col Span 7) ── */}
        <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-start">
          
          {/* WHO I AM SECTION */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl select-none">person</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface">WHO I AM</h3>
            </div>
            <p className="text-[15px] md:text-base text-on-surface-variant leading-relaxed font-light mb-4">
              I&rsquo;m a full-stack developer with a growing focus on backend AI engineering. I build web applications, APIs, and database-driven systems, while exploring how AI, LLMs, and agentic workflows can improve real software experiences.
            </p>
            <p className="text-[15px] md:text-base text-on-surface-variant leading-relaxed font-light">
              My work focuses on turning complex ideas into practical systems, from planning and architecture to implementation. I enjoy building solutions that improve workflows, support real users, and create practical value for businesses.
            </p>
          </div>

          <div className="h-px bg-outline-variant/10 w-full my-8" />

          {/* WHAT I DO SECTION */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-xl select-none">rocket_launch</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface">WHAT I DO</h3>
            </div>
            
            {/* 3-card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1 */}
              <div className="bg-[#121316]/40 border border-outline-variant/10 rounded-xl p-5 hover:bg-[#121316]/90 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-350">
                  <span className="material-symbols-outlined text-lg select-none">terminal</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Full-Stack Development</h4>
                <p className="text-xs text-on-surface-variant/80 leading-relaxed font-light">
                  Building scalable web applications end-to-end using modern technologies.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#121316]/40 border border-outline-variant/10 rounded-xl p-5 hover:bg-[#121316]/90 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-350">
                  <span className="material-symbols-outlined text-lg select-none">dns</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">System Optimization</h4>
                <p className="text-xs text-on-surface-variant/80 leading-relaxed font-light">
                  Improving performance, reliability, and developer productivity.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#121316]/40 border border-outline-variant/10 rounded-xl p-5 hover:bg-[#121316]/90 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-350">
                  <span className="material-symbols-outlined text-lg select-none">psychology</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">AI Integration</h4>
                <p className="text-xs text-on-surface-variant/80 leading-relaxed font-light">
                  Integrating AI capabilities and exploring data-driven features that create real value.
                </p>
              </div>

            </div>
          </div>

          <div className="h-px bg-outline-variant/10 w-full my-8" />

          {/* WHAT DRIVES ME SECTION */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl select-none">star</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface">WHAT DRIVES ME</h3>
            </div>
            <p className="text-[15px] md:text-base text-on-surface-variant leading-relaxed font-light">
              I&rsquo;m driven by the challenge of building systems that connect logic, usability, and real-world impact. I enjoy learning deeply, solving technical problems, and exploring how AI can help developers and teams work smarter.
            </p>
          </div>

          <div className="h-px bg-outline-variant/10 w-full my-8" />

          {/* TECHNOLOGIES ROW SECTION */}
          {/* <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">TECHNOLOGIES I WORK WITH</h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "PostgreSQL",
                "MongoDB",
                "AWS",
                "Docker"
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-[#121316]/50 hover:bg-[#191b1f] hover:border-primary/30 hover:text-primary transition-all border border-outline-variant/10 text-xs text-on-surface-variant px-3.5 py-1.5 rounded-lg select-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div> */}

        </div>

      </div>
    </section>
  );
}
