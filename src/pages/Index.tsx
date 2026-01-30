import { Header } from "@/components/layout/Header";

import { Footer } from "@/components/layout/Footer";



const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <SectorsSection />
        <ClientsSection />
        <TeamSection
        />
        <EventsSection />
        <AcademySection />
        <ProcessSection />
        <FAQSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
