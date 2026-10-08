import ContactHero from '@/components/contact/ContactHero';
import ContactConversation from '@/components/contact/ContactConversation';
import ServiceArea from '@/components/contact/ServiceArea';
import ContactMap from '@/components/contact/ContactMap';
import ContactCTA from '@/components/contact/ContactCTA';

export const metadata = {
    title: 'Contact OM EPC Solution | IT Infrastructure & Technical Support',
    description: 'Contact OM EPC Solution for computers, UPS, printers, CCTV, networking, AMC and professional IT technical support.',
    alternates: {
        canonical: 'https://www.omepcsolution.com/contact',
    },
    openGraph: {
        title: 'Contact OM EPC Solution | IT Infrastructure & Technical Support',
        description: 'Contact OM EPC Solution for computers, UPS, printers, CCTV, networking, AMC and professional IT technical support.',
        url: 'https://www.omepcsolution.com/contact',
        siteName: 'OM EPC Solution',
        images: [
            {
                url: '/logo.webp',
                width: 1200,
                height: 630,
                alt: 'Contact OM EPC Solution',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact OM EPC Solution | IT Support',
        description: 'Get in touch with OM EPC Solution for IT infrastructure, networking, and technology support.',
    }
};

export default function ContactPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact OM EPC Solution",
        "description": "Contact OM EPC Solution for computers, UPS, printers, CCTV, networking, AMC and professional IT technical support.",
        "url": "https://www.omepcsolution.com/contact",
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "OM EPC Solution",
            "telephone": "+91-7981413743",
            "email": "omepcsolution@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "West Bengal",
                "addressCountry": "IN"
            }
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.omepcsolution.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Contact",
                    "item": "https://www.omepcsolution.com/contact"
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen">
                <ContactHero />
                <ServiceArea />
                <ContactConversation />
                <ContactMap />
                {/* <ContactCTA /> */}
            </main>
        </>
    );
}