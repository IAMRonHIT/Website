import { ThemeProvider } from "@/components/ThemeProvider";
import { NetworkLines } from "@/components/NetworkLines";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { HowItWorksPage } from "@/pages/HowItWorksPage";
import { StrategyPage } from "@/pages/StrategyPage";
import { BlogPage } from "@/pages/BlogPage";
import { ContactPage } from "@/pages/ContactPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-foreground relative overflow-x-hidden" style={{ zIndex: 0 }}>
        <NetworkLines />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;