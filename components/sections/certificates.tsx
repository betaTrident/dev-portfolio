"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  { icon: "cloud", title: "Google Cloud Professional Cloud Architect", issuer: "Google Cloud", date: "Oct 2023" },
  { icon: "terminal", title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "Jan 2024" },
  { icon: "code", title: "Meta Front-End Developer Professional", issuer: "Meta", date: "Aug 2023" },
  { icon: "memory", title: "Microsoft Certified: Azure Solutions Architect", issuer: "Microsoft", date: "Mar 2023" },
  { icon: "layers", title: "Certified Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation", date: "Dec 2023" },
  { icon: "verified_user", title: "CompTIA Security+ Certification", issuer: "CompTIA", date: "May 2023" },
];

export function CertificatesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".cert-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  return (
    <section id="certificates" className="py-32 bg-surface-container-lowest">

      {/* ── Header ─────────────────── */}
      <div className="max-w-7xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="max-w-2xl">
            <span className="text-on-surface-variant uppercase tracking-[0.2em] font-medium block mb-4 text-sm">
              Credentials &amp; Excellence
            </span>
            <h2 className="text-6xl md:text-7xl font-bold text-on-surface tracking-tighter leading-none">
              Certified <br />
              <span className="text-gradient">Engineering</span>
            </h2>
          </div>
          <div className="max-w-sm pb-2">
            <p className="text-on-surface-variant leading-relaxed">
              A collection of industry-leading certifications validating technical proficiency in cloud architecture, front-end ecosystems, and distributed systems.
            </p>
          </div>
        </div>
      </div>

      {/* ── Certificates Grid ─────────────────── */}
      <div className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert) => (
              <div
                key={cert.title}
                className="cert-card group bg-surface-container-highest p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-80"
              >
                <div>
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-8">
                    <span className="material-symbols-outlined text-primary text-3xl">{cert.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface tracking-tight mb-2">{cert.title}</h3>
                  <p className="text-on-surface-variant font-medium tracking-wide">{cert.issuer}</p>
                </div>
                <div className="mt-auto flex justify-between items-end border-t border-outline-variant/10 pt-6">
                  <span className="text-sm tracking-widest text-on-surface-variant uppercase">Issued {cert.date}</span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
