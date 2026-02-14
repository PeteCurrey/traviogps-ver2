import { useState } from "react";
import { Link, useLocation, Navigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  Users,
  MessageSquare,
  FileText,
  MapPin,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Megaphone,
  Play,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { DalesAndPeaksLogo } from "@/components/layout/DalesAndPeaksLogo";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Home },
  { label: "Showcase", href: "/admin/showcase", icon: Play },
  { label: "Developments", href: "/admin/developments", icon: Building2 },
  { label: "Leads", href: "/admin/leads", icon: MessageSquare },
  { label: "Marketing", href: "/admin/marketing", icon: Megaphone },
  {
    label: "Content",
    icon: FileText,
    children: [
      { label: "Area Guides", href: "/admin/areas", icon: MapPin },
      { label: "Team Members", href: "/admin/team", icon: Users },
      { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    ],
  },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const { user, isLoading, isStaff, signOut } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <h1 className="font-serif text-2xl text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access the admin area.
          </p>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/admin" className="flex items-center gap-3">
              <DalesAndPeaksLogo size="sm" />
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
                          "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdown === item.label && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-4 mt-1 space-y-1"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  to={child.href}
                                  onClick={() => setIsSidebarOpen(false)}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors",
                                    isActive(child.href)
                                      ? "bg-accent text-accent-foreground"
                                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                  )}
                                >
                                  <child.icon className="h-4 w-4" />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href!}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
                        isActive(item.href!)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-sm font-medium">
                  {user.email?.[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              onClick={signOut}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-foreground hover:bg-secondary rounded-sm"
            >
              <Menu className="h-5 w-5" />
            </button>
            <DalesAndPeaksLogo size="sm" />
            <div className="w-9" /> {/* Spacer */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
