import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function FeaturesSection() {
    return (
        <section id="features" className="container mx-auto py-20">
            <div className="mb-12 flex flex-col items-center justify-center">
                <h2 className="text-center text-3xl font-light leading-tight md:text-4xl">
                    Powerful <span className="font-medium text-primary">features</span> for developers
                </h2>
                <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                    Everything you need to build performant and engaging decentralized social experiences
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    title="Decentralized Identity"
                    description="Seamless integration with blockchain identities and wallets"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m7 10 5 5 5-5"></path><path d="M7 14h10"></path></svg>
                    }
                >
                    Connect with popular wallets and provide users with full ownership of their identities.
                    Support for SUI, Ethereum, and more.
                </FeatureCard>

                <FeatureCard
                    title="Social Graph"
                    description="Build connected experiences with user relationships"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle></svg>
                    }
                >
                    Create follows, connections, and relationships between users with our powerful social graph API.
                    Scale to millions of users with ease.
                </FeatureCard>

                <FeatureCard
                    title="Messaging & Notifications"
                    description="Encrypted communication channels for your users"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    }
                >
                    Implement secure, real-time messaging and notifications that keep your users engaged
                    and connected. End-to-end encryption included.
                </FeatureCard>

                <FeatureCard
                    title="Content Distribution"
                    description="Distribute content across the network efficiently"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    }
                >
                    Optimized content delivery network ensures your users' posts, images, and videos
                    are distributed quickly and reliably.
                </FeatureCard>

                <FeatureCard
                    title="Discovery Engine"
                    description="Help users find content and connect with others"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                    }
                >
                    AI-powered recommendation and discovery tools that deliver personalized
                    experiences while respecting privacy.
                </FeatureCard>

                <FeatureCard
                    title="Enterprise Security"
                    description="Protect your users and their data"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    }
                >
                    Industry-leading security protocols, advanced encryption, and compliance
                    tools keep your platform safe and trustworthy.
                </FeatureCard>
            </div>
        </section>
    );
}

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

function FeatureCard({ title, description, icon, children }: FeatureCardProps) {
    return (
        <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                    {icon}
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{children}</p>
            </CardContent>
        </Card>
    );
} 