import * as React from "react";
import { Button } from "@/shared/components/ui/button";

export function CTASection() {
  return (
    <section className="container mx-auto py-20">
      <div className="rounded-2xl border border-border/40 bg-background/80 p-12 backdrop-blur-md md:p-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-light md:text-4xl">
            Ready to transform your{" "}
            <span className="font-medium text-primary">social experience?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Join thousands of developers building the future of social with
            Beaver Social SDK. Get started for free today.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Button size="lg">Get started for free</Button>
            <Button variant="outline" size="lg">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
