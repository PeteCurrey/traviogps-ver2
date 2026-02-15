import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import VehicleTracking from "./pages/VehicleTracking";
import DashCams from "./pages/DashCams";
import FleetManagement from "./pages/FleetManagement";
import Pricing from "./pages/Pricing";
import GetQuote from "./pages/GetQuote";
import BookDemo from "./pages/BookDemo";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Solutions from "./pages/solutions/Solutions";
import Construction from "./pages/solutions/Construction";
import Logistics from "./pages/solutions/Logistics";
import Delivery from "./pages/solutions/Delivery";
import FieldService from "./pages/solutions/FieldService";

// Admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import TeamMembers from "./pages/admin/TeamMembers";
import Testimonials from "./pages/admin/Testimonials";
import Settings from "./pages/admin/Settings";
import Marketing from "./pages/admin/Marketing";
import BlogAdmin from "./pages/admin/BlogAdmin";
import PageContentAdmin from "./pages/admin/PageContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/vehicle-tracking" element={<VehicleTracking />} />
            <Route path="/dash-cams" element={<DashCams />} />
            <Route path="/fleet-management" element={<FleetManagement />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/construction" element={<Construction />} />
            <Route path="/solutions/logistics" element={<Logistics />} />
            <Route path="/solutions/delivery" element={<Delivery />} />
            <Route path="/solutions/field-service" element={<FieldService />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="page-content" element={<PageContentAdmin />} />
              <Route path="leads" element={<Leads />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="team" element={<TeamMembers />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="settings" element={<Settings />} />
              <Route path="marketing" element={<Marketing />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
