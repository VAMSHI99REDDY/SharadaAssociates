import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sharadaassociates.com"),
  title: {
    default: "Sharada Associates | Financial Service in SR Nagar, Hyderabad",
    template: "%s | Sharada Associates",
  },
  description:
    "Sharada Associates is a leading financial service company in Sanjeeva Reddy Nagar, Hyderabad. We offer education loans, business loans, personal loans, and financial consultancy.",
  keywords: ["financial service company SR Nagar", "education loans Hyderabad", "business loans", "financial consultancy India", "Sharada Associates", "vehicle finance", "Sanjeeva Reddy Nagar loans"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharada Associates | Financial Service in SR Nagar, Hyderabad",
    description: "Your trusted partner for education loans and financial growth in Hyderabad.",
    url: "https://sharadaassociates.com",
    siteName: "Sharada Associates",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharada Associates | Financial Service in SR Nagar, Hyderabad",
    description: "Your trusted partner for education loans and financial growth in Hyderabad.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FinancialService", "LocalBusiness", "Organization"],
      "@id": "https://sharadaassociates.com/#organization",
      "name": "Sharada Associates",
      "url": "https://sharadaassociates.com",
      "logo": "https://sharadaassociates.com/icon.png",
      "description": "Sharada Associates is a reputable financial service company in Sanjeeva Reddy Nagar, Hyderabad, specializing in education loans and financial consultancy.",
      "telephone": "+91-9985111136",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9985111136",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Telugu", "Hindi"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H No: 7-1-321/S, Satya Sai Apartment, Flat No: 206, 2nd Floor, Srinivasa Nagar Colony",
        "addressLocality": "SR Nagar, Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500038",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.4419",
        "longitude": "78.4447"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.linkedin.com/company/sharda-associates"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://sharadaassociates.com/#website",
      "url": "https://sharadaassociates.com",
      "name": "Sharada Associates",
      "publisher": {
        "@id": "https://sharadaassociates.com/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
