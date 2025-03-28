import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Error404 from "./pages/_404";
import Home from "./pages/dashboard/home";
import Post from "./pages/dashboard/post/Post";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/home" />} />

        <Route path="/dashboard" element={<Home />}>
          <Route path="home" element={<Home />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}