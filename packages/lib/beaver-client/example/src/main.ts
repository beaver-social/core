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
  gap();

  const postInput = document.createElement("input");
  postInput.placeholder = "Post content";
  container.appendChild(postInput);

  const postButton = document.createElement("button");
  postButton.innerText = "Post";
  postButton.onclick = async () => {
    const response = await beaver.posts.upload({
      content: postInput.value,
      media: [],
    });
    console.log(response);
  };
  container.appendChild(postButton);

  const getProfileButton = document.createElement("button");
  getProfileButton.innerText = "Get Profile";
  getProfileButton.onclick = async () => {
    const response = await beaver.user.getProfile();
    console.log(response);
  };
  container.appendChild(getProfileButton);

  const getFollowers = document.createElement("button");
  getFollowers.innerText = "Get Followers";
  getFollowers.onclick = async () => {
    const response = await beaver.user.getFollowers({
      userId: 3,
    });
    console.log(response);
  };
  container.appendChild(getFollowers);

  const getFollowing = document.createElement("button");
  getFollowing.innerText = "Get Following";
  getFollowing.onclick = async () => {
    const response = await beaver.user.getFollowing({
      userId: 3,
    });
    console.log(response);
  };
  container.appendChild(getFollowing);

  const followInput = document.createElement("input");
  followInput.placeholder = "Follow which user";
  container.appendChild(followInput);

  const followButton = document.createElement("button");
  followButton.innerText = "Follow";
  followButton.onclick = async () => {
    const response = await beaver.user.followUser({
      followingId: Number(followInput.value),
    });
    console.log(response);
  };
  container.appendChild(followButton);

  const unfollowInput = document.createElement("input");
  unfollowInput.placeholder = "unFollow which user";
  container.appendChild(unfollowInput);

  const unfollowButton = document.createElement("button");
  unfollowButton.innerText = "Follow";
  unfollowButton.onclick = async () => {
    const response = await beaver.user.unfollowUser({
      followingId: Number(unfollowInput.value),
    });
    console.log(response);
  };
  container.appendChild(unfollowButton);

  gap();

  const userId = document.createElement("input");
  userId.placeholder = "User id";
  container.appendChild(userId);

  const getUserById = document.createElement("button");
  getUserById.innerText = "getby id";
  getUserById.onclick = async () => {
    const response = await beaver.user.getUserById({
      id: Number(userId.value),
    });
    console.log(response);
  };
  container.appendChild(getUserById);
}
