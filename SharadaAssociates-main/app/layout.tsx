import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  metadataBase: new URL("https://sharadaassociates.com"),
  title: "SharadaAssociates – Expert Financial Guidance & Comprehensive Loan Solutions",
  description:
    "SharadaAssociates provides educational loans for students planning to study abroad and financial services including business, vehicle, housing, movie financing, and personal loans.",
  keywords: "loans, education loans, study abroad loans, business loans, housing loans, financial consultancy India, Sharada Associates, vehicle finance, personal loans",
  openGraph: {
    title: "SharadaAssociates – Expert Financial Guidance",
    description: "Your trusted partner for education loans and financial growth.",
    url: "https://sharadaassociates.com",
    siteName: "SharadaAssociates",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "SharadaAssociates",
  "url": "https://sharadaassociates.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9985111136",
    "contactType": "customer service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H No: 7-1-321/S, Satya Sai Apartment, Flat No: 206, 2nd Floor, Srinivasa Nagar Colony",
    "addressLocality": "SR Nagar, Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500038",
    "addressCountry": "IN"
  }
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
