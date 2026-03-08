import { Header } from '@/components/layout/header';
import HeroSection from '@/app/(public)/about/hero';
import ServicesSection from '@/app/(public)/services/service';
import AboutSection from '@/app/(public)/about/about';
import ContactSection from '@/app/(public)/contact/contact';

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
