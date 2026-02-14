import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

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

// Admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Properties from "./pages/admin/Properties";
import PropertyEdit from "./pages/admin/PropertyEdit";
import Leads from "./pages/admin/Leads";
import TeamMembers from "./pages/admin/TeamMembers";
import Testimonials from "./pages/admin/Testimonials";
import AdminAreaGuides from "./pages/admin/AreaGuides";
import Settings from "./pages/admin/Settings";
import Marketing from "./pages/admin/Marketing";
import AdminShowcase from "./pages/admin/Showcase";
import AdminDevelopments from "./pages/admin/Developments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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

            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:id" element={<PropertyEdit />} />
              <Route path="leads" element={<Leads />} />
              <Route path="team" element={<TeamMembers />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="areas" element={<AdminAreaGuides />} />
              <Route path="settings" element={<Settings />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="showcase" element={<AdminShowcase />} />
              <Route path="developments" element={<AdminDevelopments />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
