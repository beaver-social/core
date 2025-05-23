import * as React from "react";

export function Partners() {
  return (
    <section className="container mx-auto pb-20">
      <div className="flex flex-col items-center justify-center">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
          Trusted by developers worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-70">
          <div className="h-8 w-32 bg-primary/20 backdrop-blur-sm"></div>
          <div className="h-8 w-32 bg-primary/20 backdrop-blur-sm"></div>
          <div className="h-8 w-32 bg-primary/20 backdrop-blur-sm"></div>
          <div className="h-8 w-32 bg-primary/20 backdrop-blur-sm"></div>
        </div>
      </div>
    </section>
  );
}
