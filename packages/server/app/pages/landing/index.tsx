import { BackgroundEffect, ModernNavbar, EnhancedHero, AnimatedFeatures, CodeShowcase, ModernIntegrations, InteractivePricing, AnimatedCTA, ModernFooter } from "./components";

export default function Landing() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-200">
            {/* Animated background effects */}
            <BackgroundEffect />

            {/* Main content */}
            <ModernNavbar />
            <EnhancedHero />
            <AnimatedFeatures />
            <CodeShowcase />
            <ModernIntegrations />
            <InteractivePricing />
            <AnimatedCTA />
            <ModernFooter />
        </div>
    );
}