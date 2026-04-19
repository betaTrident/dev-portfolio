import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import HeroPage from "@/pages/Hero/page";
import AboutPage from "@/pages/About/page";
import TechStackPage from "@/pages/TechStack/page";
import ProjectsPage from "@/pages/Projects/page";
import TestimonialsPage from "@/pages/Testimonials/page";
import CertificatesPage from "@/pages/Certificates/page";
import ContactPage from "@/pages/Contact/page";

export default function Page() {
  return (
    <>
      <Navbar />

      <main>
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

        {/* Phase 6: Certificates ✅ */}
        <CertificatesPage />

        {/* Phase 6: Contact ✅ */}
        <ContactPage />
      </main>

      <Footer />
    </>
  );
}
