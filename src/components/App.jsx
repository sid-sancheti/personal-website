import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";
import Fish from "../pages/Fish.jsx";
import Blogs from "../pages/Blogs.jsx";
import About from "../pages/About.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="fish" element={<Fish />} />
              <Route path="about" element={<About />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="music" element={<Music />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
