import { BrowserRouter, Route, Routes } from "react-router";
import Error404 from "./pages/_404";
import Home from "./pages/dashboard/home";
import Post from "./pages/dashboard/post";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}