import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { useBeaver } from "@beaver/react";
import { toast } from "sonner";
interface User {
    id: string;
    username: string;
}

export default function AuthDemo() {
    const beaver = useBeaver();

    // States
    const isConnected = beaver.wallet.isConnected;
    const hasIdentity = beaver.wallet.hasIdentity;
    const isAuthenticated = beaver.wallet.isAuthenticated;

    // Mutations
    const { mutate: login, isPending: isLoginPending, isSuccess: isLoginSuccess } = beaver.auth.login;
    const { mutate: register, isPending: isRegisterPending, isSuccess: isRegisterSuccess } = beaver.auth.register;
    const { mutate: logout, isPending: isLogoutPending, isSuccess: isLogoutSuccess } = beaver.auth.logout;

    const [activeView, setActiveView] = useState<'register' | 'login'>(hasIdentity ? 'login' : 'register');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = async () => {
        if (!isConnected) {
            toast.error('Please connect your wallet first');
            return;
        }

        login();
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const fullName = formData.get('fullName') as string;

        if (!isConnected) {
            toast.error('Please connect your wallet first');
            return;
        }

        register({ username, fullName });
    };

    const handleLogout = () => {
        if (!isAuthenticated) {
            toast.error('Not Logged In');
            return;
        }

        logout();
    };

    if (user) {
        return (
            <div className="space-y-6">
                <div className="p-4 md:p-6 bg-green-50/30 border border-green-200 rounded-md">
                    <h2 className="text-base md:text-lg font-medium text-green-700">Authentication Successful</h2>
                    <p className="mt-2 text-sm md:text-base text-green-600">
                        Logged in as <span className="font-bold">{user.username}</span>
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xs md:text-sm font-medium">User ID: {user.id}</h3>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        size="sm"
                        className="text-xs md:text-sm"
                    >
                        <Icon name="LogOut" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Tabs
                defaultValue={activeView}
                value={activeView}
                onValueChange={(v) => setActiveView(v as 'login' | 'register')}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="register">Register</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
            </Tabs>

            {activeView === 'login' ? (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div>
                        <h2 className="text-lg md:text-xl font-medium">Login with Identity</h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Connect your wallet to login to your Beaver account.</p>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={isAuthenticated ? handleLogout : handleLogin}
                        disabled={isLoginPending}
                    >
                        {isLoginPending ? (
                            <>
                                <Icon name="Loader" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                                Connecting...
                            </>
                        ) : isAuthenticated ? (
                            <>
                                <Icon name="LogOut" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                                Logout
                            </>
                        ) : (
                            <>
                                <Icon name="Key" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                                Login
                            </>
                        )}
                    </Button>
                </motion.div>
            ) : hasIdentity ? (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div>
                        <h2 className="text-lg md:text-xl font-medium">You already have an account.</h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Login to your Beaver account with your wallet.</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div>
                        <h2 className="text-lg md:text-xl font-medium">Register New Account</h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Create a new Beaver account with your wallet.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="space-y-2">
                            <label className="block text-xs md:text-sm font-medium" htmlFor="username">Username</label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs md:text-sm font-medium" htmlFor="fullName">Full Name</label>
                            <Input
                                id="fullName"
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={isRegisterPending}
                            type="submit"
                        >
                            {isRegisterPending ? (
                                <>
                                    <Icon name="Loader" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                                    Registering...
                                </>
                            ) : (
                                <>
                                    <Icon name="UserPlus" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                                    Register
                                </>
                            )}
                        </Button>
                    </form>
                </motion.div>
            )}
        </div>
    );
} 