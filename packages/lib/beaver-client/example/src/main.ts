import "./style.css";
import { BeaverClient } from "../../exports.ts";

const beaver = new BeaverClient({
  apiBaseUrl: "http://localhost:9090/api/v1",
  debug: true,
});
beaver.initialize();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <button id="wallets" type="button">Show All Wallets</button>
    <button id="connect" type="button">Connect</button>
    <button id="disconnect" type="button">DisConnect</button>
  </div>
`;

const walletsButton = document.querySelector<HTMLButtonElement>("#wallets")!;
walletsButton.addEventListener("click", async () => {
  const wallets = beaver.connector.getWallets();
  console.log("Available wallets:", wallets);
});

const connectButton = document.querySelector<HTMLButtonElement>("#connect")!;
connectButton.addEventListener("click", async () => {
  const connection = await beaver.connector.connect("wallet", 0);

  console.log("Connected to wallet:", connection);
});

const disconnectButton =
  document.querySelector<HTMLButtonElement>("#disconnect")!;
disconnectButton.addEventListener("click", async () => {
  const disconnect = await beaver.connector.disconnect();
  console.log("Disconnected from wallet:", disconnect);
});
