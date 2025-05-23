import { Component, ErrorInfo, ReactNode } from "react";
import Icon from "@/shared/components/Icon";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ShortsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Shorts component error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-6 bg-background">
          <div className="bg-card p-8 rounded-lg border shadow-sm max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                <Icon
                  name="TriangleAlert"
                  className="h-8 w-8 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't load the shorts feed. Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
