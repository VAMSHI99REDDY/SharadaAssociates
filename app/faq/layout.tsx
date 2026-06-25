import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SharadaAssociates",
  description: "Find answers to frequently asked questions about education loans, processing times, interest rates, and other financial services at SharadaAssociates.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
