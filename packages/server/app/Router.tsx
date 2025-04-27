import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router";
import Error404 from "./pages/_404";
import Home from "./pages/home";
import Post from "./pages/post";
import Notifications from "./pages/alerts";
import Messages from "./pages/messages";
import Message from "./pages/messages/message";
import Profile from "./pages/profile";
import GoogleOAuth from "./pages/oauth/GoogleOAuth";
import { PageErrorBoundary } from "./shared/lib/errorHandling";
import Shorts from "./pages/shorts";
import Settings from "./pages/settings";
import SearchResults from "./pages/explore/SearchResults";
import Demo from "./pages/demo";
import Onboarding from "./pages/onboarding";
import { useGlobalUIStore } from "./shared/stores/zustand";
import { useEffect } from "react";
import useAuth from "../../lib/beaver-react/src/hooks/useAuth";

// Wrap each page component with PageErrorBoundary
const withPageErrorBoundary = (Component: React.ComponentType<any>) => (props: any) => (
  <PageErrorBoundary>
    <Component {...props} />
  </PageErrorBoundary>
);

// Route protection for checking onboarding status
function OnboardingProtection({ children }: { children: React.ReactNode }) {
  // redirect to onboarding if user is logged in but onboarding is not complete
  const { onboardingProgress } = useGlobalUIStore();
  const { user } = useAuth();
  const location = useLocation();

  // If we have a logged in user and there's onboarding progress that's not complete
  if (user && onboardingProgress &&
    (!onboardingProgress.completed.includes(5) ||
      onboardingProgress.completed.length < 5)) {
    // Don't redirect if we're already at the onboarding page or OAuth page
    if (location.pathname !== "/onboarding" && !location.pathname.includes("/oauth")) {
      return <Navigate to="/onboarding" replace />;
    }
  }

  // Otherwise, render the requested route
  return <>{children}</>;
}

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={withPageErrorBoundary(Onboarding)({})} />
        <Route path="/oauth/google" element={withPageErrorBoundary(GoogleOAuth)({})} />
        <Route path="/*" element={
          <OnboardingProtection>
            <Routes>
              <Route path="/" element={withPageErrorBoundary(Home)({})} />
              <Route path="/alerts" element={withPageErrorBoundary(Notifications)({})} />
              <Route path="/messages" element={withPageErrorBoundary(Messages)({})} />
              <Route path="/message/:id" element={withPageErrorBoundary(Message)({})} />
              <Route path="post/:id" element={withPageErrorBoundary(Post)({})} />
              <Route path="/profile/:id" element={withPageErrorBoundary(Profile)({})} />
              <Route path="/shorts" element={withPageErrorBoundary(Shorts)({})} />
              <Route path="/settings" element={withPageErrorBoundary(Settings)({})} />
              <Route path="/explore/search" element={withPageErrorBoundary(SearchResults)({})} />
              <Route path="/demo" element={withPageErrorBoundary(Demo)({})} />
              <Route path="*" element={withPageErrorBoundary(Error404)({})} />
            </Routes>
          </OnboardingProtection>
        } />
      </Routes>
    </BrowserRouter>
  );
}