import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import HeroPage from "@/pages/Hero/page";
import AboutPage from "@/pages/About/page";
import TechStackPage from "@/pages/TechStack/page";
import ProjectsPage from "@/pages/Projects/page";
import TestimonialsPage from "@/pages/Testimonials/page";
import ExperiencePage from "@/pages/Experience/page";
import CertificatesPage from "@/pages/Certificates/page";
import ContactPage from "@/pages/Contact/page";

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="relative bg-surface text-on-surface overflow-hidden min-h-screen">
        {/* Static blueprint/architect dot-grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1.5px,transparent_1.5px)] [background-size:36px_36px] pointer-events-none z-0" />

        {/* Ambient static radial glows */}
        {/* Top Right Orange Glow */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary/4 blur-[130px] rounded-full pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        {/* Mid Left Indigo Glow */}
        <div className="absolute top-[25%] left-0 w-[600px] h-[600px] bg-secondary/3 blur-[160px] rounded-full pointer-events-none z-0 -translate-x-1/3" />
        {/* Bottom Right Warm Orange Glow */}
        <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-primary/3 blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10">
          {/* Phase 3: Hero ✅ */}
          <HeroPage />

          {/* Phase 6: About ✅ — moved directly after Hero per user request */}
          <AboutPage />

          {/* Phase 4: Tech Stack ✅ */}
          <TechStackPage />

          {/* Phase 5: Projects ✅ */}
          <ProjectsPage />

          {/* Phase 5: Testimonials ✅ */}
          <TestimonialsPage />

          {/* Phase 6: Experience ✅ */}
          <ExperiencePage />

          {/* Phase 6: Certificates ✅ */}
          <CertificatesPage />

          {/* Phase 6: Contact ✅ */}
          <ContactPage />
        </div>
      </main>

      <Footer />
    </>
  );
}
