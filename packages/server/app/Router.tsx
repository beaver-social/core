import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Error404 from "./pages/_404";
import Home from "./pages/home";
import Post from "./pages/post";
import Notifications from "./pages/alerts";
import Messages from "./pages/messages";
import Message from "./pages/messages/message";
import Profile from "./pages/profile";
import { PageErrorBoundary } from "./shared/lib/errorHandling";
import Swipes from "./pages/swipes";
import Settings from "./pages/settings";
import SearchResults from "./pages/explore/SearchResults";
import Demo from "./pages/demo";
import Onboarding from "./pages/onboarding";
import Create from "./pages/create";
import { useBeaver, useLogin } from "@beaver/react";
import { useEffect } from "react";
import WelcomeSplash from "./shared/components/animations/WelcomeSplash";
import Icon from "./shared/components/Icon";
import NotLoggedInDialog from "./shared/components/NotLoggedInDialog";
import Landing from "./pages/landing";
import Docs from "./pages/docs";
import AppId from "./pages/onboarding/AppId";

// Wrap each page component with PageErrorBoundary
const withPageErrorBoundary =
  (Component: React.ComponentType<any>) => (props: any) => (
    <PageErrorBoundary>
      <Component {...props} />
    </PageErrorBoundary>
  );

// Protection for onboarding routes - handles wallet connection and identity creation
function OnboardingProtection({ children }: { children: React.ReactNode }) {
  const beaver = useBeaver();
  const navigate = useNavigate();

  useEffect(() => {
    // If wallet is connected and has identity, redirect to app
    if (beaver.wallet.isConnected && beaver.wallet.hasIdentity && beaver.user) {
      navigate("/app");
    }
  }, [beaver.wallet.isConnected, beaver.wallet.hasIdentity, beaver.user, navigate]);

  return <div>{children}</div>;
}

// Protection for app routes - requires user to be logged in
function AuthProtection({ children }: { children: React.ReactNode }) {
  const beaver = useBeaver();
  const navigate = useNavigate();
  const { mutate: login, isSuccess, isPending } = useLogin();

  useEffect(() => {
    // If wallet is connected but no identity, go to onboarding
    if (beaver.wallet.isConnected && !beaver.wallet.hasIdentity) {
      navigate("/onboarding");
      return;
    }

    // If wallet is connected with identity but no user, try to login
    if (beaver.wallet.isConnected && beaver.wallet.hasIdentity && !beaver.user) {
      login();
      return;
    }

    // If no wallet connection, redirect to landing
    if (!beaver.wallet.isConnected) {
      navigate("/");
      return;
    }
  }, [
    beaver.wallet.isConnected,
    beaver.wallet.hasIdentity,
    beaver.user,
    login,
    navigate,
  ]);

  // Show loading while logging in
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icon name="LoaderCircle" className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Show not logged in dialog if user is not authenticated
  if (!beaver.user) {
    return (
      <div>
        <NotLoggedInDialog />
        {children}
      </div>
    );
  }

  return (
    <div className="relative">
      {isSuccess && <WelcomeSplash />}
      {children}
    </div>
  );
}

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - no authentication required */}
        <Route path="/" element={withPageErrorBoundary(Landing)({})} />
        <Route path="/demo" element={withPageErrorBoundary(Demo)({})} />
        <Route path="/docs/*" element={withPageErrorBoundary(Docs)({})} />

        {/* Onboarding routes - special handling for wallet setup */}
        <Route
          path="/onboarding/*"
          element={
            <OnboardingProtection>
              <Routes>
                <Route index element={withPageErrorBoundary(Onboarding)({})} />
                <Route
                  path="appid"
                  element={withPageErrorBoundary(AppId)({})}
                />
              </Routes>
            </OnboardingProtection>
          }
        />

        {/* App routes - requires authentication */}
        <Route
          path="/app/*"
          element={
            <AuthProtection>
              <Routes>
                <Route index element={withPageErrorBoundary(Home)({})} />
                <Route
                  path="alerts"
                  element={withPageErrorBoundary(Notifications)({})}
                />
                <Route
                  path="messages"
                  element={withPageErrorBoundary(Messages)({})}
                />
                <Route
                  path="messages/:id"
                  element={withPageErrorBoundary(Message)({})}
                />
                <Route
                  path="post/:id"
                  element={withPageErrorBoundary(Post)({})}
                />
                <Route
                  path="profile/:username"
                  element={withPageErrorBoundary(Profile)({})}
                />
                <Route
                  path="create"
                  element={withPageErrorBoundary(Create)({})}
                />
                <Route
                  path="swipes"
                  element={withPageErrorBoundary(Swipes)({})}
                />
                <Route
                  path="settings"
                  element={withPageErrorBoundary(Settings)({})}
                />
                <Route
                  path="explore/search"
                  element={withPageErrorBoundary(SearchResults)({})}
                />
              </Routes>
            </AuthProtection>
          }
        />

        {/* 404 route */}
        <Route path="*" element={withPageErrorBoundary(Error404)({})} />
      </Routes>
    </BrowserRouter>
  );
}
