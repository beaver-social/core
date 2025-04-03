import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.tsx";
import "./tailwind.css";
import "@mysten/dapp-kit/dist/index.css";

import { useServerConfig } from "./shared/stores/global.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./shared/context/theme-provider.tsx";
import { Web3Provider } from "./shared/context/web3context.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Providers>
          <Router />
          <Toaster />
        </Providers>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Providers(props: { children: React.ReactNode }) {
  const serverConfig = useServerConfig();

  if (!serverConfig.ready) return <></>;

  return <>
    <Web3Provider>
      {props.children}
    </Web3Provider>
  </>;
}

root.render(<App />);
