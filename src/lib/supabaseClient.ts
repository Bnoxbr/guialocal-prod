import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { success: true };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
};

// Guide functions
export const fetchGuides = async () => {
  const { data, error } = await supabase
    .from("guides")
    .select("*, locations(*), categories(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchGuideById = async (guideId: string) => {
  const { data, error } = await supabase
    .from("guides")
    .select("*, locations(*), categories(*), experiences(*)")
    .eq("id", guideId)
    .single();

  if (error) throw error;
  return data;
};

// Experience functions
export const fetchExperiences = async () => {
  const { data, error } = await supabase
    .from("experiences")
    .select("*, guides(*), locations(*), categories(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Location functions
export const fetchLocations = async () => {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

// Category functions
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

// Booking functions
export const fetchUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guides(*), experiences(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert(bookingData)
    .select();

  if (error) throw error;
  return data;
};

// Favorites functions
export const fetchUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*, guides(*)")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

export const toggleFavorite = async (userId: string, guideId: string) => {
  // Check if favorite exists
  const { data: existingFavorite, error: checkError } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("guide_id", guideId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existingFavorite) {
    // Remove favorite
    const { error: deleteError } = await supabase
      .from("favorites")
      .delete()
      .eq("id", existingFavorite.id);

    if (deleteError) throw deleteError;
    return { removed: true, added: false };
  } else {
    // Add favorite
    const { data: newFavorite, error: insertError } = await supabase
      .from("favorites")
      .insert({ user_id: userId, guide_id: guideId })
      .select();

    if (insertError) throw insertError;
    return { removed: false, added: true, data: newFavorite };
  }
};
