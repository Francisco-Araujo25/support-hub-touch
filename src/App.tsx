import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Solution from "./pages/Solution";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import { VirtualAssistant } from "./components/VirtualAssistant";
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/700.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:categoryId" element={<Category />} />
            <Route path="/categoria/:categoryId/problema/:problemId" element={<Solution />} />
            <Route path="/feedback/:categoryId/:problemId" element={<Feedback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <VirtualAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
