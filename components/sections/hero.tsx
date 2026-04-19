"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

// Load Three.js canvas only on client to avoid SSR errors
const CanvasScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.CanvasScene),
  { ssr: false }
);

export function HeroSection() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 40, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        "-=0.8"
      );
  }, []);

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Three.js Particle Canvas — absolute background */}
      <CanvasScene />

      {/* Atmospheric background glows matching Stitch design */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left — Text Content */}
        <div className="lg:col-span-7">
          {/* Label */}
          <div className="mb-6">
            <span
              ref={labelRef}
              className="uppercase tracking-[0.2em] text-primary font-bold text-sm"
            >
              Full-Stack Engineering
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headingRef}
            className="text-5xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-on-surface mb-8"
          >
            I build <span className="text-primary">scalable</span> <br />
            <span className="text-primary">solutions</span> that drive <br />
            real <span className="text-primary italic">business impact.</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed mb-12"
          >
            Transforming ideas into production-ready applications with modern
            technologies and best practices.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={handleScrollToProjects}
              className="bg-linear-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,122,64,0.45)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              View Projects
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-highest text-on-surface px-10 py-4 rounded-lg font-bold text-lg hover:bg-surface-variant transition-colors duration-300 flex items-center gap-2 group"
            >
              Download Resume
              {/* Material icon via CSS class — matches Stitch */}
              <span className="material-symbols-outlined text-xl group-hover:translate-y-1 transition-transform duration-300">
                download
              </span>
            </a>
          </div>
        </div>

        {/* Right — Code Profile Card */}
        <div ref={imageRef} className="lg:col-span-5 relative hidden lg:block">
          <div className="rounded-2xl overflow-hidden border border-primary/20 bg-[#0b0f14] shadow-[0_28px_80px_-40px_rgba(0,0,0,0.9)] max-w-130 ml-auto">
            <div className="h-11 px-5 border-b border-white/10 bg-[#121922] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs tracking-wide text-on-surface-variant/80 font-mono">portfolio.tsx</span>
              <span className="w-14" />
            </div>

            <div className="p-6 bg-[radial-gradient(circle_at_15%_0%,rgba(255,128,0,0.08),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(0,170,255,0.1),transparent_35%)]">
              <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 font-mono text-[14px] leading-8 pr-2">
                <div className="text-on-surface-variant/35 text-right select-none">1</div>
                <div className="text-on-surface-variant/65">// Welcome to my workspace</div>

                <div className="text-on-surface-variant/35 text-right select-none">2</div>
                <div className="whitespace-nowrap">
                  <span className="text-[#c586ff]">import</span>{" "}
                  <span className="text-[#f0f4f8]">{"{"}</span>{" "}
                  <span className="text-[#ff8f5a]">Developer</span>{" "}
                  <span className="text-[#f0f4f8]">{"}"}</span>{" "}
                  <span className="text-[#c586ff]">from</span>{" "}
                  <span className="text-[#22d3a6]">&apos;./universe&apos;</span>;
                </div>

                <div className="text-on-surface-variant/35 text-right select-none">3</div>
                <div />

                <div className="text-on-surface-variant/35 text-right select-none">4</div>
                <div className="whitespace-nowrap">
                  <span className="text-[#c586ff]">const</span>{" "}
                  <span className="text-[#f8cc4f]">Portfolio</span>{" "}
                  <span className="text-[#79b8ff]">=</span>{" "}
                  <span className="text-[#f0f4f8]">()</span>{" "}
                  <span className="text-[#79b8ff]">=&gt;</span>{" "}
                  <span className="text-[#f0f4f8]">{"{"}</span>
                </div>

                <div className="text-on-surface-variant/35 text-right select-none">5</div>
                <div className="whitespace-nowrap">
                  <span className="text-[#c586ff]">return</span> <span className="text-[#f0f4f8]">(</span>
                </div>

                <div className="text-on-surface-variant/35 text-right select-none">6</div>
                <div className="text-[#f0f4f8]">{"<Developer"}</div>

                <div className="text-on-surface-variant/35 text-right select-none">7</div>
                <div className="whitespace-nowrap pl-4">
                  <span className="text-[#ff8f5a]">name</span> = <span className="text-[#22d3a6]">&quot;Kent Bryan A. Colina&quot;</span>
                </div>

                <div className="text-on-surface-variant/35 text-right select-none">8</div>
                <div className="whitespace-nowrap pl-4">
                  <span className="text-[#ff8f5a]">role</span> = <span className="text-[#22d3a6]">&quot;Full Stack Engineer&quot;</span>
                </div>

                <div className="text-on-surface-variant/35 text-right select-none">9</div>
                <div className="whitespace-nowrap pl-4">
                  <span className="text-[#ff8f5a]">passion</span> = <span className="text-[#22d3a6]">&quot;Engineering Beyond Boundaries&quot;</span>
                </div>

                <div className="text-on-surface-variant/35 text-right select-none">10</div>
                <div className="text-[#f0f4f8]">{"/>"}</div>

                <div className="text-on-surface-variant/35 text-right select-none">11</div>
                <div className="text-[#f0f4f8]">);</div>

                <div className="text-on-surface-variant/35 text-right select-none">12</div>
                <div className="text-[#f0f4f8]">{"};"}</div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleScrollToAbout}
                  className="px-4 py-2.5 rounded-lg border border-orange-400/40 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">play_arrow</span>
                  Run Profile
                </button>
                <button
                  onClick={handleScrollToProjects}
                  className="px-4 py-2.5 rounded-lg border border-white/15 bg-transparent text-on-surface hover:bg-white/5 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">folder_open</span>
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
