import { useMutation, useQuery } from "@tanstack/react-query";
import { MINUTE } from "../config/constants";
import imageCompression from "browser-image-compression";
import apiClient from "../utils/apiClient";

const api = {
    useDummyPosts: () =>
        useQuery({
            queryKey: ["dummy", "coins"],
            queryFn: async () => {
                const res = await apiClient.dummy.posts.$get();
                const { posts } = await res.json();
                return posts;
            },
            staleTime: 10 * MINUTE,
        }),
};

export default api;
