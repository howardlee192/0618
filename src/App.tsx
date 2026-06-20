import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Layout } from "./components/layout/Layout";
import { HomeTransition, PageTransition } from "./components/ui/PageTransitions";

// Pages
import { Home } from "./pages/Home";
// import { Work } from "./pages/Work";
import { Personal } from "./pages/Personal";
import { About } from "./pages/About";
import { ComingSoon } from "./pages/ComingSoon";

// Projects
import { ProjectUnsorted } from "./pages/projects/ProjectUnsorted";
import { ProjectFrameByFrame } from "./pages/projects/ProjectFrameByFrame";
import { ProjectWhoDecides } from "./pages/projects/ProjectWhoDecides";
import { ProjectBamboo } from "./pages/projects/ProjectBamboo";
import { ProjectYen } from "./pages/projects/ProjectYen";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeTransition><Home /></HomeTransition>} />
        {/* <Route path="/work" element={<PageTransition><Work /></PageTransition>} /> */}
        <Route path="/work" element={<PageTransition><ComingSoon /></PageTransition>} />
        <Route path="/personal" element={<PageTransition><Personal /></PageTransition>} />
        <Route path="/personal/unsorted" element={<PageTransition><ProjectUnsorted /></PageTransition>} />
        <Route path="/personal/frame-by-frame" element={<PageTransition><ProjectFrameByFrame /></PageTransition>} />
        <Route path="/personal/who-decides" element={<PageTransition><ProjectWhoDecides /></PageTransition>} />
        <Route path="/personal/bamboo-theatre" element={<PageTransition><ProjectBamboo /></PageTransition>} />
        <Route path="/personal/thesis-sketching" element={<PageTransition><ProjectYen /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
