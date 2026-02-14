import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { PropertyMatcherChat } from "@/components/property-matcher/PropertyMatcherChat";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import Sales from "./pages/Sales";
import Lettings from "./pages/Lettings";
import MapSearch from "./pages/MapSearch";
import PropertyDetail from "./pages/PropertyDetail";
import Valuation from "./pages/Valuation";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Areas from "./pages/Areas";
import AreaGuide from "./pages/AreaGuide";
import Sell from "./pages/Sell";
import Landlords from "./pages/Landlords";
import Tenants from "./pages/Tenants";
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

// Additional public pages
import NewHomes from "./pages/NewHomes";
import DevelopmentDetail from "./pages/DevelopmentDetail";
import ShowcaseIndex from "./pages/ShowcaseIndex";
import ShowcaseDetail from "./pages/ShowcaseDetail";
import PropertyManagement from "./pages/PropertyManagement";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Scroll to top on route change */}
          <ScrollToTop />
          {/* Premium scroll progress indicator */}
          <ScrollProgress />
          
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/lettings" element={<Lettings />} />
            <Route path="/map-search" element={<MapSearch />} />
            <Route path="/property/:slug" element={<PropertyDetail />} />
            <Route path="/valuation" element={<Valuation />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/areas/:slug" element={<AreaGuide />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/landlords" element={<Landlords />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/new-homes" element={<NewHomes />} />
            <Route path="/new-homes/:slug" element={<DevelopmentDetail />} />
            <Route path="/showcase" element={<ShowcaseIndex />} />
            <Route path="/showcase/:slug" element={<ShowcaseDetail />} />
            <Route path="/property-management" element={<PropertyManagement />} />
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
          
          {/* AI Property Matcher Chat Widget - available on public pages */}
          <PropertyMatcherChat />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
