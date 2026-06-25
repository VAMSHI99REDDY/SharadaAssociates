import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SharadaAssociates",
  description: "Get in touch with SharadaAssociates for expert financial guidance. We provide education loans, business loans, and personal loans across India.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
