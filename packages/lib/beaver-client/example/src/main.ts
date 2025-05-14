import "./style.css";
import { BeaverClient } from "../../exports.ts";

const beaver = new BeaverClient({
  apiBaseUrl: "http://localhost:9090/api/v1",
  debug: true,
  zkLoginWallets: {
    enabled: true,
  },
});

beaver.on("beaver:ready", render);
beaver.on("user:login", render);
beaver.on("user:logout", render);
beaver.on("connection:change", render);
beaver.on("connection:disconnect", render);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div id="container">
</div>
`;

function render() {
  console.log("rendering");

  const container = document.querySelector<HTMLDivElement>("#container")!;
  container.innerHTML = "";

  function gap() {
    container.appendChild(document.createElement("br"));
  }

  function createSection(title: string) {
    gap();
    const heading = document.createElement("h3");
    heading.innerText = title;
    container.appendChild(heading);
    const section = document.createElement("div");
    section.style.marginBottom = "20px";
    section.style.padding = "10px";
    section.style.border = "1px solid #ddd";
    section.style.borderRadius = "5px";
    container.appendChild(section);
    return section;
  }

  const address = beaver.connector.address;
  const user = beaver.auth.user;
  const wallets = beaver.connector.getWallets(); //.concat([enoki.wallets.google]);

  if (address) {
    const addressButton = document.createElement("button");
    addressButton.innerText = `Connected: ${address}`;
    addressButton.onclick = async () => {
      await beaver.connector.disconnect();
    };
    container.appendChild(addressButton);
  } else {
    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];

      const walletButton = document.createElement("button");
      walletButton.innerText = wallet.name;
      walletButton.onclick = async () => {
        await beaver.connector.connect(i);
      };
      container.appendChild(walletButton);
    }
  }

  if (!address) return;
  gap();

  if (!user) {
    const newUserButton = document.createElement("button");
    newUserButton.innerText = "Register";
    newUserButton.onclick = async () => {
      await beaver.user.register({
        username: "riyariyariya",
        fullName: "fully island",
        about: "kya karna hai iska",
      });
    };
    container.appendChild(newUserButton);

    const loginButton = document.createElement("button");
    loginButton.innerText = "Login";
    loginButton.onclick = async () => {
      await beaver.user.login();
    };
    container.appendChild(loginButton);
  }

  if (!user) return;

  gap();

  const logoutButton = document.createElement("button");
  logoutButton.innerText = "Logout";
  logoutButton.onclick = async () => {
    await beaver.user.logout();
  };
  container.appendChild(logoutButton);

  const userSection = createSection("User Operations");

  const getProfileButton = document.createElement("button");
  getProfileButton.innerText = "Get Profile";
  getProfileButton.onclick = async () => {
    const response = await beaver.user.getProfile();
    console.log(response);
  };
  userSection.appendChild(getProfileButton);

  const getFollowers = document.createElement("button");
  getFollowers.innerText = "Get Followers";
  getFollowers.onclick = async () => {
    const response = await beaver.user.getFollowers({
      userId: 3,
    });
    console.log(response);
  };
  userSection.appendChild(getFollowers);

  const getFollowing = document.createElement("button");
  getFollowing.innerText = "Get Following";
  getFollowing.onclick = async () => {
    const response = await beaver.user.getFollowing({
      userId: 3,
    });
    console.log(response);
  };
  userSection.appendChild(getFollowing);

  gap();

  const followInput = document.createElement("input");
  followInput.placeholder = "Follow which user";
  userSection.appendChild(followInput);

  const followButton = document.createElement("button");
  followButton.innerText = "Follow";
  followButton.onclick = async () => {
    const response = await beaver.user.followUser({
      followingId: Number(followInput.value),
    });
    console.log(response);
  };
  userSection.appendChild(followButton);

  const unfollowInput = document.createElement("input");
  unfollowInput.placeholder = "unFollow which user";
  userSection.appendChild(unfollowInput);

  const unfollowButton = document.createElement("button");
  unfollowButton.innerText = "Unfollow";
  unfollowButton.onclick = async () => {
    const response = await beaver.user.unfollowUser({
      followingId: Number(unfollowInput.value),
    });
    console.log(response);
  };
  userSection.appendChild(unfollowButton);

  const getFollowCount = document.createElement("button");
  getFollowCount.innerText = "Get Follow Count";
  getFollowCount.onclick = async () => {
    const response = await beaver.user.getFollowCount({
      userId: Number(2),
    });
    console.log(response);
  };
  userSection.appendChild(getFollowCount);

  gap();

  const userIdInput = document.createElement("input");
  userIdInput.placeholder = "User id";
  userSection.appendChild(userIdInput);

  const getUserById = document.createElement("button");
  getUserById.innerText = "Get User by ID";
  getUserById.onclick = async () => {
    const response = await beaver.user.getUserById({
      id: Number(userIdInput.value),
    });
    console.log(response);
  };
  userSection.appendChild(getUserById);

  gap();

  // Pin operations
  const getPinnedButton = document.createElement("button");
  getPinnedButton.innerText = "Get Pinned Post";
  getPinnedButton.onclick = async () => {
    if (!userIdInput.value) {
      alert("Please enter a user ID");
      return;
    }
    const response = await beaver.user.getPinned({
      userId: Number(userIdInput.value),
    });
    console.log(response);
  };
  userSection.appendChild(getPinnedButton);

  const pinPostInput = document.createElement("input");
  pinPostInput.placeholder = "Post ID to pin";
  userSection.appendChild(pinPostInput);

  const pinButton = document.createElement("button");
  pinButton.innerText = "Pin Post";
  pinButton.onclick = async () => {
    if (!pinPostInput.value) {
      alert("Please enter a post ID to pin");
      return;
    }
    const response = await beaver.user.pinPost({
      postId: Number(pinPostInput.value),
    });
    console.log(response);
  };
  userSection.appendChild(pinButton);

  const unpinButton = document.createElement("button");
  unpinButton.innerText = "Unpin Post";
  unpinButton.onclick = async () => {
    if (!pinPostInput.value) {
      alert("Please enter a post ID to unpin");
      return;
    }
    const response = await beaver.user.unpinPost({
      postId: Number(pinPostInput.value),
    });
    console.log(response);
  };
  userSection.appendChild(unpinButton);

  const postsSection = createSection("Post Operations");

  const postInput = document.createElement("input");
  postInput.placeholder = "Post content";
  postsSection.appendChild(postInput);

  const postButton = document.createElement("button");
  postButton.innerText = "Create Post";
  postButton.onclick = async () => {
    const response = await beaver.posts.upload({
      content: postInput.value,
      media: [],
    });
    console.log(response);
  };
  postsSection.appendChild(postButton);

  gap();

  // Get Posts
  const getPostsButton = document.createElement("button");
  getPostsButton.innerText = "Get All Posts";
  getPostsButton.onclick = async () => {
    const response = await beaver.posts.getPosts();
    console.log(response);
  };
  postsSection.appendChild(getPostsButton);

  gap();

  // Post ID for operations
  const postIdInput = document.createElement("input");
  postIdInput.placeholder = "Post ID";
  postsSection.appendChild(postIdInput);

  // Get Post by ID
  const getPostButton = document.createElement("button");
  getPostButton.innerText = "Get Post by ID";
  getPostButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.getPostById(Number(postIdInput.value));
    console.log(response);
  };
  postsSection.appendChild(getPostButton);

  gap();

  // Like/Unlike
  const likeButton = document.createElement("button");
  likeButton.innerText = "Like Post";
  likeButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.likePost({
      postId: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(likeButton);

  const unlikeButton = document.createElement("button");
  unlikeButton.innerText = "Unlike Post";
  unlikeButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.unlikePost({
      postId: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(unlikeButton);

  gap();

  // Bookmark/Unbookmark
  const bookmarkButton = document.createElement("button");
  bookmarkButton.innerText = "Bookmark Post";
  bookmarkButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.bookmarkPost({
      postId: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(bookmarkButton);

  const unbookmarkButton = document.createElement("button");
  unbookmarkButton.innerText = "Unbookmark Post";
  unbookmarkButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.unbookmarkPost({
      postId: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(unbookmarkButton);

  gap();

  // Get post interactions
  const getLikesButton = document.createElement("button");
  getLikesButton.innerText = "Get Post Likes";
  getLikesButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.getPostLikes({
      id: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(getLikesButton);

  const getRepliesButton = document.createElement("button");
  getRepliesButton.innerText = "Get Post Replies";
  getRepliesButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.getPostReplies({
      id: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(getRepliesButton);

  const getRepostsButton = document.createElement("button");
  getRepostsButton.innerText = "Get Post Reposts";
  getRepostsButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.getPostReposts({
      id: Number(postIdInput.value),
    });
    console.log(response);
  };
  postsSection.appendChild(getRepostsButton);

  const getQuotesButton = document.createElement("button");
  getQuotesButton.innerText = "Get Quotes";
  getQuotesButton.onclick = async () => {
    if (!postIdInput.value) {
      alert("Please enter a post ID");
      return;
    }
    const response = await beaver.posts.getPostReposts({
      id: Number(postIdInput.value),
      quotesOnly: true,
    });
    console.log(response);
  };
  postsSection.appendChild(getQuotesButton);
}
