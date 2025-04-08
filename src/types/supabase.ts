export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      tourism_types: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      guides: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          photo_url: string | null;
          location: string;
          languages: string[];
          specialties: string[];
          cadastur_number: string;
          rating: number;
          social_links: Json;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          photo_url?: string | null;
          location: string;
          languages: string[];
          specialties: string[];
          cadastur_number: string;
          rating?: number;
          social_links?: Json;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          photo_url?: string | null;
          location?: string;
          languages?: string[];
          specialties?: string[];
          cadastur_number?: string;
          rating?: number;
          social_links?: Json;
          user_id?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          created_at: string;
          guide_id: string;
          user_id: string;
          rating: number;
          comment: string;
          tour_date: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          guide_id: string;
          user_id: string;
          rating: number;
          comment: string;
          tour_date: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          guide_id?: string;
          user_id?: string;
          rating?: number;
          comment?: string;
          tour_date?: string;
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          photo_url: string | null;
          type: "tourist" | "guide";
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          photo_url?: string | null;
          type: "tourist" | "guide";
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          photo_url?: string | null;
          type?: "tourist" | "guide";
        };
      };
    };
  };
}
