import Header from '@/components/about/Header';
import HeroSection from '@/components/about/HeroSection';
import ServicesSection from '@/components/about/ServicesSection';
import AboutSection from '@/components/about/AboutSection';
import ContactSection from '@/components/about/ContactSection';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default About;
