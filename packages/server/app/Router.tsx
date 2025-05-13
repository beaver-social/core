import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router";
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
import { useBeaver, useLogin } from "@beaver/react";
import { useEffect, useState } from "react";
import WelcomeSplash from "./shared/components/animations/WelcomeSplash";

// Wrap each page component with PageErrorBoundary
const withPageErrorBoundary =
  (Component: React.ComponentType<any>) => (props: any) =>
  (
    <PageErrorBoundary>
      <Component {...props} />
    </PageErrorBoundary>
  );


function OnboardingProtection({ children }: { children: React.ReactNode }) {
  const beaver = useBeaver();
  const navigate = useNavigate();
  const { mutate: login, isSuccess } = useLogin();

  if (beaver.wallet.isConnected && !beaver.wallet.hasIdentity) {
    navigate("/onboarding");
  }

  useEffect(() => {
    if (beaver.wallet.isConnected && beaver.wallet.hasIdentity && !beaver.user) {
      login();
    }
  }, [beaver.wallet.isConnected, beaver.wallet.hasIdentity, beaver.user])

  return (
    <div className="relative">
      {isSuccess && <WelcomeSplash />}
      {children}
    </div>
  )
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
          path="/*"
          element={
            <LoadingAuth>
              <OnboardingProtection>
                <Routes>
                  <Route path="/" element={withPageErrorBoundary(Home)({})} />
                  <Route
                    path="/onboarding"
                    element={withPageErrorBoundary(Onboarding)({})}
                  />
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
                    path="/create"
                    element={withPageErrorBoundary(Create)({})}
                  />
                  <Route
                    path="/swipes"
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
