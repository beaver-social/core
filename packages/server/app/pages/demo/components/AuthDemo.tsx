import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";

interface User {
    id: string;
    username: string;
}

export default function AuthDemo() {
    const [activeView, setActiveView] = useState<'login' | 'register'>('login');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = async () => {
        setIsLoading(true);
        // SDK Logic Below
    };

    const handleRegister = async () => {
        setIsLoading(true);

        // SDK Logic Below
    };

    const handleLogout = () => {
        // SDK Logic Below
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
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
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
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Icon name="Loader" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            <>
                                <Icon name="Wallet" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                                Login with Wallet
                            </>
                        )}
                    </Button>
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

                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-medium" htmlFor="username">Username</label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                        />
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleRegister}
                        disabled={isLoading || !username}
                    >
                        {isLoading ? (
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
                </motion.div>
            )}
        </div>
    );
} 