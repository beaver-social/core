import { BrowserRouter, Route, Routes } from "react-router";
import Error404 from "./pages/_404";
import Home from "./pages/home";
import Post from "./pages/post";
import Notifications from "./pages/notifications";
import Messages from "./pages/messages";
import Message from "./pages/messages/message";
import Profile from "./pages/profile";
import GoogleOAuth from "./pages/oauth/GoogleOAuth";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth/google" element={<GoogleOAuth />} />
        <Route path="/alerts" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}