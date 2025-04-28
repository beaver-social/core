import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useNavigate } from "react-router";

type Props = {
    onComplete: () => void;
    handleBack: () => void;
    handleSkip: () => void;
}

export default function ConnectSuiNS({ onComplete, handleBack, handleSkip }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<{ name: string; isAvailable: boolean }[]>([]);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const handleSearch = () => {
        if (!searchTerm) return;

        setIsSearching(true);
        setSearchResults([]);

        // Placeholder for SDK logic to search SuiNS names
        // This would be replaced with actual implementation
        setTimeout(() => {
            // Mock results for demonstration
            const results = [
                { name: `${searchTerm}.sui`, isAvailable: Math.random() > 0.5 },
                { name: `${searchTerm}123.sui`, isAvailable: true },
                { name: `${searchTerm}web3.sui`, isAvailable: true },
            ].filter(result => result.name.includes(searchTerm));

            setSearchResults(results);
            setIsSearching(false);
        }, 1200);
    };

    const handleConnect = () => {
        if (!selectedName) return;

        setIsConnecting(true);

        // Placeholder for SDK logic to connect SuiNS name
        // This would be replaced with actual implementation
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
            onComplete();
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-full bg-primary/10 p-6"
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
                        d="M3 5H5C6.06087 5 7.07828 5.42143 7.82843 6.17157C8.57857 6.92172 9 7.93913 9 9V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M21 5H19C17.9391 5 16.9217 5.42143 16.1716 6.17157C15.4214 6.92172 15 7.93913 15 9V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold mb-4">Connect Your SuiNS</h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    SuiNS is a decentralized naming service for the Sui network.
                    Link your SuiNS name to your profile for easier discovery.
                </p>
            </motion.div>

            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Card className="bg-card/60 backdrop-blur-sm border border-border/60">
                    <CardContent className="p-6 space-y-6">
                        {!selectedName && !isConnected && (
                            <div className="space-y-4">
                                <div className="relative flex items-center">
                                    <Input
                                        className="pr-12 border-border/60"
                                        placeholder="Search for a SuiNS name"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    />
                                    <Button
                                        size="sm"
                                        className="absolute right-1 h-8"
                                        onClick={handleSearch}
                                        disabled={isSearching || !searchTerm}
                                    >
                                        {isSearching ? (
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </Button>
                                </div>

                                {isSearching && (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="flex-1 space-y-4">
                                                <div className="h-4 bg-secondary rounded w-3/4"></div>
                                                <div className="h-4 bg-secondary rounded"></div>
                                                <div className="h-4 bg-secondary rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isSearching && searchResults.length > 0 && (
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        <p className="text-sm text-muted-foreground text-left">Search results:</p>
                                        {searchResults.map((result, index) => (
                                            <motion.div
                                                key={result.name}
                                                className={`p-3 rounded-md border border-border/60 text-left cursor-pointer ${result.isAvailable ? 'hover:border-primary/50 hover:bg-primary/5' : 'opacity-50'}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * index, duration: 0.3 }}
                                                onClick={() => result.isAvailable && setSelectedName(result.name)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{result.name}</span>
                                                    {result.isAvailable ? (
                                                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Available</span>
                                                    ) : (
                                                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">Taken</span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {!isSearching && searchTerm && searchResults.length === 0 && (
                                    <div className="py-6 text-center">
                                        <p className="text-muted-foreground">No SuiNS names found. Try a different search.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedName && !isConnected && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <button
                                        className="text-primary hover:underline text-sm"
                                        onClick={() => setSelectedName(null)}
                                    >
                                        ← Back to search
                                    </button>
                                </div>

                                <div className="flex flex-col items-center py-4">
                                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                            <path d="M16 8V5C16 4.73478 15.8946 4.48043 15.7071 4.29289C15.5196 4.10536 15.2652 4 15 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15 8L19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    <h3 className="font-bold text-xl mb-1">{selectedName}</h3>
                                    <p className="text-sm text-muted-foreground mb-6">Connect this SuiNS name to your profile</p>

                                    <Button
                                        className="w-full"
                                        onClick={handleConnect}
                                        disabled={isConnecting}
                                    >
                                        {isConnecting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Connecting...
                                            </>
                                        ) : (
                                            "Connect SuiNS"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {isConnected && (
                            <div className="py-8 flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-green-500/10 rounded-full p-4 mb-4"
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>

                                <h3 className="font-bold text-xl mb-2">Connected!</h3>
                                <p className="text-muted-foreground mb-2">{selectedName} is now linked to your profile</p>
                            </div>
                        )}

                        {!isConnected && !selectedName && (
                            <Button
                                variant="ghost"
                                className="w-full text-muted-foreground"
                                onClick={handleSkip}
                            >
                                Skip for now
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.button
                onClick={handleBack}
                className="text-xs text-muted-foreground mt-2 underline underline-offset-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                Go Back
            </motion.button>

            <motion.div
                className="text-xs text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                You can always connect a SuiNS name later from your profile settings
            </motion.div>
        </div>
    );
} 