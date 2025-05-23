import { useBeaverContext } from "../context/beaver";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export function useBeaver() {
  const { client, user } = useBeaverContext();
  const wallet = useWallets();
  const follow = useFollow();
  const post = usePost();
  const profile = useProfile();
  const docs = useDocs();
  const auth = useAuth();
  const ping = usePing();

  return {
    register: client.user.register.bind(client.user),
    login: client.user.login.bind(client.user),
    logout: client.user.logout.bind(client.user),
    auth,
    wallet,
    user,
    client,
    follow,
    post,
    profile,
    docs,
    ping,
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

export function useFollow() {
  const { client } = useBeaverContext();

  return {
    followUser: useMutation({
      mutationKey: ["followUser"],
      mutationFn: async (
        data: Parameters<typeof client.user.followUser>[0]
      ) => {
        return await client.user.followUser(data);
      },
    }),
    unfollowUser: useMutation({
      mutationKey: ["unfollowUser"],
      mutationFn: async (
        data: Parameters<typeof client.user.unfollowUser>[0]
      ) => {
        return await client.user.unfollowUser(data);
      },
    }),
    getFollowCount: (
      options: Parameters<typeof client.user.getFollowCount>[0]
    ) =>
      useQuery({
        queryKey: ["getFollowCount", options],
        queryFn: async () => {
          return await client.user.getFollowCount(options);
        },
      }),
    getFollowers: (options: Parameters<typeof client.user.getFollowers>[0]) =>
      useQuery({
        queryKey: ["getFollowers", options],
        queryFn: async () => {
          return await client.user.getFollowers(options);
        },
      }),
    getFollowing: (options: Parameters<typeof client.user.getFollowing>[0]) =>
      useQuery({
        queryKey: ["getFollowing", options],
        queryFn: async () => {
          return await client.user.getFollowing(options);
        },
      }),
  };
}

export function usePost() {
  const { client } = useBeaverContext();

  return {
    createPost: useMutation({
      mutationKey: ["createPost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.createPost>[0]
      ) => {
        return await client.posts.createPost(options);
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
    }),
    unlikePost: useMutation({
      mutationKey: ["unlikePost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.unlikePost>[0]
      ) => {
        return await client.posts.unlikePost(options);
      },
    }),
    bookmarkPost: useMutation({
      mutationKey: ["bookmarkPost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.bookmarkPost>[0]
      ) => {
        return await client.posts.bookmarkPost(options);
      },
    }),
    unbookmarkPost: useMutation({
      mutationKey: ["unbookmarkPost"],
      mutationFn: async (
        options: Parameters<typeof client.posts.unbookmarkPost>[0]
      ) => {
        return await client.posts.unbookmarkPost(options);
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
  };
}

export function useProfile() {
  const { client } = useBeaverContext();

  return {
    getProfile: (options: Parameters<typeof client.user.getProfile>[0]) =>
      useQuery({
        queryKey: ["getProfile", options],
        queryFn: async () => {
          return await client.user.getProfile(options);
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

  return {
    chat: useMutation({
      mutationKey: ["chat"],
      mutationFn: async (options: Parameters<typeof client.ping.chat>[0]) => {
        return await client.ping.chat(options);
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
