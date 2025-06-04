import { useEffect } from "react";
import Layout from "../layout";
import SecondaryPanel from "../explore/SecondaryPanel";
import { useScreen } from "@/shared/hooks/useScreen";
import SwipeFeed from "./SwipeFeed";
import ShortsErrorBoundary from "./SwipeErrorBoundary";

export default function Swipes() {
  const { setScreen } = useScreen();
  useEffect(() => {
    setScreen("swipes");
  }, []);

  return (
    <Layout
      main={
        <div className="h-[calc(100vh-60px)] max-h-screen mb-10">
          <ShortsErrorBoundary>
            <SwipeFeed />
          </ShortsErrorBoundary>
        </div>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
