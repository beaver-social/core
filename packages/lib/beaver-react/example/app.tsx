import { BeaverProvider } from "../src/context/beaver";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { BeaverClientConfig } from "../src/types";
import { useBeaverClient, usePost } from "../src/hooks";

export type Surface = {
    sign: Ed25519Keypair["sign"];
    signPersonalMessage: Ed25519Keypair["signPersonalMessage"];
    signTransaction: Ed25519Keypair["signTransaction"];
    signWithIntent: Ed25519Keypair["signWithIntent"];
};

const keypair = Ed25519Keypair.generate();

const surface: Surface = {
    sign: keypair.sign,
    signPersonalMessage: keypair.signPersonalMessage,
    signTransaction: keypair.signTransaction,
    signWithIntent: keypair.signWithIntent,
};

const config: BeaverClientConfig = {
    debug: true,
    network: "testnet",
    apiBaseUrl: "http://localhost:5173/api/v1",
};

function App() {
    return (
        <BeaverProvider surface={surface} config={config}>
            <>
                <BeaverClientStatus />
                <Post />
            </>
        </BeaverProvider>
    );
}

export default App;

function BeaverClientStatus() {
    const { client, isInitialized, isLoading, error } = useBeaverClient();

    return (
        <>
            <div>
                <h1>Beaver Client Status</h1>
                <p>Client: {client ? "Yes" : "No"}</p>
                <p>Is Initialized: {isInitialized ? "Yes" : "No"}</p>
                <p>Is Loading: {isLoading ? "Yes" : "No"}</p>
                <p>Error: {error ? error.message : "No error"}</p>
            </div>
        </>
    );
}

function Post() {
    const { post } = usePost();
    console.log(post);
    return <div>Post</div>;
}

