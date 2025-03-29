import { Button } from "@/shared/components/ui/button";
import { Search } from "lucide-react";

export default function SecondaryPanel() {
    return (
        <div className="w-[350px] h-full p-4 space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Trending Topics */}
            <div className="bg-secondary rounded-xl p-4">
                <h2 className="text-xl font-bold mb-4">What's happening</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-sm text-muted-foreground">Trending in Technology</p>
                            <p className="font-semibold">#Web3</p>
                            <p className="text-sm text-muted-foreground">10.5K posts</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Profiles */}
            <div className="bg-secondary rounded-xl p-6">
                <h2 className="font-bold mb-4">Suggested for you</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-300" />
                                <div>
                                    <p className="font-semibold">Kartik</p>
                                    <p className="text-sm text-muted-foreground">@ishtails</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Follow</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 