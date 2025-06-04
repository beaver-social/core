import Layout from "@/pages/layout";
import SecondaryPanel from "../explore/SecondaryPanel";
import MessagesFeed from "./MessageFeed";
import PageTitle from "@/shared/components/PageTitle";
import { useScreen } from "@/shared/hooks/useScreen";
import { useEffect } from "react";

export default function Messages() {
  const { setScreen } = useScreen();
  useEffect(() => {
    setScreen("messages");
  }, []);

  return (
    <Layout
      main={
        <div>
          <div className="w-full">
            <MessagesFeed />
          </div>
        </div>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
