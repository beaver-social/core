import { BrowserRouter, Route, Routes } from "react-router";
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

// Wrap each page component with PageErrorBoundary
const withPageErrorBoundary = (Component: React.ComponentType<any>) => (props: any) => (
  <PageErrorBoundary>
    <Component {...props} />
  </PageErrorBoundary>
);

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={withPageErrorBoundary(Home)({})} />
        <Route path="/oauth/google" element={withPageErrorBoundary(GoogleOAuth)({})} />
        <Route path="/alerts" element={withPageErrorBoundary(Notifications)({})} />
        <Route path="/messages" element={withPageErrorBoundary(Messages)({})} />
        <Route path="/message/:id" element={withPageErrorBoundary(Message)({})} />
        <Route path="post/:id" element={withPageErrorBoundary(Post)({})} />
        <Route path="/profile/:id" element={withPageErrorBoundary(Profile)({})} />
        <Route path="/shorts" element={withPageErrorBoundary(Shorts)({})} />
        <Route path="/settings" element={withPageErrorBoundary(Settings)({})} />
        <Route path="*" element={withPageErrorBoundary(Error404)({})} />
      </Routes>
    </BrowserRouter>
  );
}