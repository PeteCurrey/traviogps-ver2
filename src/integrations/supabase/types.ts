export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      area_guides: {
        Row: {
          average_price: number | null
          content: string | null
          created_at: string
          description: string | null
          display_order: number | null
          gallery: string[] | null
          headline: string | null
          id: string
          image: string | null
          is_published: boolean
          latitude: number | null
          longitude: number | null
          meta_description: string | null
          meta_title: string | null
          name: string
          property_count: number | null
          slug: string
          updated_at: string
        }
        Insert: {
          average_price?: number | null
          content?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          gallery?: string[] | null
          headline?: string | null
          id?: string
          image?: string | null
          is_published?: boolean
          latitude?: number | null
          longitude?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          property_count?: number | null
          slug: string
          updated_at?: string
        }
        Update: {
          average_price?: number | null
          content?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          gallery?: string[] | null
          headline?: string | null
          id?: string
          image?: string | null
          is_published?: boolean
          latitude?: number | null
          longitude?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          property_count?: number | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      campaign_analytics: {
        Row: {
          campaign_id: string | null
          created_at: string
          event_data: Json
          event_type: string
          id: string
          lead_id: string | null
          property_id: string | null
          recorded_at: string
          user_id: string | null
          visitor_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          event_data?: Json
          event_type: string
          id?: string
          lead_id?: string | null
          property_id?: string | null
          recorded_at?: string
          user_id?: string | null
          visitor_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          lead_id?: string | null
          property_id?: string | null
          recorded_at?: string
          user_id?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_analytics_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_analytics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      competitor_logs: {
        Row: {
          competitor_id: string
          created_at: string
          data: Json | null
          description: string | null
          id: string
          importance_score: number | null
          is_reviewed: boolean | null
          log_type: string
          reviewed_by: string | null
          title: string
        }
        Insert: {
          competitor_id: string
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          importance_score?: number | null
          is_reviewed?: boolean | null
          log_type: string
          reviewed_by?: string | null
          title: string
        }
        Update: {
          competitor_id?: string
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          importance_score?: number | null
          is_reviewed?: boolean | null
          log_type?: string
          reviewed_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitor_logs_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
        ]
      }
      competitors: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          last_checked_at: string | null
          logo_url: string | null
          monitoring_enabled: boolean | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_checked_at?: string | null
          logo_url?: string | null
          monitoring_enabled?: boolean | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_checked_at?: string | null
          logo_url?: string | null
          monitoring_enabled?: boolean | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      content_drafts: {
        Row: {
          ai_model: string | null
          ai_prompt: string | null
          auto_publish: boolean | null
          content: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          created_by: string | null
          engagement_score: number | null
          id: string
          keywords: string[] | null
          meta_description: string | null
          published_at: string | null
          review_notes: string | null
          reviewed_by: string | null
          scheduled_for: string | null
          status: Database["public"]["Enums"]["content_status"]
          target_platform: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_model?: string | null
          ai_prompt?: string | null
          auto_publish?: boolean | null
          content: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          created_by?: string | null
          engagement_score?: number | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          review_notes?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          target_platform?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_model?: string | null
          ai_prompt?: string | null
          auto_publish?: boolean | null
          content?: string
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          created_by?: string | null
          engagement_score?: number | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          review_notes?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          target_platform?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      developments: {
        Row: {
          amenities: string[] | null
          completion_date: string | null
          created_at: string
          description: string | null
          developer: string
          display_order: number | null
          features: string[] | null
          gallery_images: string[] | null
          hero_image: string | null
          highlights: Json | null
          id: string
          image: string | null
          is_featured: boolean | null
          is_published: boolean | null
          location: string
          location_description: string | null
          name: string
          overview: string | null
          price_from: string | null
          property_types: Json | null
          slug: string
          status: string | null
          tagline: string | null
          units: string | null
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          completion_date?: string | null
          created_at?: string
          description?: string | null
          developer: string
          display_order?: number | null
          features?: string[] | null
          gallery_images?: string[] | null
          hero_image?: string | null
          highlights?: Json | null
          id?: string
          image?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          location: string
          location_description?: string | null
          name: string
          overview?: string | null
          price_from?: string | null
          property_types?: Json | null
          slug: string
          status?: string | null
          tagline?: string | null
          units?: string | null
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          completion_date?: string | null
          created_at?: string
          description?: string | null
          developer?: string
          display_order?: number | null
          features?: string[] | null
          gallery_images?: string[] | null
          hero_image?: string | null
          highlights?: Json | null
          id?: string
          image?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          location?: string
          location_description?: string | null
          name?: string
          overview?: string | null
          price_from?: string | null
          property_types?: Json | null
          slug?: string
          status?: string | null
          tagline?: string | null
          units?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          audience_segment: string | null
          click_count: number | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          open_count: number | null
          preview_text: string | null
          recipient_count: number | null
          scheduled_for: string | null
          sent_at: string | null
          sent_count: number | null
          status: Database["public"]["Enums"]["content_status"]
          subject: string
          template: string | null
          unsubscribe_count: number | null
          updated_at: string
        }
        Insert: {
          audience_segment?: string | null
          click_count?: number | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          open_count?: number | null
          preview_text?: string | null
          recipient_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          subject: string
          template?: string | null
          unsubscribe_count?: number | null
          updated_at?: string
        }
        Update: {
          audience_segment?: string | null
          click_count?: number | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          open_count?: number | null
          preview_text?: string | null
          recipient_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          subject?: string
          template?: string | null
          unsubscribe_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      lead_scores: {
        Row: {
          calculated_at: string
          id: string
          last_activity_at: string | null
          lead_id: string
          score: number
          score_breakdown: Json
          urgency_level: string | null
        }
        Insert: {
          calculated_at?: string
          id?: string
          last_activity_at?: string | null
          lead_id: string
          score?: number
          score_breakdown?: Json
          urgency_level?: string | null
        }
        Update: {
          calculated_at?: string
          id?: string
          last_activity_at?: string | null
          lead_id?: string
          score?: number
          score_breakdown?: Json
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_scores_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          contacted_at: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          lead_type: Database["public"]["Enums"]["lead_type"]
          message: string | null
          notes: string | null
          phone: string | null
          property_id: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          valuation_address: string | null
          valuation_bedrooms: number | null
          valuation_postcode: string | null
          valuation_property_type:
            | Database["public"]["Enums"]["property_type"]
            | null
        }
        Insert: {
          assigned_to?: string | null
          contacted_at?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          lead_type?: Database["public"]["Enums"]["lead_type"]
          message?: string | null
          notes?: string | null
          phone?: string | null
          property_id?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          valuation_address?: string | null
          valuation_bedrooms?: number | null
          valuation_postcode?: string | null
          valuation_property_type?:
            | Database["public"]["Enums"]["property_type"]
            | null
        }
        Update: {
          assigned_to?: string | null
          contacted_at?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          lead_type?: Database["public"]["Enums"]["lead_type"]
          message?: string | null
          notes?: string | null
          phone?: string | null
          property_id?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          valuation_address?: string | null
          valuation_bedrooms?: number | null
          valuation_postcode?: string | null
          valuation_property_type?:
            | Database["public"]["Enums"]["property_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      market_trends: {
        Row: {
          action_notes: string | null
          action_taken: boolean | null
          ai_analysis: string | null
          area: string | null
          created_at: string
          data: Json | null
          description: string | null
          id: string
          impact_level: string | null
          is_actionable: boolean | null
          recorded_at: string
          source: string | null
          source_url: string | null
          title: string
          trend_type: string
        }
        Insert: {
          action_notes?: string | null
          action_taken?: boolean | null
          ai_analysis?: string | null
          area?: string | null
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          impact_level?: string | null
          is_actionable?: boolean | null
          recorded_at?: string
          source?: string | null
          source_url?: string | null
          title: string
          trend_type: string
        }
        Update: {
          action_notes?: string | null
          action_taken?: boolean | null
          ai_analysis?: string | null
          area?: string | null
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          impact_level?: string | null
          is_actionable?: boolean | null
          recorded_at?: string
          source?: string | null
          source_url?: string | null
          title?: string
          trend_type?: string
        }
        Relationships: []
      }
      marketing_notifications: {
        Row: {
          created_at: string
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          link: string | null
          message: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          priority: Database["public"]["Enums"]["notification_priority"]
          related_id: string | null
          related_type: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          link?: string | null
          message: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          priority?: Database["public"]["Enums"]["notification_priority"]
          related_id?: string | null
          related_type?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          link?: string | null
          message?: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          priority?: Database["public"]["Enums"]["notification_priority"]
          related_id?: string | null
          related_type?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          job_title: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          area: string
          available_from: string | null
          bathrooms: number
          bedrooms: number
          city: string
          council_tax_band: string | null
          created_at: string
          created_by: string | null
          description: string | null
          epc_rating: Database["public"]["Enums"]["epc_rating"] | null
          featured: boolean
          features: string[] | null
          floor_plan: string | null
          id: string
          images: string[] | null
          latitude: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          location: string
          longitude: number | null
          postcode: string
          price: number
          price_formatted: string
          price_label: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          receptions: number
          short_description: string | null
          slug: string
          sqft: number | null
          status: Database["public"]["Enums"]["property_status"]
          street: string
          tenure: Database["public"]["Enums"]["tenure_type"] | null
          title: string
          updated_at: string
          virtual_tour_url: string | null
        }
        Insert: {
          area: string
          available_from?: string | null
          bathrooms?: number
          bedrooms?: number
          city: string
          council_tax_band?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          epc_rating?: Database["public"]["Enums"]["epc_rating"] | null
          featured?: boolean
          features?: string[] | null
          floor_plan?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          location: string
          longitude?: number | null
          postcode: string
          price: number
          price_formatted: string
          price_label?: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          receptions?: number
          short_description?: string | null
          slug: string
          sqft?: number | null
          status?: Database["public"]["Enums"]["property_status"]
          street: string
          tenure?: Database["public"]["Enums"]["tenure_type"] | null
          title: string
          updated_at?: string
          virtual_tour_url?: string | null
        }
        Update: {
          area?: string
          available_from?: string | null
          bathrooms?: number
          bedrooms?: number
          city?: string
          council_tax_band?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          epc_rating?: Database["public"]["Enums"]["epc_rating"] | null
          featured?: boolean
          features?: string[] | null
          floor_plan?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"]
          location?: string
          longitude?: number | null
          postcode?: string
          price?: number
          price_formatted?: string
          price_label?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          receptions?: number
          short_description?: string | null
          slug?: string
          sqft?: number | null
          status?: Database["public"]["Enums"]["property_status"]
          street?: string
          tenure?: Database["public"]["Enums"]["tenure_type"] | null
          title?: string
          updated_at?: string
          virtual_tour_url?: string | null
        }
        Relationships: []
      }
      property_views: {
        Row: {
          id: string
          property_id: string
          referrer: string | null
          scroll_depth: number | null
          time_on_page: number | null
          user_id: string | null
          viewed_at: string
          visitor_id: string | null
        }
        Insert: {
          id?: string
          property_id: string
          referrer?: string | null
          scroll_depth?: number | null
          time_on_page?: number | null
          user_id?: string | null
          viewed_at?: string
          visitor_id?: string | null
        }
        Update: {
          id?: string
          property_id?: string
          referrer?: string | null
          scroll_depth?: number | null
          time_on_page?: number | null
          user_id?: string | null
          viewed_at?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_properties: {
        Row: {
          id: string
          notes: string | null
          property_id: string
          saved_at: string
          user_id: string
        }
        Insert: {
          id?: string
          notes?: string | null
          property_id: string
          saved_at?: string
          user_id: string
        }
        Update: {
          id?: string
          notes?: string | null
          property_id?: string
          saved_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      search_alerts: {
        Row: {
          created_at: string
          filters: Json
          frequency: string
          id: string
          is_active: boolean
          last_sent_at: string | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filters?: Json
          frequency?: string
          id?: string
          is_active?: boolean
          last_sent_at?: string | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          filters?: Json
          frequency?: string
          id?: string
          is_active?: boolean
          last_sent_at?: string | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seo_analytics: {
        Row: {
          click_through_rate: number | null
          clicks: number | null
          created_at: string
          current_rank: number | null
          data_source: string | null
          difficulty_score: number | null
          id: string
          impressions: number | null
          keyword: string | null
          page_url: string
          previous_rank: number | null
          recorded_at: string
          search_volume: number | null
        }
        Insert: {
          click_through_rate?: number | null
          clicks?: number | null
          created_at?: string
          current_rank?: number | null
          data_source?: string | null
          difficulty_score?: number | null
          id?: string
          impressions?: number | null
          keyword?: string | null
          page_url: string
          previous_rank?: number | null
          recorded_at?: string
          search_volume?: number | null
        }
        Update: {
          click_through_rate?: number | null
          clicks?: number | null
          created_at?: string
          current_rank?: number | null
          data_source?: string | null
          difficulty_score?: number | null
          id?: string
          impressions?: number | null
          keyword?: string | null
          page_url?: string
          previous_rank?: number | null
          recorded_at?: string
          search_volume?: number | null
        }
        Relationships: []
      }
      showcase_properties: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          gallery_images: string[] | null
          hero_image_url: string | null
          hero_video_url: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          location: string | null
          meta_description: string | null
          meta_title: string | null
          price_formatted: string | null
          property_id: string | null
          slug: string
          tagline: string | null
          title: string
          updated_at: string
          video_sections: Json | null
          virtual_tour_type: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          gallery_images?: string[] | null
          hero_image_url?: string | null
          hero_video_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          price_formatted?: string | null
          property_id?: string | null
          slug: string
          tagline?: string | null
          title: string
          updated_at?: string
          video_sections?: Json | null
          virtual_tour_type?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          gallery_images?: string[] | null
          hero_image_url?: string | null
          hero_video_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          price_formatted?: string | null
          property_id?: string | null
          slug?: string
          tagline?: string | null
          title?: string
          updated_at?: string
          video_sections?: Json | null
          virtual_tour_type?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "showcase_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          engagement_data: Json | null
          external_post_id: string | null
          id: string
          media_urls: string[] | null
          platform: string
          property_id: string | null
          published_at: string | null
          scheduled_for: string | null
          status: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          engagement_data?: Json | null
          external_post_id?: string | null
          id?: string
          media_urls?: string[] | null
          platform: string
          property_id?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          engagement_data?: Json | null
          external_post_id?: string | null
          id?: string
          media_urls?: string[] | null
          platform?: string
          property_id?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number | null
          email: string | null
          full_name: string
          id: string
          image: string | null
          is_published: boolean
          job_title: string
          linkedin_url: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          full_name: string
          id?: string
          image?: string | null
          is_published?: boolean
          job_title: string
          linkedin_url?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          full_name?: string
          id?: string
          image?: string | null
          is_published?: boolean
          job_title?: string
          linkedin_url?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_image: string | null
          author_location: string | null
          author_name: string
          created_at: string
          display_order: number | null
          id: string
          is_featured: boolean
          is_published: boolean
          property_id: string | null
          quote: string
          rating: number
          updated_at: string
        }
        Insert: {
          author_image?: string | null
          author_location?: string | null
          author_name: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          property_id?: string | null
          quote: string
          rating?: number
          updated_at?: string
        }
        Update: {
          author_image?: string | null
          author_location?: string | null
          author_name?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          property_id?: string | null
          quote?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_sessions: {
        Row: {
          created_at: string
          device_type: string | null
          id: string
          pages_viewed: Json
          properties_viewed: Json
          referrer: string | null
          search_queries: Json
          session_end: string | null
          session_start: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          id?: string
          pages_viewed?: Json
          properties_viewed?: Json
          referrer?: string | null
          search_queries?: Json
          session_end?: string | null
          session_start?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string
          device_type?: string | null
          id?: string
          pages_viewed?: Json
          properties_viewed?: Json
          referrer?: string | null
          search_queries?: Json
          session_end?: string | null
          session_start?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          avg_time_on_page: number | null
          bounce_rate: number | null
          conversions: number | null
          created_at: string
          date: string
          id: string
          leads_generated: number | null
          page_path: string
          page_title: string | null
          page_views: number | null
          unique_visitors: number | null
          visitors: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          conversions?: number | null
          created_at?: string
          date: string
          id?: string
          leads_generated?: number | null
          page_path: string
          page_title?: string | null
          page_views?: number | null
          unique_visitors?: number | null
          visitors?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          conversions?: number | null
          created_at?: string
          date?: string
          id?: string
          leads_generated?: number | null
          page_path?: string
          page_title?: string | null
          page_views?: number | null
          unique_visitors?: number | null
          visitors?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "agent" | "viewer"
      content_status:
        | "draft"
        | "pending_review"
        | "approved"
        | "published"
        | "rejected"
        | "scheduled"
      content_type:
        | "blog_post"
        | "social_facebook"
        | "social_instagram"
        | "social_twitter"
        | "social_linkedin"
        | "email_campaign"
      epc_rating: "A" | "B" | "C" | "D" | "E" | "F" | "G"
      lead_status: "new" | "contacted" | "qualified" | "converted" | "closed"
      lead_type: "enquiry" | "valuation" | "viewing" | "general"
      listing_type: "sale" | "rent"
      notification_priority: "low" | "medium" | "high" | "urgent"
      notification_type:
        | "competitor_change"
        | "market_trend"
        | "seo_alert"
        | "content_ready"
        | "system"
      property_status:
        | "available"
        | "under-offer"
        | "sold"
        | "let-agreed"
        | "withdrawn"
      property_type:
        | "detached"
        | "semi-detached"
        | "terraced"
        | "flat"
        | "bungalow"
        | "cottage"
        | "barn-conversion"
        | "farmhouse"
        | "new-build"
        | "land"
        | "commercial"
      tenure_type: "freehold" | "leasehold" | "share-of-freehold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "agent", "viewer"],
      content_status: [
        "draft",
        "pending_review",
        "approved",
        "published",
        "rejected",
        "scheduled",
      ],
      content_type: [
        "blog_post",
        "social_facebook",
        "social_instagram",
        "social_twitter",
        "social_linkedin",
        "email_campaign",
      ],
      epc_rating: ["A", "B", "C", "D", "E", "F", "G"],
      lead_status: ["new", "contacted", "qualified", "converted", "closed"],
      lead_type: ["enquiry", "valuation", "viewing", "general"],
      listing_type: ["sale", "rent"],
      notification_priority: ["low", "medium", "high", "urgent"],
      notification_type: [
        "competitor_change",
        "market_trend",
        "seo_alert",
        "content_ready",
        "system",
      ],
      property_status: [
        "available",
        "under-offer",
        "sold",
        "let-agreed",
        "withdrawn",
      ],
      property_type: [
        "detached",
        "semi-detached",
        "terraced",
        "flat",
        "bungalow",
        "cottage",
        "barn-conversion",
        "farmhouse",
        "new-build",
        "land",
        "commercial",
      ],
      tenure_type: ["freehold", "leasehold", "share-of-freehold"],
    },
  },
} as const
