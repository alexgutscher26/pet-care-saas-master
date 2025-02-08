import { type Metadata } from 'next'
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AiPersonalization } from "@/components/ai-personalization"
import { AiFeatures } from "@/components/ai-features"
import { HowItWorksDetailed } from "@/components/how-it-works-detailed"
import { LongTermSuccess } from "@/components/long-term-success"
import { SimplePricing } from "@/components/simple-pricing"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { AnimatedBeamMultipleOutputDemo } from "@/components/process-diagram"


// TODO: cHANGE THE METADATA
export const metadata: Metadata = {
  title: 'Inventory Management System - Cross-Platform Selling Made Easy',
  description: 'Streamline your online selling with our multi-platform inventory management system. List, track, and manage your items across eBay, Mercari, Poshmark, and more.',
  openGraph: {
    title: 'Inventory Management System - Cross-Platform Selling Made Easy',
    description: 'Streamline your online selling with our multi-platform inventory management system. List, track, and manage your items across eBay, Mercari, Poshmark, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://inventory.example.com',
    siteName: 'Inventory Management System',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inventory Management System Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inventory Management System - Cross-Platform Selling Made Easy',
    description: 'Streamline your online selling with our multi-platform inventory management system. List, track, and manage your items across eBay, Mercari, Poshmark, and more.',
    images: ['/og-image.png'],
    creator: '@inventorysystem'
  },
  keywords: [
    'inventory management',
    'online selling',
    'ebay',
    'mercari',
    'poshmark',
    'cross-platform selling',
    'ecommerce',
    'multi-channel selling'
  ],
  authors: [{ name: 'Inventory System Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  themeColor: '#1E293B'
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <AiPersonalization />
        <AiFeatures />
        <AnimatedBeamMultipleOutputDemo />
        <HowItWorksDetailed />
        <LongTermSuccess />
        <SimplePricing />
      </main>
      <EnhancedFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Pet Care',
            description: 'A comprehensive pet management platform for tracking pet health, schedules, and care.',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1250'
            }
          })
        }}
      />
    </div>
  )
}
