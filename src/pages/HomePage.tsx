import { PageContainer } from '@/components/layout/PageContainer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { AboutSection } from '@/components/home/AboutSection'
import { TrustBadges } from '@/components/home/TrustBadges'
import { InstagramGallery } from '@/components/home/InstagramGallery'

export function HomePage() {
  return (
    <PageContainer withPadding={false}>
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <InstagramGallery />
      <AboutSection />
    </PageContainer>
  )
}
