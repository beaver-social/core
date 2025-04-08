import { useSearchParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import Layout from "@/pages/layout";
import SecondaryPanel from "./SecondaryPanel";
import FeedPost from "@/pages/home/FeedPost";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import SearchBar from "@/pages/explore/SearchBar";

// Sample post data for demonstration
const samplePosts = [
    {
        id: "1",
        username: "John Doe",
        handle: "johndoe",
        timestamp: "2h",
        content: "Just launched my new Web3 project! 🚀 Check it out and let me know what you think.",
        images: ["/images/banner.webp"],
        aspectRatio: "square" as const,
        likes: 42,
        comments: 12,
        reposts: 5,
        shares: 3,
        avatarUrl: "/images/user.webp"
    },
    {
        id: "2",
        username: "Jane Smith",
        handle: "janesmith",
        timestamp: "4h",
        content: "Working on some exciting new features for our Blockchain platform. Stay tuned! 💻",
        aspectRatio: "portrait" as const,
        likes: 28,
        comments: 8,
        reposts: 3,
        shares: 1,
        avatarUrl: "/images/user.webp"
    },
    {
        id: "3",
        username: "Mike Johnson",
        handle: "mikej",
        timestamp: "6h",
        content: "Great day at the NFT conference! Learned so much about the future of web development.",
        images: ["/icons/logo_dark.png"],
        aspectRatio: "square" as const,
        likes: 89,
        comments: 24,
        reposts: 12,
        shares: 6,
        avatarUrl: "/images/user.webp"
    },
    {
        id: "4",
        username: "Alex Wilson",
        handle: "alexw",
        timestamp: "1d",
        content: "Just published my article on Web3 technologies and their impact on the future of the internet. #Web3 #Blockchain",
        aspectRatio: "square" as const,
        likes: 112,
        comments: 45,
        reposts: 23,
        shares: 15,
        avatarUrl: "/images/user.webp"
    },
    {
        id: "5",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "2d",
        content: "Excited to announce that we're integrating NFT functionality into our platform. This will allow creators to tokenize their content!",
        aspectRatio: "square" as const,
        likes: 78,
        comments: 34,
        reposts: 14,
        shares: 8,
        avatarUrl: "/images/user.webp"
    }
];

// Sample data for profiles and topics in search
const sampleProfiles = [
    { id: "1", name: "Kartik", handle: "ishtails", profilePicture: "/images/user.webp" },
    { id: "2", name: "John Doe", handle: "johndoe", profilePicture: "/images/user.webp" },
    { id: "3", name: "Jane Smith", handle: "janesmith", profilePicture: "/images/user.webp" },
];

const trendingTopics = [
    { id: "1", name: "Web3", count: "10.5K" },
    { id: "2", name: "Blockchain", count: "8.2K" },
    { id: "3", name: "NFT", count: "5.7K" },
];

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const navigate = useNavigate();
    const [filteredPosts, setFilteredPosts] = useState(samplePosts);

    // Filter posts based on search query
    const filterPosts = useCallback((searchQuery: string) => {
        if (!searchQuery) {
            setFilteredPosts(samplePosts);
            return;
        }

        // Case-insensitive search on content
        const filtered = samplePosts.filter(post =>
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.handle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, []);

    // Handle search from the search bar
    const handleSearch = useCallback((searchQuery: string) => {
        setSearchParams({ q: searchQuery });
        filterPosts(searchQuery);
    }, [setSearchParams, filterPosts]);

    // Initial filter on component mount and when query changes
    useEffect(() => {
        filterPosts(query);
    }, [query, filterPosts]);

    return (
        <Layout
            main={
                <div className="border mb-10 mx-auto rounded-2xl">
                    {/* Search Header */}
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b p-4 rounded-t-2xl">
                        <div className="flex items-center gap-4 mb-5">
                            <button
                                onClick={() => navigate(-1)}
                                className="rounded-full p-2 hover:bg-background/10"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="font-bold text-xl">Search</h1>
                            </div>
                        </div>

                        {/* Inline search bar */}
                        <SearchBar
                            profiles={sampleProfiles}
                            topics={trendingTopics}
                            onSearch={handleSearch}
                            placeholder="Search for people, posts, or topics"
                        />

                        {query && (
                            <p className="text-sm text-muted-foreground mt-3">Results for "{query}"</p>
                        )}
                    </div>

                    {/* Search Results */}
                    {filteredPosts.length > 0 ? (
                        <div className="divide-y">
                            {filteredPosts.map((post) => (
                                <FeedPost key={post.id} {...post} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <h2 className="text-xl font-semibold mb-2">No results found</h2>
                            <p className="text-center text-muted-foreground">
                                Try searching for different terms or check your spelling.
                            </p>
                        </div>
                    )}
                </div>
            }
            secondary={<SecondaryPanel />}
        />
    );
} 