import * as React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function PricingSection() {
  return (
    <section id="pricing" className="container mx-auto py-20">
      <div className="mb-12 flex flex-col items-center justify-center">
        <h2 className="text-center text-3xl font-light leading-tight md:text-4xl">
          Flexible <span className="font-medium text-primary">pricing</span> for
          teams of all sizes
        </h2>
        <p className="mt-4 max-w-2xl text-center text-muted-foreground">
          From indie developers to enterprise teams, we have a plan that works
          for you
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <PricingCard
          title="Developer"
          price="Free"
          variant="default"
          buttonText="Get started"
          buttonVariant="outline"
        >
          <PricingFeature>Up to 1,000 monthly active users</PricingFeature>
          <PricingFeature>Core social features</PricingFeature>
          <PricingFeature>Community support</PricingFeature>
        </PricingCard>

        <PricingCard
          title="Pro"
          price="$99"
          variant="featured"
          buttonText="Get started"
          buttonVariant="default"
        >
          <PricingFeature>Up to 10,000 monthly active users</PricingFeature>
          <PricingFeature>Advanced features & analytics</PricingFeature>
          <PricingFeature>Priority email support</PricingFeature>
          <PricingFeature>Custom branding options</PricingFeature>
        </PricingCard>

        <PricingCard
          title="Enterprise"
          price="Custom"
          variant="default"
          buttonText="Contact sales"
          buttonVariant="outline"
          hidePerMonth={true}
        >
          <PricingFeature>Unlimited users</PricingFeature>
          <PricingFeature>Advanced security & compliance</PricingFeature>
          <PricingFeature>Dedicated account manager</PricingFeature>
          <PricingFeature>Custom integrations</PricingFeature>
        </PricingCard>
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  variant: "default" | "featured";
  buttonText: string;
  buttonVariant: "default" | "outline";
  hidePerMonth?: boolean;
  children: React.ReactNode;
}

function PricingCard({
  title,
  price,
  variant,
  buttonText,
  buttonVariant,
  hidePerMonth = false,
  children,
}: PricingCardProps) {
  return (
    <Card
      className={
        variant === "featured"
          ? "relative border-primary/30 bg-background/80 backdrop-blur-sm"
          : "border-border/40 bg-background/60 backdrop-blur-sm"
      }
    >
      {variant === "featured" && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-light">{price}</span>
          {!hidePerMonth && (
            <span className="ml-1 text-muted-foreground">/month</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {React.Children.map(children, (child) => child)}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface PricingFeatureProps {
  children: React.ReactNode;
}

function PricingFeature({ children }: PricingFeatureProps) {
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
