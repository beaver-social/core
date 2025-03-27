import { Outlet } from "react-router";
import Tabs from "../shared/components/Tabs";
import Header from "../shared/components/Header";
import { cn } from "../shared/utils/utils";
import { useEffect } from "react";
import { setAuthToken } from "../shared/utils/apiClient";
import { Toaster } from "sonner";

export default function () {
  return (
    <main className="h-screen flex flex-col relative">
      <Header />
    </main>
  );
}
