"use client"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Offerings from "./pages/Offerings";
import RD from "./pages/RD";
import Demo from "./pages/Demo";
import ESGCalculator from "./pages/ESGCalculator";

/* 👇 ADD THIS */
const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -90; // navbar height
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        // Retry (important when page just loaded)
        const interval = setInterval(() => {
          if (scrollToElement()) {
            clearInterval(interval);
          }
        }, 100);

        setTimeout(() => clearInterval(interval), 2000);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollManager /> {/* 👈 ADD HERE */}
      <div className="page-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/rd" element={<RD />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/esg-calculator" element={<ESGCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;