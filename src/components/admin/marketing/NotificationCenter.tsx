import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Check, 
  CheckCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  Settings,
  Filter,
  Trash2,
  Plus,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'competitor_change': return Users;
    case 'market_trend': return TrendingUp;
    case 'seo_alert': return AlertTriangle;
    case 'content_ready': return FileText;
    default: return Bell;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'destructive';
    case 'high': return 'default';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

export function NotificationCenter() {
  const [filter, setFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    notification_type: "system" as "competitor_change" | "market_trend" | "seo_alert" | "content_ready" | "system",
    priority: "medium" as "low" | "medium" | "high" | "urgent"
  });
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['marketing-notifications', filter],
    queryFn: async () => {
      let query = supabase
        .from('marketing_notifications')
        .select('*')
        .eq('is_dismissed', false)
        .order('created_at', { ascending: false });
      
      if (filter === 'unread') {
        query = query.eq('is_read', false);
      } else if (filter !== 'all') {
        query = query.eq('notification_type', filter as "competitor_change" | "content_ready" | "market_trend" | "seo_alert" | "system");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Add notification mutation
  const addNotification = useMutation({
    mutationFn: async (notification: typeof newNotification) => {
      const { error } = await supabase
        .from('marketing_notifications')
        .insert([notification]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
      setIsAddOpen(false);
      setNewNotification({
        title: "",
        message: "",
        notification_type: "system",
        priority: "medium"
      });
      toast.success("Notification created");
    },
    onError: () => {
      toast.error("Failed to create notification");
    }
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('marketing_notifications')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
    }
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('marketing_notifications')
        .update({ is_read: true })
        .eq('is_read', false);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
      toast.success("All notifications marked as read");
    }
  });

  const dismissNotification = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('marketing_notifications')
        .update({ is_dismissed: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-notifications'] });
      toast.success("Notification dismissed");
    }
  });

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/20 rounded-xl">
            <Bell className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notification Center</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="competitor_change">Competitor Alerts</SelectItem>
              <SelectItem value="market_trend">Market Trends</SelectItem>
              <SelectItem value="seo_alert">SEO Alerts</SelectItem>
              <SelectItem value="content_ready">Content Ready</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Notification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    placeholder="Notification title..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea 
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    placeholder="Notification message..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={newNotification.notification_type} 
                      onValueChange={(v) => setNewNotification({ 
                        ...newNotification, 
                        notification_type: v as typeof newNotification.notification_type 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="competitor_change">Competitor Alert</SelectItem>
                        <SelectItem value="market_trend">Market Trend</SelectItem>
                        <SelectItem value="seo_alert">SEO Alert</SelectItem>
                        <SelectItem value="content_ready">Content Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select 
                      value={newNotification.priority} 
                      onValueChange={(v) => setNewNotification({ 
                        ...newNotification, 
                        priority: v as typeof newNotification.priority 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={() => addNotification.mutate(newNotification)}
                  disabled={!newNotification.title || !newNotification.message || addNotification.isPending}
                  className="w-full"
                >
                  {addNotification.isPending ? "Creating..." : "Create Notification"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {isLoading ? (
          <Card className="bg-card border-border">
            <CardContent className="p-8 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-accent animate-spin" />
            </CardContent>
          </Card>
        ) : notifications?.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Notifications</h3>
              <p className="text-muted-foreground mb-4">
                {filter !== 'all' 
                  ? "No notifications match your filter. Try changing the filter."
                  : "You're all caught up! Create a notification to get started."}
              </p>
              <Button onClick={() => setIsAddOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </CardContent>
          </Card>
        ) : (
          notifications?.map((notification, index) => {
            const Icon = getNotificationIcon(notification.notification_type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`bg-card border-border transition-colors ${
                    !notification.is_read ? 'border-l-4 border-l-accent' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        notification.priority === 'urgent' ? 'bg-red-500/20' :
                        notification.priority === 'high' ? 'bg-accent/20' :
                        'bg-secondary'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          notification.priority === 'urgent' ? 'text-red-500' :
                          notification.priority === 'high' ? 'text-accent' :
                          'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold ${
                                !notification.is_read ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                              </h4>
                              <Badge variant={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {format(new Date(notification.created_at), "MMM d, h:mm a")}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {!notification.is_read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead.mutate(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => dismissNotification.mutate(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
