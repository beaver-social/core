import { Outlet } from "react-router";
import Tabs from "../shared/components/Tabs";
import Header from "../shared/components/Header";
import { cn } from "../shared/utils/utils";
import { useEffect } from "react";
import { setAuthToken } from "../shared/utils/apiClient";
import { Toaster } from "sonner";

export default function () {
  // useEffect(() => {
  //   if (ready && authenticated) {
  //     getAccessToken().then((token) => {
  //       token && setAuthToken(token);
  //     });
  //   }
  // }, [ready, authenticated]);

  return (
    <main className="h-screen flex flex-col relative">
      <Header />

      <div
        className={cn(
          "flex-1 overflow-y-scroll pb-[10vh] duration-300",
          !true && "opacity-0 scale-50 saturate-0"
        )}
      >
        <Outlet />
      </div>

      <Tabs />

      <Toaster richColors mobileOffset={{ bottom: 64 }} />
    </main>
  );
}
