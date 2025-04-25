import React from 'react';
import { useNavigate } from 'react-router';
import ErrorBoundary from './ErrorBoundary';
import { Button } from '@/shared/components/ui/button';
import ThemeSwitch from "../ThemeSwitch";
import Icon from "../Icon";

interface PageErrorBoundaryProps {
    children: React.ReactNode;
}

const DefaultErrorFallback = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background/95">
            <div className="fixed bottom-4 right-4">
                <ThemeSwitch />
            </div>

            <div className="relative overflow-hidden max-w-md w-full p-8 bg-card rounded-lg shadow-md border border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Animated top border */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />

                <div className="text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 mx-auto animate-in zoom-in-50 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">Something went wrong</h2>

                    <p className="text-muted-foreground mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
                        There was an error loading this page.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
                        <Button
                            onClick={() => {
                                localStorage.setItem('global-ui-store', "");
                                window.location.reload();
                            }}
                            variant="default"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 2v6h-6"></path>
                                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                                <path d="M3 22v-6h6"></path>
                                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                            </svg>
                            Reload Page
                        </Button>

                        <Button
                            onClick={() => navigate('/')}
                            variant="outline"
                        >
                            <Icon name="House" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({ children }) => {
    const handleError = (error: Error) => {
        // You can add logging to a service here
        console.error('Page error:', error);
    };

    return (
        <ErrorBoundary
            fallback={<DefaultErrorFallback />}
            onError={handleError}
        >
            {children}
        </ErrorBoundary>
    );
};

export default PageErrorBoundary; 