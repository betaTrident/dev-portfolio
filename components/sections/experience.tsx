"use client";

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
  },
] as const;

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary whitespace-nowrap">
          Professional Evolution
        </h3>
        <div className="h-[1px] flex-grow bg-outline-variant/20" />
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-outline-variant/20 to-transparent" />

        <div className="space-y-16">
          {timelineItems.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 relative group"
            >
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
                        <span
                          key={tag.label}
                          className={`px-3 py-1 bg-surface-container-lowest text-xs rounded-full border border-outline-variant/10 ${
                            tag.highlight ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
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
                        <span
                          key={tag.label}
                          className={`px-3 py-1 bg-surface-container-lowest text-xs rounded-full border border-outline-variant/10 ${
                            tag.highlight ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
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
