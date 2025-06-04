import Layout from "@/pages/layout";
import SecondaryPanel from "../explore/SecondaryPanel";
import Tabs from "@/shared/components/Tabs";
import { useScreen } from "@/shared/hooks/useScreen";
import { useEffect } from "react";

export default function Home() {
  const { setScreen } = useScreen();
  useEffect(() => {
    setScreen("home");
  }, []);

  return (
    <Layout
      main={
        <div className="flex-1 mx-auto w-full">
          <Tabs />
        </div>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
