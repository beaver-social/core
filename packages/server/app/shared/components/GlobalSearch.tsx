import { useState, useEffect } from "react";
import SearchBar from "../../pages/explore/SearchBar";

// Mock data for profiles and topics - replace with actual data source in your app
const mockProfiles = [
    {
        id: "1",
        name: "John Doe",
        handle: "johndoe",
        profilePicture: "https://github.com/shadcn.png"
    },
    {
        id: "2",
        name: "Jane Smith",
        handle: "janesmith",
        profilePicture: "https://github.com/shadcn.png"
    }
];

const mockTopics = [
    {
        id: "1",
        name: "blockchain",
        count: "120"
    },
    {
        id: "2",
        name: "web3",
        count: "85"
    }
];

export default function GlobalSearch() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Set up global keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                setIsSearchOpen(true);
            }
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            {isSearchOpen && (
                <SearchBar
                    profiles={mockProfiles}
                    topics={mockTopics}
                    isModal={true}
                    onModalClose={() => setIsSearchOpen(false)}
                    placeholder="Search for people, topics, and more..."
                />
            )}
        </>
    );
} 