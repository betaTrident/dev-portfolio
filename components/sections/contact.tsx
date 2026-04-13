"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: "terminal", label: "GitHub", href: "https://github.com" },
  { icon: "link", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "alternate_email", label: "Email", href: "mailto:hello@example.com" },
];

const metaInfo = [
  { icon: "schedule", label: "Response Time", value: "Under 24 hours" },
  { icon: "location_on", label: "Based in", value: "Philippines" },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with real API call
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        {/* ── Left: Intent ─────────────────── */}
        <section ref={headingRef} className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-8 leading-none">
            Let&apos;s build the{" "}
            <span className="text-primary italic">next</span> iteration.
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-12 max-w-md">
            Whether you&apos;re looking for a lead developer, a technical architect, or a full-stack partner, I&apos;m ready to translate your vision into clean, scalable code.
          </p>

          {/* Social links */}
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.05em] text-primary font-bold">
              Connect via
            </span>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Right: Form ─────────────────── */}
        <section ref={formRef} className="lg:col-span-7">
          <div className="bg-surface-container-low rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Architectural accent glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

            {status === "sent" ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center gap-6">
                <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
                <h3 className="text-2xl font-bold text-on-surface">Message Deployed!</h3>
                <p className="text-on-surface-variant">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                className="space-y-8 relative z-10"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      className="bg-surface-container-lowest text-on-surface focus:ring-1 focus:ring-primary rounded-lg py-4 px-5 transition-all duration-300 placeholder:text-outline-variant/50 outline-none border border-outline-variant/15 focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-surface-container-lowest text-on-surface focus:ring-1 focus:ring-primary rounded-lg py-4 px-5 transition-all duration-300 placeholder:text-outline-variant/50 outline-none border border-outline-variant/15 focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your project or just say hello..."
                    required
                    className="bg-surface-container-lowest text-on-surface focus:ring-1 focus:ring-primary rounded-lg py-4 px-5 transition-all duration-300 placeholder:text-outline-variant/50 outline-none border border-outline-variant/15 focus:border-primary/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container text-on-primary px-12 py-5 rounded-lg font-bold text-base tracking-tight hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {status === "sending" ? "Deploying..." : "Deploy Message"}
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            )}
          </div>

          {/* Bento meta info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {metaInfo.map((info) => (
              <div
                key={info.label}
                className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">{info.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">{info.label}</p>
                  <p className="text-sm font-semibold">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
