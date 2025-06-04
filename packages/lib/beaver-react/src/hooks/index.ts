import { useBeaverContext } from "../context/beaver";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useBeaver() {
  const { client, user } = useBeaverContext();
  const wallet = useWallets();
  const social = useSocial();
  const post = usePost();
  const profile = useProfile();
  const docs = useDocs();
  const auth = useAuth();
  const ping = usePing();
  const application = useApplication();
  const media = useMedia();
  const actions = useActions();

  return {
    register: client.user.register.bind(client.user),
    login: client.user.login.bind(client.user),
    logout: client.user.logout.bind(client.user),
    auth,
    wallet,
    user,
    client,
    social,
    post,
    profile,
    docs,
    ping,
    application,
    media,
    actions,
  };
}

export function useLogin() {
  const { client } = useBeaverContext();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      return await client.user.login();
    },
  });
}

export function useRegister() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: Parameters<typeof client.user.register>[0]) => {
      return await client.user.register(data);
    },
  });
}

export function useLogout() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await client.user.logout();
    },
  });
}

export function useAuth() {
  const login = useLogin();
  const register = useRegister();
  const logout = useLogout();

  return {
    login,
    register,
    logout,
  };
}

export function useWallets() {
  const { client, isConnected, hasIdentity, isAuthenticated } =
    useBeaverContext();
  const wallets = client.connector.getWallets();

  return {
    wallets,
    isConnected,
    hasIdentity,
    isAuthenticated,
    connect: client.connector.connect.bind(client.connector),
    disconnect: client.connector.disconnect.bind(client.connector),
  };
}

export function usePost() {
  const { client } = useBeaverContext();
  const queryClient = useQueryClient();

  return {
    createPost: useMutation({
      mutationKey: ["createPost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.createPost>[0]
      ) => {
        return await client.posts.createPost(options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPostById"] });
        queryClient.invalidateQueries({ queryKey: ["getPostReplies"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
    deletePost: useMutation({
      mutationKey: ["deletePost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.deletePost>[0]
      ) => {
        return await client.posts.deletePost(options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPostById"] });
        queryClient.invalidateQueries({ queryKey: ["getPostReplies"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
    getPosts: ({
      perPage = 10,
      authorId,
      parentId,
      repliesOnly,
    }: {
      perPage?: number;
      authorId?: number;
      parentId?: number;
      repliesOnly?: boolean;
    }) =>
      useInfiniteQuery({
        queryKey: ["getPosts", perPage],
        queryFn: async ({ pageParam }) => {
          return await client.posts.getPosts({
            perPage,
            page: pageParam,
            authorId,
            parentId,
            repliesOnly,
          });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
          return lastPage.hasMore ? pages.length + 1 : undefined;
        },
      }),
    getFollowingPosts: (
      options?: Parameters<typeof client.posts.getFollowingPosts>[0]
    ) =>
      useQuery({
        queryKey: ["getFollowingPosts", options],
        queryFn: async () => {
          return await client.posts.getFollowingPosts(options);
        },
      }),
    getPostById: (options: Parameters<typeof client.posts.getPostById>[0]) =>
      useQuery({
        queryKey: ["getPostById", options],
        queryFn: async () => {
          return await client.posts.getPostById(options);
        },
      }),
    likePost: useMutation({
      mutationKey: ["likePost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.likePost>[0]
      ) => {
        return await client.posts.likePost(options);
      },
      onSuccess: () => {
        // Invalidate post data to update like counts and interactions
        queryClient.invalidateQueries({ queryKey: ["getPostById"] });
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPostInteracted"] });
        queryClient.invalidateQueries({ queryKey: ["getPostLikes"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
    unlikePost: useMutation({
      mutationKey: ["unlikePost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.unlikePost>[0]
      ) => {
        return await client.posts.unlikePost(options);
      },
      onSuccess: () => {
        // Invalidate post data to update like counts and interactions
        queryClient.invalidateQueries({ queryKey: ["getPostById"] });
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPostInteracted"] });
        queryClient.invalidateQueries({ queryKey: ["getPostLikes"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
    bookmarkPost: useMutation({
      mutationKey: ["bookmarkPost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.bookmarkPost>[0]
      ) => {
        return await client.posts.bookmarkPost(options);
      },
      onSuccess: () => {
        // Invalidate interaction data to update bookmark status
        queryClient.invalidateQueries({ queryKey: ["getPostInteracted"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
    unbookmarkPost: useMutation({
      mutationKey: ["unbookmarkPost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.unbookmarkPost>[0]
      ) => {
        return await client.posts.unbookmarkPost(options);
      },
      onSuccess: () => {
        // Invalidate interaction data to update bookmark status
        queryClient.invalidateQueries({ queryKey: ["getPostInteracted"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
    getPostLikes: (options: Parameters<typeof client.posts.getPostLikes>[0]) =>
      useQuery({
        queryKey: ["getPostLikes", options],
        queryFn: async () => {
          return await client.posts.getPostLikes(options);
        },
      }),
    getPostReplies: (
      options: Parameters<typeof client.posts.getPostReplies>[0]
    ) =>
      useQuery({
        queryKey: ["getPostReplies", options],
        queryFn: async () => {
          return await client.posts.getPostReplies(options);
        },
      }),
    getPostReposts: (
      options: Parameters<typeof client.posts.getPostReposts>[0]
    ) =>
      useQuery({
        queryKey: ["getPostReposts", options],
        queryFn: async () => {
          return await client.posts.getPostReposts(options);
        },
      }),
    getUserPostInteraction: (
      options: Parameters<typeof client.posts.getUserPostInteraction>[0]
    ) =>
      useQuery({
        queryKey: ["getPostInteracted", options],
        queryFn: async () => {
          return await client.posts.getUserPostInteraction(options);
        },
      }),
    upgradePost: useMutation({
      mutationKey: ["upgradePost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.upgrade>[0]
      ) => {
        return await client.posts.upgrade(options);
      },
      onSuccess: () => {
        // Invalidate post data to reflect upgrade status
        queryClient.invalidateQueries({ queryKey: ["getPostById"] });
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
  };
}

export function useProfile() {
  const { client } = useBeaverContext();
  const queryClient = useQueryClient();

  return {
    getProfile: (options: Parameters<typeof client.user.getProfile>[0]) =>
      useQuery({
        queryKey: ["getProfile", options],
        queryFn: async () => {
          return await client.user.getProfile(options);
        },
      }),
    getProfilesByIds: (
      options: Parameters<typeof client.user.getProfilesByIds>[0]
    ) =>
      useQuery({
        queryKey: ["getProfilesByIds", options],
        queryFn: async () => {
          return await client.user.getProfilesByIds(options);
        },
      }),
    searchSuggestions: (
      options: Parameters<typeof client.user.searchSuggestions>[0]
    ) =>
      useQuery({
        queryKey: ["searchSuggestions", options],
        queryFn: async () => {
          return await client.user.searchSuggestions(options);
        },
      }),
    updateProfile: useMutation({
      mutationKey: ["updateProfile"],
      mutationFn: async (
        options: Parameters<typeof client.user.updateProfile>[0]
      ) => {
        return await client.user.updateProfile(options);
      },
      onSuccess: () => {
        // Invalidate all profile-related queries to ensure fresh data
        queryClient.invalidateQueries({ queryKey: ["getProfile"] });
        // Also invalidate any posts queries to refresh author info
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPostById"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),
  };
}

export function useDocs() {
  const { client } = useBeaverContext();
  return {
    getDocs: () => {
      return useQuery({
        queryKey: ["docs"],
        queryFn: async () => {
          return await client.docs.fetchDocs();
        },
      });
    },

    getDocById: (options: Parameters<typeof client.docs.fetchDocById>[0]) => {
      return useQuery({
        queryKey: ["docs", options],
        queryFn: async () => {
          return await client.docs.fetchDocById(options);
        },
      });
    },
  };
}

export function usePing() {
  const { client } = useBeaverContext();
  const queryClient = useQueryClient();

  return {
    chat: useMutation({
      mutationKey: ["chat"],
      mutationFn: async (options: Parameters<typeof client.ping.chat>[0]) => {
        return await client.ping.chat(options);
      },
      onSuccess: () => {
        // Invalidate chat lists to show the new message
        queryClient.invalidateQueries({ queryKey: ["getAllChats"] });
        queryClient.invalidateQueries({ queryKey: ["getChatById"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),

    getAllChats: useQuery({
      queryKey: ["getAllChats"],
      queryFn: async () => {
        return await client.ping.getAllChats();
      },
    }),

    getChatById: (options: Parameters<typeof client.ping.getChatById>[0]) =>
      useQuery({
        queryKey: ["getChatById", options],
        queryFn: async () => {
          return await client.ping.getChatById(options);
        },
      }),
  };
}

export function useApplication() {
  const { client } = useBeaverContext();
  const queryClient = useQueryClient();

  return {
    createAppId: useMutation({
      mutationKey: ["createAppId"],
      mutationFn: async (
        options: Parameters<typeof client.application.createAppId>[0]
      ) => {
        return await client.application.createAppId(options);
      },
      onSuccess: () => {
        // Invalidate applications list to show the new app
        queryClient.invalidateQueries({ queryKey: ["getApplications"] });
      },
    }),

    getApplications: useQuery({
      queryKey: ["getApplications"],
      queryFn: async () => {
        return await client.application.getApplications();
      },
    }),

    getApplicationById: (
      options: Parameters<typeof client.application.getApplicationById>[0]
    ) =>
      useQuery({
        queryKey: ["getApplicationById", options],
        queryFn: async () => {
          return await client.application.getApplicationById(options);
        },
      }),

    whitelistApplicationUrls: useMutation({
      mutationKey: ["whitelistApplicationUrls"],
      mutationFn: async (
        options: Parameters<
          typeof client.application.whitelistApplicationUrls
        >[0]
      ) => {
        return await client.application.whitelistApplicationUrls(options);
      },
      onSuccess: () => {
        // Invalidate applications to reflect updated whitelist
        queryClient.invalidateQueries({ queryKey: ["getApplications"] });
        queryClient.invalidateQueries({ queryKey: ["getApplicationById"] });
      },
    }),
  };
}

export function useMedia() {
  const { client } = useBeaverContext();

  return {
    uploadMedia: useMutation({
      mutationKey: ["uploadMedia"],
      mutationFn: async (
        options: Parameters<typeof client.media.uploadMedia>[0]
      ) => {
        return await client.media.uploadMedia(options);
      },
    }),

    getMediaDetails: (
      options: Parameters<typeof client.media.getMediaDetails>[0]
    ) =>
      useQuery({
        queryKey: ["getMediaDetails", options],
        queryFn: async () => {
          return await client.media.getMediaDetails(options);
        },
      }),

    getUserMedia: (options: { userId: number; perPage?: number }) =>
      useInfiniteQuery({
        queryKey: ["getUserMedia", options],
        queryFn: async ({ pageParam = 1 }) => {
          return await client.media.getUserMedia({
            userId: options.userId,
            page: pageParam,
            perPage: options.perPage || 10,
          });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
          return lastPage.hasMore ? pages.length + 1 : undefined;
        },
      }),
  };
}

export function useSocial() {
  const { client } = useBeaverContext();
  const queryClient = useQueryClient();

  return {
    // Mutations for follow/unfollow actions
    followUser: useMutation({
      mutationKey: ["followUser"],
      mutationFn: async (
        data: Parameters<typeof client.social.followUser>[0]
      ) => {
        return await client.social.followUser(data);
      },
      onSuccess: (_, variables) => {
        // Invalidate follow-related queries
        queryClient.invalidateQueries({ queryKey: ["getFollowCounts"] });
        queryClient.invalidateQueries({ queryKey: ["isFollowing"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowers"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowing"] });
        queryClient.invalidateQueries({ queryKey: ["bulkCheckFollowStatus"] });
        queryClient.invalidateQueries({ queryKey: ["getProfilesByIds"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),

    unfollowUser: useMutation({
      mutationKey: ["unfollowUser"],
      mutationFn: async (
        data: Parameters<typeof client.social.unfollowUser>[0]
      ) => {
        return await client.social.unfollowUser(data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["getFollowCounts"] });
        queryClient.invalidateQueries({ queryKey: ["isFollowing"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowers"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowing"] });
        queryClient.invalidateQueries({ queryKey: ["bulkCheckFollowStatus"] });
        queryClient.invalidateQueries({ queryKey: ["getProfilesByIds"] });
        queryClient.invalidateQueries({ queryKey: ["getUserActions"] });
      },
    }),

    // Queries for follow data
    isFollowing: (options: Parameters<typeof client.social.isFollowing>[0]) =>
      useQuery({
        queryKey: ["isFollowing", options],
        queryFn: async () => {
          return await client.social.isFollowing(options);
        },
        enabled: !!options.userId,
      }),

    getFollowCounts: (
      options: Parameters<typeof client.social.getFollowCounts>[0]
    ) =>
      useQuery({
        queryKey: ["getFollowCounts", options],
        queryFn: async () => {
          return await client.social.getFollowCounts(options);
        },
        enabled: !!options.userId,
      }),

    bulkCheckFollowStatus: (
      options: Parameters<typeof client.social.bulkCheckFollowStatus>[0]
    ) =>
      useQuery({
        queryKey: ["bulkCheckFollowStatus", options],
        queryFn: async () => {
          return await client.social.bulkCheckFollowStatus(options);
        },
        enabled: !!options.userIds && options.userIds.length > 0,
      }),

    getFollowers: (options: { userId: number; perPage?: number }) =>
      useInfiniteQuery({
        queryKey: ["getFollowersInfinite", options],
        queryFn: async ({ pageParam = 1 }) => {
          return await client.social.getFollowers({
            userId: options.userId,
            page: pageParam,
            perPage: options.perPage || 10,
          });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, pages) => {
          return lastPage.hasMore ? pages.length + 1 : undefined;
        },
        enabled: !!options.userId,
      }),

    getFollowing: (options: { userId: number; perPage?: number }) =>
      useInfiniteQuery({
        queryKey: ["getFollowingInfinite", options],
        queryFn: async ({ pageParam = 1 }) => {
          return await client.social.getFollowing({
            userId: options.userId,
            page: pageParam,
            perPage: options.perPage || 10,
          });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, pages) => {
          return lastPage.hasMore ? pages.length + 1 : undefined;
        },
        enabled: !!options.userId,
      }),

    getMutualFollowers: (
      options: Parameters<typeof client.social.getMutualFollowers>[0]
    ) =>
      useQuery({
        queryKey: ["getMutualFollowers", options],
        queryFn: async () => {
          return await client.social.getMutualFollowers(options);
        },
        enabled: !!options.userId,
      }),

    getRecommendedUsers: (
      options: Parameters<typeof client.social.getRecommendedUsers>[0]
    ) =>
      useQuery({
        queryKey: ["getRecommendedUsers", options],
        queryFn: async () => {
          return await client.social.getRecommendedUsers(options);
        },
      }),
  };
}

export function useActions() {
  const { client } = useBeaverContext();

  return {
    getUserActions: (options: { userId: number; perPage?: number }) =>
      useInfiniteQuery({
        queryKey: ["getUserActions", options],
        queryFn: async ({ pageParam = 1 }) => {
          return await client.actions.fetchActions({
            perPage: options.perPage || 10,
            page: pageParam,
            userId: options.userId,
          });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
          return lastPage.hasMore ? pages.length + 1 : undefined;
        },
      }),
    getActionById: (
      options: Parameters<typeof client.actions.fetchActionById>[0]
    ) =>
      useQuery({
        queryKey: ["getActionById", options],
        queryFn: async () => {
          return await client.actions.fetchActionById(options);
        },
      }),
  };
}
