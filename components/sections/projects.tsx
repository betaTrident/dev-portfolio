"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    tags: [
      { label: "Web App", highlight: false },
      { label: "AI & Gemini API", highlight: true },
    ],
    title: "MockAI",
    desc: "Next-generation mock interview platform utilizing Gemini API to simulate technical recruiter behavior and provide real-time behavioral analysis.",
    stack: ["Next.js", "Tailwind", "PostgreSQL"],
    links: [
      { label: "Live Demo", icon: "north_east", href: "#" },
      { label: "GitHub Repo", icon: "code", href: "#" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBd-r25oYMP7BKcaKW2geObWQdJuuFY0zGSv_LklDiWb6OGOkV3ItXc84_KZlMIF3C_f2rd54KEYS1AxUcBTwQt9zVRmqd1OSVakciUhh-9naL0KSQvZfClXYCl9cbLz1uC7x4yHRfF0yv8gq9ovU6BmfsZHk9-exGnvJpDwa2XDkw7venxX00nO3rtociMO0G7NEb86DRfbNbo-0J7NGo4dQHUBUR9mys2H4f3nROTQtHQLzUfXlPtu5gUbTgKRLQqN69N28A-ylU",
    offset: false,
  },
  {
    id: 2,
    tags: [{ label: "Management System", highlight: false }],
    title: "Barangay Health Center MS",
    desc: "Centralized healthcare management system designed for local government units, focusing on patient records, medicine inventory, and automated scheduling.",
    stack: ["Laravel", "MySQL", "Alpine.js"],
    links: [
      { label: "Live Demo", icon: "north_east", href: "#" },
      { label: "GitHub Repo", icon: "code", href: "#" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ9y-beHxxjbyopTW3YXMYFgKzzqgBwHlQ18UtGYzcSBG4l0BpTa4tPEvL2AwP945Bftvo1fcH2ImSFdGGl-i2b8d4yhtLsvJz0q5fzozUOsa2zr_6nAH8xSC4ggTL_OY2QT8QrV7qUxDjz40ZaV1tCU_sy3RiK5NzrGaZuB-y-MA-w1QlTqoUKtmVnoVPbYRa8OpESxw8aLAqemFMycWkoXTvWjqJiQGf014EOM-puGy1J0ggVQ2quwjENOxNRQ9vaEMrIyG_9Sw",
    offset: true,
  },
  {
    id: 3,
    tags: [{ label: "E-Commerce", highlight: false }],
    title: "Coffee Shop POS",
    desc: "A high-performance Point of Sale system featuring real-time inventory tracking, staff management, and dynamic receipt generation.",
    stack: ["React", "Node.js", "MongoDB"],
    links: [
      { label: "Live Demo", icon: "north_east", href: "#" },
      { label: "GitHub Repo", icon: "code", href: "#" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzvUcfLMuPEWX8dQrT06J0dgrKlmC9Ld1i48sFcBhZbbXdjGAINf5pGKdnHvZ6tc7sJvLg9BpYHg8FQ__Tuv46Ks11N651lrbyrtrLxTA-ZNQk5rQV870r9IJeSTL3_3USGq9pccDAnGtE0d4p9O3IbWhEt3VioNL-Sm9MAL5FqsMTZ-2LZMVPQHw2hPRmTuWThpslAM-ouKQwtzRWFoR6yh-UKIrJTGtbul0wZmCtN1taZNYtRt5c0sfqB47_gwHSE6O-IQdZ0sA",
    offset: false,
  },
  {
    id: 4,
    tags: [{ label: "IoT Hardware", highlight: false }],
    title: "Dual-Axis Solar Tracking",
    desc: "Automated solar panel positioning system that tracks the sun's trajectory on two axes, increasing energy collection efficiency by 35%.",
    stack: ["Arduino", "C++", "MQTT"],
    links: [
      { label: "View Docs", icon: "description", href: "#" },
      { label: "Circuit Design", icon: "settings_input_component", href: "#" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0oIvoei9ch0tP96H3VjxupI8s8DmXanTQo6xNOwPYT9y-a4J6lTQ8n1YvhBaJx9H0XrBILeDBpnKpGByxxjrY1tVz1VAwnb42W1LKMxNa1_tuLsSbhKXVQOXfkPhu2ReXoBjy7WiVlMXA78MNAAu6pnC7YioVmIW2dKEb25JMJn0JqOwskSTKnVPJJiuIw2615x0XeW8ZAOXFG3Ot-KUa0eqaTRgP2jLOKIT3Q6PdCoVnLaIZu2D9H7-Ct68aVmUkB904J7V-L7w",
    offset: true,
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-primary tracking-[0.2em] text-xs uppercase mb-4 block font-bold">
              Portfolio Gallery
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-on-surface">
              Engineered <br /> Solutions.
            </h2>
          </div>
          <div className="max-w-sm text-on-surface-variant leading-relaxed">
            A curated selection of full-stack engineering projects, ranging from
            AI integration to IoT hardware design.
          </div>
        </div>
      </header>

      {/* Project Grid — staggered masonry layout matching Stitch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, i) => (
          <article
            key={project.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-500 ${
              project.offset ? "md:mt-24" : ""
            }`}
          >
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-surface-container-highest relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              {/* Tags */}
              <div className="flex items-center gap-3 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                      tag.highlight
                        ? "bg-primary/10 text-primary"
                        : "bg-surface-container-highest text-on-surface-variant"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-on-surface-variant leading-relaxed mb-8">
                {project.desc}
              </p>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex gap-6">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-2 font-bold text-sm transition-all ${
                      link.icon === "north_east"
                        ? "text-primary hover:gap-3"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {link.label}
                    <span className="material-symbols-outlined text-sm">
                      {link.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
