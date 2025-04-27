import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

const suiClient = new SuiClient({
  network: "testnet",
  url: getFullnodeUrl("testnet"),
});

const g = await suiClient.getObject({
  id: "0xd10e5667bb5c134e0ddc2df2c6decb605c4a50e4fb5bcf6d99fde98719eb9c94",
  options: {
    showContent: true,
  },
});

if (g.data?.content?.dataType === "moveObject") {
  console.log(JSON.stringify(g.data.content.fields, null, 2));
}
