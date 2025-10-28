import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import WebResult1 from "./pages/WebResult1";
import WebResult2 from "./pages/WebResult2";
import WebResult3 from "./pages/WebResult3";
import WebResult4 from "./pages/WebResult4";
import WebResult5 from "./pages/WebResult5";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/webresult1" element={<WebResult1 />} />
          <Route path="/webresult2" element={<WebResult2 />} />
          <Route path="/webresult3" element={<WebResult3 />} />
          <Route path="/webresult4" element={<WebResult4 />} />
          <Route path="/webresult5" element={<WebResult5 />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
