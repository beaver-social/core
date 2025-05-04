import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Error404 from "./pages/_404";
import Home from "./pages/home";
import Post from "./pages/post";
import Notifications from "./pages/alerts";
import Messages from "./pages/messages";
import Message from "./pages/messages/message";
import Profile from "./pages/profile";
import GoogleOAuth from "./pages/oauth/GoogleOAuth";
import { PageErrorBoundary } from "./shared/lib/errorHandling";
import Swipes from "./pages/swipes";
import Settings from "./pages/settings";
import SearchResults from "./pages/explore/SearchResults";
import Demo from "./pages/demo";
import Onboarding from "./pages/onboarding";
import Create from "./pages/create";
// import { useAuth } from "@beaver/react";

import { useEffect } from "react";
import Landing from "./pages/landing";
// Wrap each page component with PageErrorBoundary
const withPageErrorBoundary =
  (Component: React.ComponentType<any>) => (props: any) =>
  (
    <PageErrorBoundary>
      <Component {...props} />
    </PageErrorBoundary>
  );

function OnboardingProtection({ children }: { children: React.ReactNode }) {
  const { userId, isConnected } = {} as any;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isConnected && !userId) {
  //     navigate("/onboarding");
  //   }
  // }, [userId, isConnected]);

  return children;
}

function LoadingAuth({ children }: { children: React.ReactNode }) {
  const { isLoading } = {} as any;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return children;
}

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/onboarding"
          element={withPageErrorBoundary(Onboarding)({})}
        />
        <Route
          path="/oauth/google"
          element={withPageErrorBoundary(GoogleOAuth)({})}
        />
        <Route
          path="/*"
          element={
            <LoadingAuth>
              <OnboardingProtection>
                <Routes>
                  <Route path="/" element={withPageErrorBoundary(Home)({})} />
                  <Route
                    path="/alerts"
                    element={withPageErrorBoundary(Notifications)({})}
                  />
                  <Route
                    path="/messages"
                    element={withPageErrorBoundary(Messages)({})}
                  />
                  <Route
                    path="/message/:id"
                    element={withPageErrorBoundary(Message)({})}
                  />
                  <Route
                    path="post/:id"
                    element={withPageErrorBoundary(Post)({})}
                  />
                  <Route
                    path="/profile/:id"
                    element={withPageErrorBoundary(Profile)({})}
                  />
                  <Route
                    path="/shorts"
                    element={withPageErrorBoundary(Swipes)({})}
                  />
                  <Route
                    path="/settings"
                    element={withPageErrorBoundary(Settings)({})}
                  />
                  <Route
                    path="/explore/search"
                    element={withPageErrorBoundary(SearchResults)({})}
                  />
                  <Route
                    path="/demo"
                    element={withPageErrorBoundary(Demo)({})}
                  />
                  <Route
                    path="*"
                    element={withPageErrorBoundary(Error404)({})}
                  />
                </Routes>
              </OnboardingProtection>
            </LoadingAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
