import Layout from "@/pages/layout";
import SecondaryPanel from "../explore/SecondaryPanel";
import PageTitle from "@/shared/components/PageTitle";
import Tabs from "@/shared/components/Tabs";
import { useScreen } from "@/shared/hooks/useScreen";
import { useEffect } from "react";

export default function Notifications() {
  const { setScreen } = useScreen();
  useEffect(() => {
    setScreen("alerts");
  }, []);

  return (
    <Layout
      main={
        <div>
          <div className="w-full flex-1 border mx-auto">
            <Tabs />
          </div>
        </div>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
