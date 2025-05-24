import { Image } from "@/shared/components/Image";
import {
  ModernNavbar,
  EnhancedHero,
  AnimatedFeatures,
  HowItWorks,
  UseCases,
  ModernIntegrations,
  SocialProof,
  FAQ,
  AnimatedCTA,
  ModernFooter,
} from "./components";

export default function Landing() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-200">
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen">
        <ModernNavbar />
        <EnhancedHero />
      </section>

      {/* Features Section */}
      <section className="relative px-4 z-10">
        <AnimatedFeatures />
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 z-10 my-10">
        <HowItWorks />
      </section>

      {/* Use Cases Section */}
      <section className="relative px-4 z-10">
        <UseCases />
      </section>

      {/* Integrations Section */}
      <section className="relative px-4 z-10">
        <ModernIntegrations />
      </section>

      {/* FAQ Section */}
      <section className="relative px-4 z-10">
        <FAQ />
      </section>

      {/* Footer */}
      <section className="relative z-10 mt-[16rem] sm:mt-[18rem] md:mt-[24rem] lg:mt-[32rem] xl:mt-[40rem]">
        <ModernFooter />
      </section>
    </div>
  );
}
