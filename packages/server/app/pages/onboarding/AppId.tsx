import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useBeaver } from "@beaver/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AppId() {
    const [appName, setAppName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const beaver = useBeaver();
    const navigate = useNavigate();

    // Check if user is logged in
    const isLoggedIn = !!beaver.user;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!appName.trim()) {
            toast.error("Please enter an app name");
            return;
        }

        setIsSubmitting(true);

        try {
            // Placeholder for API call to request AppId
            // Replace with actual implementation
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("AppId created successfully!");
            // Handle successful creation - redirect or show ID
        } catch (error) {
            console.error(error);
            toast.error("Failed to create AppId");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="bg-cover bg-[url(/images/landing/4.jpg)] bg-center min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center w-full max-w-xl p-8 mx-10 space-y-8 overflow-hidden text-center border shadow-lg bg-background/80 glass rounded-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="p-6 rounded-full bg-primary/10"
                    >
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary"
                        >
                            <motion.path
                                d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M9 7H15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            />
                            <motion.path
                                d="M9 11H15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            />
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className="mb-4 text-2xl font-bold">Developer Access Required</h1>
                        <p className="max-w-md mx-auto mb-6 text-muted-foreground">
                            To request an AppId, you need to be logged in with a Beaver Identity.
                            Create an account or sign in to continue.
                        </p>
                    </motion.div>

                    <Button
                        className="w-full max-w-xs"
                        onClick={() => navigate("/app/")}
                    >
                        Sign in or Create Account
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cover bg-[url(/images/landing/4.jpg)] bg-center min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-xl p-8 mx-10 space-y-8 overflow-hidden text-center border shadow-lg bg-background/80 glass rounded-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-full bg-primary/10"
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                    >
                        <motion.path
                            d="M20 7L12 3L4 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M20 7V17L12 21L4 17V7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M12 12L20 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                        />
                        <motion.path
                            d="M12 12L4 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.9, duration: 0.4 }}
                        />
                        <motion.path
                            d="M12 12V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1.1, duration: 0.4 }}
                        />
                    </svg>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="mb-4 text-2xl font-bold">Request Developer AppId</h1>
                    <p className="max-w-md mx-auto mb-6 text-muted-foreground">
                        Get an AppId to start building with Beaver SDKs.
                        This will enable you to integrate Beaver's decentralized identity features into your application.
                    </p>
                </motion.div>

                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Card className="border bg-card/60 backdrop-blur-sm border-border/60">
                        <CardContent className="p-6 space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    <div className="space-y-2 text-left">
                                        <Input
                                            className="relative z-10 font-medium border-border/60"
                                            placeholder="Enter your app name"
                                            id="appName"
                                            name="appName"
                                            value={appName}
                                            onChange={(e) => setAppName(e.target.value)}
                                            required
                                        />
                                        <p className="mt-1 ml-1 text-xs text-muted-foreground">
                                            This name will be associated with your developer credentials
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        className="relative w-full overflow-hidden"
                                        type="submit"
                                        disabled={isSubmitting || !appName.trim()}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="w-4 h-4 mr-2 -ml-1 animate-spin"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            "Generate AppId"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    className="max-w-md mt-2 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    Your AppId gives you access to Beaver SDK features. Keep it secure and don't share it publicly.
                </motion.div>
            </div>
        </div>
    );
}