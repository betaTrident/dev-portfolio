import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ProjectsSection } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CertificatesSection } from "@/components/sections/certificates";
import { ContactSection } from "@/components/sections/contact";

export default function Page() {
  return (
    <>
      <Navbar />

      <main>
        {/* Phase 3: Hero ✅ */}
        <HeroSection />

        {/* Phase 6: About ✅ — moved directly after Hero per user request */}
        <AboutSection />

        {/* Phase 4: Tech Stack ✅ */}
        <TechStackSection />

        {/* Phase 5: Projects ✅ */}
        <ProjectsSection />

        {/* Phase 5: Testimonials ✅ */}
        <TestimonialsSection />

        {/* Phase 6: Certificates ✅ */}
        <CertificatesSection />

        {/* Phase 6: Contact ✅ */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
