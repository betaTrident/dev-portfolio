"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import Image from "next/image";

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
        <div className="lg:col-span-8">
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
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-on-surface mb-8"
          >
            Building Scalable <br />
            <span className="text-gradient">Web Applications</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed mb-12"
          >
            I&apos;m a Full-Stack Developer specialized in architecting
            high-performance digital ecosystems with modern frameworks and
            cloud-native patterns.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={handleScrollToProjects}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(173,198,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
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

        {/* Right — Profile Image */}
        <div ref={imageRef} className="lg:col-span-4 relative hidden lg:block">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low relative group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzSs84iAeUbjAOhZdWwoDcTt6ZYvmd-cwnBmucvIC1A8HpWt5QhJ2tq49n6AMT9Fp2nP10w5ROnwV1NZx4y2HuiMhs268A6Lusw6AtP5S0rZguz94ciTVSO7a_AxEyzR5NggG0DcrCUKo06RIBTfjS5jESsklXwcwQ-aEGymCe_lsclGiVh51Igoebx47tK0sYIM36KR5dd2HO1BSj4yV-F5VvbSrIiOcnmzOpPN3talaUUjRKPFG6ppz1pxdKuwDFRfCt4VXVAis"
              alt="Modern dark workspace with code on monitor and subtle blue ambient lighting"
              fill
              className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              unoptimized
            />
            {/* Bottom fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
