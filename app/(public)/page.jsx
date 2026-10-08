// page_10.jsx (Home Page)
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import InteractiveDark from '@/components/home/InteractiveDark';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Products from '@/components/home/Products';
import Industries from '@/components/home/Industries';
import Projects from '@/components/home/Projects';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Contact from '@/components/home/Contact';
import OurClients from '@/components/ui/OurClients';

export const metadata = {
  title: "OM EPC Solution | Premium IT Infrastructure & Tech Support",
  description: "Your trusted partner for enterprise IT infrastructure, computers, UPS, CCTV, networking solutions, and expert technical support.",
  alternates: {
    canonical: 'https://www.omepcsolution.com',
  },
  openGraph: {
    title: 'OM EPC Solution | Premium IT Infrastructure',
    description: 'Empower your business with top-tier technology products and professional IT services from OM EPC Solution.',
    url: 'https://www.omepcsolution.com',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'OM EPC Solution',
      }
    ],
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.omepcsolution.com/#organization",
        "name": "OM EPC Solution",
        "url": "https://www.omepcsolution.com",
        "logo": "https://www.omepcsolution.com/logo.webp",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-7981413743",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "bn", "hi"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.omepcsolution.com/#website",
        "url": "https://www.omepcsolution.com",
        "name": "OM EPC Solution",
        "publisher": { "@id": "https://www.omepcsolution.com/#organization" }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col w-full">
        <Hero />
        <Stats />
        <About />
        
        <Services />
        
        <InteractiveDark />
        <WhyChooseUs />
        <Products />
        
        <Industries />
        <Projects />
        <OurClients />
        
        <Testimonials />
        <Contact />
        <FAQ />
      </div>
    </>
  );
}