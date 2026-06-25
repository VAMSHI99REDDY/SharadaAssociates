import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Services | SharadaAssociates",
  description: "Explore our comprehensive loan services including Education Loans for studying abroad, Business Loans, Vehicle Finance, Housing Loans, and Personal Loans.",
};

export default function LoansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
