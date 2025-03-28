import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.tsx";
import "./tailwind.css";

import { useServerConfig } from "./shared/stores/global.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./shared/context/theme-provider.tsx";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <Router />
        </Providers>
      </QueryClientProvider>
    </StrictMode>
  );
}

function Providers(props: { children: React.ReactNode }) {
  const serverConfig = useServerConfig();

  if (!serverConfig.ready) return <></>;

  return <>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {props.children}
    </ThemeProvider>
  </>;
}

root.render(<App />);
