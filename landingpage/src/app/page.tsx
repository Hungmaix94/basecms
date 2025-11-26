import Image from "next/image";
import HeroSection from "../components/hero-section"; // Import the HeroSection component

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main> {/* Replace existing content with HeroSection */}
        <HeroSection {...{
                         title: "Build & Ship Faster",
                         description: "A collection of beautifully designed, production-ready components and landing pages built with Radix UI and Tailwind CSS.",
                         imageUrl: "/087264cf6e1e2f43e72bbd98cb6424cb.webp",
                         backgroundUrl: "/background.svg",
                         ctaPrimary: {
                         text: "Get Started",
                         href: "#",
                     },
                         ctaSecondary: {
                         text: "Browse Components",
                         href: "#",
                     },
                         variant: "default" as const,
                         imagePosition: "right" as const,
                     }} />
      </main>
    </div>
  );
}
