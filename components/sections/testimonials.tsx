"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    span: "md:col-span-8",
    type: "featured",
    quote:
      '"The level of technical rigor brought to our cloud migration was unprecedented. A true architect who understands the intersection of business logic and system performance."',
    name: "Marcus Thorne",
    role: "Senior Engineering Manager, CloudStream",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlSBH5L_eZaptacvLsfKeDaMx-BKY-IzEgBkJlOD-WMgiQO18u0CJBgiZs1SekKz2geNdx-qTC5t54fOIeBwDSesCiuHH8jLZ_oWogJKYq0KGPG7NKc0bf6s30obcNhXSrQd-6cXfqxbhZZap8nBqgmf2Rknu4wSSuJhzG78eks8Q_jki6d9na0S4YH4M6Z9ZMgqpNODIyMjkKsd9EfmvlS37N5C6rRbCVyIXDlFNuHE8nuBg98noxHsdxaMEscX3mA5OCzQNN9u0",
  },
  {
    id: 2,
    span: "md:col-span-4",
    type: "compact-icon",
    icon: "terminal",
    quote:
      '"Clean code, exceptional documentation, and a zero-latency mindset. Every module delivered was a masterclass in full-stack architecture."',
    name: "Elena Rodriguez",
    role: "Project Lead, NexaGen",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIwpKy5OFbZfDgmCYy_ruJ79a-h0Zn1Kr2hZBop5Ev5sCU0Jrxtdv7KB87EBAFrQ-rVIWhKrbKCO6RrmaZcjVOq4rt3XuJZkiwsoCSemRSOexKB6eil6HE0gBzovnRjtc3CMmzHpshwfKLIqjdPMD4NE8Lcgp57xm9JIr3OntEXvP2SL1eWQQwHkoec1mhd6Ox7lSTFnmWksm0LMqEayEZvGuoXk8nOEiB12xmBAHclzw5aCmDyU3KRRO7yJjebl3r0-upBmLmS_s",
  },
  {
    id: 3,
    span: "md:col-span-4",
    type: "compact-initials",
    quote:
      '"Rarely do you find a developer who balances deep technical expertise with such high-level communication skills. A vital asset to any agile squad."',
    name: "Jameson Duke",
    role: "CTO, Veridical Systems",
    initials: "JD",
  },
  {
    id: 4,
    span: "md:col-span-8",
    type: "long-form",
    quote:
      '"When we started the redesign of our core banking API, the complexity was overwhelming. Architect.io didn\'t just write code; they restructured our entire development lifecycle. The result was a 40% increase in deployment velocity."',
    name: "Arthur Chen",
    role: "VP of Engineering, FinFlow",
    tags: ["System Design", "API Orchestration", "Performance Tuning"],
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFu01npMrwpXGi0q8zoqSTl6WjIoDKPdm9rn6rYMufKZmCWEBtHMpMALYzp6S2UGVRspkODellIT--9Dvw5DE7LJ7b770rsnVSSzord5CCSzZyRfrd_VdEyDic9SJnDEGQtdZzxHxJdOkNAFz5VcgjrvdKMjR0sAJYOZoPBYyKJjF7OOjDRr74fYElDToyksc6C2DRguN-5TZqdTpStHudqm8Y4spOGHk75ou-5ib6h9lRYv8pV7rDcSZPmr5IrYpPtchjMW9br40",
  },
];

const partnerLogos = [
  { icon: "rocket_launch", name: "TECHION" },
  { icon: "layers", name: "STACKFLOW" },
  { icon: "hub", name: "CORE.OS" },
  { icon: "shield", name: "SECURELY" },
];

export function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slide in header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      }
    );

    // Stagger cards
    const cards = gridRef.current?.querySelectorAll(".testimonial-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        {/* Asymmetric header — matches Stitch layout */}
        <header ref={headerRef} className="flex flex-col md:flex-row items-end gap-8 mb-24">
          <div className="w-full md:w-2/3">
            <span className="uppercase tracking-widest text-on-surface-variant text-xs font-bold mb-4 block">
              Validation
            </span>
            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
              Trusted by <br />
              <span className="text-gradient">Industry Pioneers.</span>
            </h2>
          </div>
          <div className="w-full md:w-1/3 pb-4">
            <p className="text-lg text-on-surface-variant leading-relaxed font-light">
              Engineering excellence isn&apos;t just about code—it&apos;s about
              building lasting relationships and delivering architectural
              precision that scales with vision.
            </p>
          </div>
        </header>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {testimonials.map((t) => (
            <div key={t.id} className={`testimonial-card ${t.span}`}>
              {t.type === "featured" && (
                <div className="bg-surface-container-low rounded-xl p-10 relative overflow-hidden group h-full">
                  {/* Decorative quote icon */}
                  <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <span
                      className="material-symbols-outlined text-[160px]"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                        background: "linear-gradient(135deg,#adc6ff,#4d8eff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      format_quote
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-1 mb-8 rounded-full gradient-primary" />
                    <blockquote className="text-3xl md:text-4xl font-medium tracking-tight text-on-surface mb-12 leading-tight">
                      {t.quote}
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden">
                        <Image src={t.avatar!} alt={t.name} fill className="object-cover" unoptimized />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{t.name}</p>
                        <p className="text-sm text-on-surface-variant tracking-wider uppercase">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {t.type === "compact-icon" && (
                <div className="bg-surface-container-highest rounded-xl p-8 flex flex-col justify-between h-full">
                  <div>
                    <span className="material-symbols-outlined text-primary mb-6 text-4xl block">{t.icon}</span>
                    <p className="text-xl text-on-surface-variant leading-relaxed mb-8 italic">{t.quote}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={t.avatar!} alt={t.name} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{t.name}</p>
                      <p className="text-xs text-on-surface-variant tracking-widest uppercase">{t.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {t.type === "compact-initials" && (
                <div className="bg-surface-container-highest rounded-xl p-8 h-full">
                  <p className="text-xl text-on-surface leading-relaxed mb-8">{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xl">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{t.name}</p>
                      <p className="text-xs text-on-surface-variant tracking-widest uppercase">{t.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {t.type === "long-form" && (
                <div className="bg-surface-container-low rounded-xl p-10 border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                      <blockquote className="text-2xl text-on-surface leading-relaxed mb-8">{t.quote}</blockquote>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {t.tags?.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] text-on-surface-variant tracking-widest uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:w-48 flex flex-col items-start md:items-center shrink-0">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden mb-4">
                        <Image src={t.avatar!} alt={t.name} fill className="object-cover" unoptimized />
                      </div>
                      <p className="font-bold text-on-surface">{t.name}</p>
                      <p className="text-[10px] text-on-surface-variant tracking-widest uppercase text-center">{t.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <div className="mt-32 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <span className="text-on-surface-variant uppercase tracking-[0.3em] text-xs">
            Partnering with teams at
          </span>
          <div className="flex flex-wrap justify-center gap-12 text-on-surface-variant">
            {partnerLogos.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="material-symbols-outlined">{p.icon}</span>
                <span className="font-bold tracking-tighter">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
