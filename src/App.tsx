import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Layout } from "./components/layout/Layout";
import { HomeTransition, PageTransition } from "./components/ui/PageTransitions";

// Pages
import { Home } from "./pages/Home";

import { Personal } from "./pages/Personal";
import { About } from "./pages/About";
import { ComingSoon } from "./pages/ComingSoon";

// Projects
import { ProjectUnsorted } from "./pages/projects/ProjectUnsorted";
import { ProjectFrameByFrame } from "./pages/projects/ProjectFrameByFrame";
import { ProjectWhoDecides } from "./pages/projects/ProjectWhoDecides";
import { ProjectBamboo } from "./pages/projects/ProjectBamboo";
import { ProjectYen } from "./pages/projects/ProjectYen";
import { ProjectEndowing } from "./pages/projects/ProjectEndowing";
import { ProjectCulture } from "./pages/projects/ProjectCulture";
import { ProjectGear } from "./pages/projects/ProjectGear";
import { ProjectHorse } from "./pages/projects/ProjectHorse";
import { ProjectDrawing } from "./pages/projects/ProjectDrawing";
import { ProjectEggplanet } from "./pages/projects/ProjectEggplanet";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeTransition><Home /></HomeTransition>} />

        <Route path="/work" element={<PageTransition><ComingSoon /></PageTransition>} />
        <Route path="/personal" element={<PageTransition><Personal /></PageTransition>} />
        <Route path="/personal/unsorted" element={<PageTransition><ProjectUnsorted /></PageTransition>} />
        <Route path="/personal/frame-by-frame" element={<PageTransition><ProjectFrameByFrame /></PageTransition>} />
        <Route path="/personal/who-decides" element={<PageTransition><ProjectWhoDecides /></PageTransition>} />
        <Route path="/personal/bamboo-theatre" element={<PageTransition><ProjectBamboo /></PageTransition>} />
        <Route path="/personal/thesis-sketching" element={<PageTransition><ProjectYen /></PageTransition>} />
        <Route path="/personal/endowing-objects" element={<PageTransition><ProjectEndowing /></PageTransition>} />
        <Route path="/personal/culture-identity-boundary" element={<PageTransition><ProjectCulture /></PageTransition>} />
        <Route path="/personal/digital-twin" element={<PageTransition><ProjectGear /></PageTransition>} />
        <Route path="/personal/happy-horse-year-2026" element={<PageTransition><ProjectHorse /></PageTransition>} />
        <Route path="/personal/life-drawing" element={<PageTransition><ProjectDrawing /></PageTransition>} />
        <Route path="/personal/egggy-planet" element={<PageTransition><ProjectEggplanet /></PageTransition>} />
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
