import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { cn } from "@/shared/lib/utils";

interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  componentName?: string;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
  className?: string;
}

const DefaultComponentFallback = ({
  componentName,
}: {
  componentName?: string;
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm transition-all">
      {/* Animated gradient line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-shimmer" />

      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">
          {componentName ? `${componentName} component` : "Component"} failed to
          load
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        This component encountered an error during rendering.
      </p>
    </div>
  );
};

const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({
  children,
  componentName,
  fallback,
  onError,
  className,
}) => {
  const handleError = (error: Error) => {
    console.error(`Error in ${componentName || "component"}:`, error);
    onError?.(error);
  };

  return (
    <ErrorBoundary
      fallback={
        fallback || <DefaultComponentFallback componentName={componentName} />
      }
      onError={handleError}
    >
      <div className={cn(className)}>{children}</div>
    </ErrorBoundary>
  );
};

export default ComponentErrorBoundary;
