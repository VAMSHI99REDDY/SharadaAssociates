import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "SharadaAssociates – Expert Financial Guidance & Comprehensive Loan Solutions",
  description:
    "SharadaAssociates provides educational loans for students planning to study abroad and financial services including business, vehicle, housing, movie financing, and personal loans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
