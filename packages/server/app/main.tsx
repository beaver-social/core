import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.tsx";
import "./tailwind.css";
import "@mysten/dapp-kit/dist/index.css";
import "./global.css";

import { useServerConfig } from "./shared/stores/global.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./shared/context/theme-provider.tsx";
import { Web3Provider } from "./shared/context/web3context.tsx";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./shared/lib/errorHandling.ts";
// import { BeaverProvider } from "@beaver/react";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Web3Provider>
              <Providers>
                {/* <BeaverProvider config={{
                  debug: true,
                  network: "devnet",
                  apiBaseUrl: "http://localhost:5173/api/v1",
                }}> */}
                <Router />
                <Toaster />
                {/* </BeaverProvider> */}
              </Providers>
            </Web3Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

function Providers(props: { children: React.ReactNode }) {
  const serverConfig = useServerConfig();

  if (!serverConfig.ready) return <></>;

  return <>
    {props.children}
  </>;
}

root.render(<App />);
