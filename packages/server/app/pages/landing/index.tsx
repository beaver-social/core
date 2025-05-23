import {
  ModernNavbar,
  EnhancedHero,
  AnimatedFeatures,
  CodeShowcase,
  ModernIntegrations,
  AnimatedCTA,
  ModernFooter,
} from "./components";
import { Image } from "@/shared/components/Image";

export default function Landing() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-200">
      <div className="absolute w-full inset-0 opacity-40">
        <Image
          src="/images/landing/15.jpg"
          alt="Background Effect"
          className="object-cover min-h-screen w-screen"
        />
      </div>

      <section className="relative z-10 md:h-screen">
        <ModernNavbar />
        <EnhancedHero />
      </section>
      <section className="relative px-4 z-10">
        <AnimatedFeatures />
      </section>
      <section className="relative px-4 z-10">
        <CodeShowcase />
      </section>
      <section className="relative px-4 z-10">
        <ModernIntegrations />
      </section>
      <section className="relative px-4 z-10">
        <AnimatedCTA />
      </section>
      <section className="relative z-10">
        <ModernFooter />
      </section>
    </div>
  );
}
