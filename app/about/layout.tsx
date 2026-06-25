import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SharadaAssociates",
  description: "Learn about SharadaAssociates. We are a trusted financial consultancy with years of experience providing education loans, business loans, and expert financial guidance.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
