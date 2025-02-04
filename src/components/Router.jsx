import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import "../styles/nav.css"

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
    </Router>
  );
};

export default AppRouter;
