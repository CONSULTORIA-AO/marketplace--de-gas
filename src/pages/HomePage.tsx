import { useState } from 'react';

import { HeaderHome } from '@/components/homeLayout/Header';
import { Footer } from '@/components/layout/Footer';
import { OffersSection } from '@/components/homeLayout/Offers';
import { HeroSection } from '@/components/homeLayout/HeroSection';
import { CategorySection } from '@/components/homeLayout/Category';
import { HowWorkSection } from '@/components/homeLayout/HowWork';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <HeaderHome />
          <main className="flex-1">
            <HeroSection
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <div className="container mx-auto px-4 py-16">
              <OffersSection searchTerm={searchTerm} />
              <CategorySection />
              <HowWorkSection />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
