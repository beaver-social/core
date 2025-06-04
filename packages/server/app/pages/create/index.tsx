import Layout from "@/pages/layout";
import SecondaryPanel from "../explore/SecondaryPanel";
import { useScreen } from "@/shared/hooks/useScreen";
import { useEffect } from "react";
import CreatePage from "./CreatePage";

export default function Home() {
  const { setScreen } = useScreen();
  useEffect(() => {
    setScreen("create");
  }, []);

  return (
    <Layout
      main={
        <div>
          <div className="flex-1 mx-auto w-full">
            <CreatePage />
          </div>
        </div>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
