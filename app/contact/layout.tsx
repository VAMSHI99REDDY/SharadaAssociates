import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sharada Associates | Financial Advisors in SR Nagar",
  description: "Contact Sharada Associates in SR Nagar, Hyderabad for expert financial guidance. Call +91-9985111136 for education loans, business loans, and personal loans.",
  keywords: ["contact Sharada Associates", "financial advisors SR Nagar", "loan agency contact Hyderabad", "education loan consultation"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Sharada Associates | Financial Advisors in SR Nagar",
    description: "Contact Sharada Associates in SR Nagar, Hyderabad for expert financial guidance. Call +91-9985111136 for education loans, business loans, and personal loans.",
    url: "https://sharadaassociates.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sharada Associates | Financial Advisors in SR Nagar",
    description: "Contact Sharada Associates in SR Nagar, Hyderabad for expert financial guidance. Call +91-9985111136 for education loans, business loans, and personal loans.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
