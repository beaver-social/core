import * as React from "react";
import { Button } from "@/shared/components/ui/button";

export function IntegrationsSection() {
    return (
        <section id="integrations" className="container mx-auto py-20">
            <div className="grid gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-light leading-tight md:text-4xl">
                        Seamless <span className="font-medium text-primary">integrations</span> with your tech stack
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Beaver Social works with your existing infrastructure and favorite tools.
                        Our SDK is designed to integrate with minimal friction.
                    </p>
                    <ul className="mt-6 space-y-2">
                        <IntegrationListItem>React, Next.js, Angular, Vue and more</IntegrationListItem>
                        <IntegrationListItem>Multiple blockchain networks</IntegrationListItem>
                        <IntegrationListItem>Compatible with popular wallet providers</IntegrationListItem>
                        <IntegrationListItem>Native mobile SDKs for iOS and Android</IntegrationListItem>
                    </ul>
                    <div className="mt-8">
                        <Button variant="outline">View documentation</Button>
                    </div>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-6 backdrop-blur-sm">
                    <div className="rounded-md bg-muted p-4">
                        <pre className="text-sm text-muted-foreground">
                            <code>{`// Initialize Beaver Social
import { BeaverProvider } from "@beaver/react";

// In your app component
export default function App() {
  return (
    <BeaverProvider
      config={{
        apiKey: "YOUR_API_KEY",
        network: "mainnet"
      }}
    >
      <YourApp />
    </BeaverProvider>
  );
}`}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface IntegrationListItemProps {
    children: React.ReactNode;
}

function IntegrationListItem({ children }: IntegrationListItemProps) {
    return (
        <li className="flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{children}</span>
        </li>
    );
} 