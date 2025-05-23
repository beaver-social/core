import { useSearchParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import Layout from "@/pages/layout";
import SecondaryPanel from "./SecondaryPanel";
import FeedPost from "@/pages/home/FeedPost";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import SearchBar from "@/pages/explore/SearchBar";
import { samplePosts } from "@/shared/data/posts";
import { useBeaver } from "@beaver/react";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import { motion } from "framer-motion";

// Sample data for profiles and topics in search
const sampleProfiles = [
  {
    id: "1",
    name: "Kartik",
    handle: "ishtails",
    profilePicture: "/images/user.webp",
  },
  {
    id: "2",
    name: "John Doe",
    handle: "johndoe",
    profilePicture: "/images/user.webp",
  },
  {
    id: "3",
    name: "Jane Smith",
    handle: "janesmith",
    profilePicture: "/images/user.webp",
  },
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

  const beaver = useBeaver();
  const {
    data: postArray,
    fetchNextPage,
    hasNextPage,
  } = beaver.post.getPosts({ perPage: 10 });

  const { infiniteScrollRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  console.log({
    infiniteScrollRef,
  });

  // Handle search from the search bar
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setSearchParams({ q: searchQuery });
    },
    [setSearchParams],
  );

  return (
    <Layout
      main={
        <>
          {/* Search Header */}
          <div className="top-0 z-10 backdrop-blur-sm rounded-t-2xl">
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
              <p className="text-sm text-muted-foreground mt-3">
                Results for "{query}"
              </p>
            )}
          </div>

          {/* Search Results */}
          <div className="divide-y my-6">
            {postArray?.pages && postArray?.pages.length > 0 ? (
              postArray?.pages.map((page) =>
                page.posts.map((postId, index) => (
                  <FeedPost key={index} postId={postId.id} />
                )),
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 border items-center text-grey-500 justify-center p-10 rounded-sm"
              >
                <p className="text-sm">No posts found..</p>
              </motion.div>
            )}

            {hasNextPage && <div ref={infiniteScrollRef} className="h-1" />}
          </div>
        </>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
