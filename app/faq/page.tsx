import FAQ from "@/components/FAQ";

export default function FAQPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-16 px-4 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Find answers to the most common questions about our loan services.
        </p>
      </div>
      <FAQ />
    </div>
  );
}
