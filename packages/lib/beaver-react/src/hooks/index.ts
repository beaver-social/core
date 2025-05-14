import { useBeaverContext } from "../context/beaver";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBeaver() {
  const { client, user } = useBeaverContext();
  const wallet = useWallets();
  const follows = useFollows();
  const post = usePost();
  const profile = useProfile();

  return {
    user,
    client,
    wallet,
    register: client.user.register.bind(client.user),
    login: client.user.login.bind(client.user),
    logout: client.user.logout.bind(client.user),
    follows,
    post,
    profile,
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

export function useWallets() {
  const { client, isConnected, hasIdentity } = useBeaverContext();
  const wallets = client.connector.getWallets();

  return {
    wallets,
    isConnected,
    hasIdentity,
    connect: client.connector.connect.bind(client.connector),
    disconnect: client.connector.disconnect.bind(client.connector),
  };
}

export function useUploadPost() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["uploadPost"],
    mutationFn: async (data: Parameters<typeof client.posts.upload>[0]) => {
      return await client.posts.upload(data);
    },
  });
}

export function useFollows() {
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
        options: Parameters<typeof client.posts.upload>[0]
      ) => {
        return await client.posts.upload(options);
      },
    }),
    getPosts: (options?: Parameters<typeof client.posts.getPosts>[0]) =>
      useQuery({
        queryKey: ["getPosts", options],
        queryFn: async () => {
          return await client.posts.getPosts(options);
        },
      }),
    getPostById: (options: Parameters<typeof client.posts.getPostById>[0]) =>
      useQuery({
        queryKey: ["getPostById", options],
        queryFn: async () => {
          return await client.posts.getPostById(options);
        },
      }),
  };
}

export function useProfile() {
  const { client, user } = useBeaverContext();

  return {
    currentUser: user,
    getProfileById: (options: Parameters<typeof client.user.getUserById>[0]) =>
      useQuery({
        queryKey: ["getProfileById", options],
        queryFn: async () => {
          return await client.user.getUserById(options);
        },
      }),
    canMint: useMutation({
      mutationKey: ["canMint"],
      mutationFn: async (
        options: Parameters<typeof client.user.canMint>[0]
      ) => {
        return await client.user.canMint(options);
      },
    }),
  };
}
