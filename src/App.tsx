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
import { Work } from "./pages/Work";


// Dynamic Template
import { ProjectTemplate } from "./pages/projects/ProjectTemplate";

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

        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/personal" element={<PageTransition><Personal /></PageTransition>} />
        
        {/* Dynamic CMS Route */}
        <Route path="/project/:slug" element={<PageTransition><ProjectTemplate /></PageTransition>} />
        
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
