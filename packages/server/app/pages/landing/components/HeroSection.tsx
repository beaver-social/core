import * as React from "react";
import { Button } from "@/shared/components/ui/button";

export function HeroSection() {
    return (
        <section className="container mx-auto flex flex-1 flex-col items-center justify-center py-20">
            <h1 className="max-w-4xl text-center text-6xl font-extralight leading-tight tracking-tight md:text-7xl">
                Simplify your <span className="relative font-medium text-primary">web3</span> social experience
            </h1>
            <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground">
                AI-driven SDK that streamlines your decentralized social applications.
                Build, connect, and scale — all in one place.
            </p>
            <div className="mt-10 flex items-center gap-4">
                <Button variant="interactive" size="lg">Get started</Button>
                <Button variant="outline" size="lg">View Demo</Button>
            </div>
        </section>
    );
} 