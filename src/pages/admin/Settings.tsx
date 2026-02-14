import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Building, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "profile" && (
          <div className="bg-card border border-border rounded-sm p-6 max-w-2xl">
            <h2 className="font-serif text-lg text-foreground mb-6">Your Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-secondary border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                  <Input className="bg-secondary border-border" placeholder="John" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                  <Input className="bg-secondary border-border" placeholder="Smith" />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Role</label>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs px-3 py-1 rounded-full",
                    isAdmin ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                  )}>
                    {isAdmin ? "Admin" : "Agent"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "company" && (
          <div className="bg-card border border-border rounded-sm p-6 max-w-2xl">
            <h2 className="font-serif text-lg text-foreground mb-6">Company Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Company Name</label>
                <Input
                  defaultValue="Dales & Peaks"
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
                <Input
                  defaultValue="01246 567 540"
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <Input
                  defaultValue="info@dalesandpeaks.co.uk"
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Address</label>
                <Textarea
                  defaultValue="25 Glumangate, Chesterfield, S40 1UA"
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-card border border-border rounded-sm p-6 max-w-2xl">
            <h2 className="font-serif text-lg text-foreground mb-6">Notification Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">New Lead Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a new lead is submitted
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">Valuation Requests</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone requests a valuation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of activity
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive tips and updates from Dales & Peaks
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
