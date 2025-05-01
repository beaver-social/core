import "./style.css";
import { BeaverClient } from "../../exports.ts";

const beaver = new BeaverClient({
  apiBaseUrl: "http://localhost:9090/api/v1",
  debug: true,
  zkLoginWallets: {
    enabled: true,
  },
});
beaver.onReady = render;

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

  beaver.connector.onConnected = () => render();
  beaver.connector.onDisconnected = () => render();

  const address = beaver.connector.address;
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

  const newUserButton = document.createElement("button");
  newUserButton.innerText = "Register";
  newUserButton.onclick = async () => {
    const response = await beaver.user.register({
      username: "zkaccount",
      fullName: "Will LFG",
      about: "This is a bio",
    });
    console.log(response);
  };
  container.appendChild(newUserButton);

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
