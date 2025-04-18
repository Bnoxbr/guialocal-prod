import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Authentication functions with improved security and error handling
export const signIn = async (email: string, password: string) => {
  try {
    // Implement rate limiting check (in a real app, this would be server-side)
    const rateLimitKey = `auth_attempts_${email.toLowerCase()}`;
    const attempts = localStorage.getItem(rateLimitKey) || "0";
    const attemptsCount = parseInt(attempts, 10);

    if (attemptsCount >= 5) {
      const lastAttempt = localStorage.getItem(`${rateLimitKey}_time`) || "0";
      const lastAttemptTime = parseInt(lastAttempt, 10);
      const now = Date.now();

      // If last attempt was less than 15 minutes ago, block the request
      if (now - lastAttemptTime < 15 * 60 * 1000) {
        throw new Error(
          "Muitas tentativas de login. Tente novamente em 15 minutos.",
        );
      } else {
        // Reset counter after 15 minutes
        localStorage.setItem(rateLimitKey, "0");
      }
    }

    // Proceed with login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      // Increment failed attempts counter
      localStorage.setItem(rateLimitKey, (attemptsCount + 1).toString());
      localStorage.setItem(`${rateLimitKey}_time`, Date.now().toString());
      throw error;
    }

    // Reset counter on successful login
    localStorage.setItem(rateLimitKey, "0");

    // Store session refresh time
    if (data.session) {
      localStorage.setItem("last_session_refresh", Date.now().toString());
    }

    return data;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear any auth-related local storage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith("auth_attempts_") || key === "last_session_refresh")
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // Check if we need to refresh the session
    const lastRefresh = localStorage.getItem("last_session_refresh");
    const now = Date.now();

    // Refresh session if it's been more than 55 minutes (before the typical 1 hour expiry)
    if (lastRefresh && now - parseInt(lastRefresh, 10) > 55 * 60 * 1000) {
      await refreshSession();
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
};

export const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;

    if (data.session) {
      localStorage.setItem("last_session_refresh", Date.now().toString());
    }

    return data;
  } catch (error) {
    console.error("Session refresh error:", error);
    throw error;
  }
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
  return { data, error };
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
