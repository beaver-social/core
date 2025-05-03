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
        username: "zanzibar",
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
}
