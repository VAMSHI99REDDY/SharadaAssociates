import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Top Financial Consultants in SR Nagar, Hyderabad",
  description: "Learn about Sharada Associates. We are a trusted financial consultancy in Hyderabad with 25+ years of experience providing education loans, business loans, and expert financial guidance.",
  keywords: ["financial consultants Hyderabad", "about Sharada Associates", "SR Nagar loan agency", "education loan consultants", "business loan experts"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Top Financial Consultants in SR Nagar, Hyderabad",
    description: "Learn about Sharada Associates. We are a trusted financial consultancy in Hyderabad with 25+ years of experience.",
    url: "https://sharadaassociates.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Top Financial Consultants in SR Nagar, Hyderabad",
    description: "Learn about Sharada Associates. We are a trusted financial consultancy in Hyderabad with 25+ years of experience.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
