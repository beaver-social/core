import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import Error404 from "./pages/_404";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}