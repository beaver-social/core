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
import AppId from "./pages/dev/AppId";

// Wrap each page component with PageErrorBoundary
const withPageErrorBoundary =
  (Component: React.ComponentType<any>) => (props: any) => (
    <PageErrorBoundary>
      <Component {...props} />
    </PageErrorBoundary>
  );

function OnboardingProtection({ children }: { children: React.ReactNode }) {
  const beaver = useBeaver();
  const navigate = useNavigate();
  const { mutate: login, isSuccess, isPending } = useLogin();

  if (beaver.wallet.isConnected && !beaver.wallet.hasIdentity) {
    navigate("/onboarding");
  }

  useEffect(() => {
    if (
      beaver.wallet.isConnected &&
      beaver.wallet.hasIdentity &&
      !beaver.user
    ) {
      login();
    }

    if (beaver.wallet.isAuthenticated) {
      navigate("/app");
    }
  }, [beaver.wallet.isConnected, beaver.wallet.hasIdentity, beaver.user, beaver.wallet.isAuthenticated]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icon name="LoaderCircle" className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      {!isPending && isSuccess && <WelcomeSplash />}
      {children}
    </div>
  );
}

function NotLoggedInProtection({ children }: { children: React.ReactNode }) {
  const beaver = useBeaver();

  return (
    <div>
      {!beaver.user && <NotLoggedInDialog />}
      {children}
    </div>
  );
}

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <OnboardingProtection>
              <Routes>
                <Route path="/" element={withPageErrorBoundary(Landing)({})} />

                <Route
                  path="/dev/appid"
                  element={withPageErrorBoundary(AppId)({})}
                />

                <Route
                  path="/onboarding"
                  element={withPageErrorBoundary(Onboarding)({})}
                />

                <Route
                  path="/docs/*"
                  element={withPageErrorBoundary(Docs)({})}
                />

                <Route path="/app" element={withPageErrorBoundary(Home)({})} />
                <Route
                  path="/app/*"
                  element={
                    <NotLoggedInProtection>
                      <Routes>
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
                          path="/post/:id"
                          element={withPageErrorBoundary(Post)({})}
                        />
                        <Route
                          path="/profile/:username"
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
                      </Routes>
                    </NotLoggedInProtection>
                  }
                />
              </Routes>
            </OnboardingProtection>
          }
        />

        <Route path="/demo" element={withPageErrorBoundary(Demo)({})} />

        <Route path="*" element={withPageErrorBoundary(Error404)({})} />
      </Routes>
    </BrowserRouter>
  );
}
