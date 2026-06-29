import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education & Business Loans in Hyderabad | Lowest Interest Rates",
  description: "Get the best education loans for studying abroad, business loans, vehicle finance, and personal loans in Hyderabad. Fast processing and expert guidance.",
  keywords: ["education loan Hyderabad", "study abroad loan India", "business loan SR Nagar", "vehicle finance Hyderabad", "housing loans", "lowest interest rate loans"],
  alternates: {
    canonical: "/loans",
  },
  openGraph: {
    title: "Education & Business Loans in Hyderabad | Lowest Interest Rates",
    description: "Get the best education loans for studying abroad, business loans, vehicle finance, and personal loans in Hyderabad. Fast processing and expert guidance.",
    url: "https://sharadaassociates.com/loans",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education & Business Loans in Hyderabad | Lowest Interest Rates",
    description: "Get the best education loans for studying abroad, business loans, vehicle finance, and personal loans in Hyderabad. Fast processing and expert guidance.",
  },
};

export default function LoansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
