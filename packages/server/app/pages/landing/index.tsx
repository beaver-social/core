import { Image } from "@/shared/components/Image";
import { BackgroundEffect, ModernNavbar, EnhancedHero, AnimatedFeatures, CodeShowcase, ModernIntegrations, InteractivePricing, AnimatedCTA, ModernFooter } from "./ai";
import Orb from "./ui/orb";
import Squares from "./ui/grid";
import LetterGlitch from "./ui/crypto";
import Particles from "./ui/particles";
import FooterAlt from "./components/FooterAlt";
import Chatbot from "@/pages/landing/chatbot/index";
import FeatureSection from "./components/features";

export default function Landing() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-200">
            <BackgroundEffect />
            <ModernNavbar />
            <EnhancedHero />
            <AnimatedFeatures />
            <CodeShowcase />
            <ModernIntegrations />
            <InteractivePricing />
            <AnimatedCTA />
            <ModernFooter />
            <Chatbot />
        </div>
    );
}