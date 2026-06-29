import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Education Loans & Financial Services in Hyderabad",
  description: "Find answers to frequently asked questions about education loans, processing times, interest rates, eligibility, and other financial services at Sharada Associates.",
  keywords: ["education loan FAQ", "Sharada Associates FAQ", "loan processing time", "study abroad loan eligibility", "loan interest rates Hyderabad"],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Education Loans & Financial Services in Hyderabad",
    description: "Find answers to frequently asked questions about education loans, processing times, interest rates, eligibility, and other financial services at Sharada Associates.",
    url: "https://sharadaassociates.com/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Education Loans & Financial Services in Hyderabad",
    description: "Find answers to frequently asked questions about education loans, processing times, interest rates, eligibility, and other financial services at Sharada Associates.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
