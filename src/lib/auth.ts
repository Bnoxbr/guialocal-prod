import supabase from "./supabase";

export const registerTourist = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) throw authError;

  // 2. Create user profile
  const { error: profileError } = await supabase.from("users").insert({
    id: authData.user?.id,
    name: data.name,
    email: data.email,
    type: "tourist",
  });

  if (profileError) throw profileError;

  return authData;
};

export const registerGuide = async (data: {
  name: string;
  email: string;
  password: string;
  location: string;
  languages: string[];
  specialties: string[];
  cadastur_number: string;
  social_links: {
    tripadvisor?: string;
    instagram?: string;
  };
}) => {
  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) throw authError;

  // 2. Create user profile
  const { error: profileError } = await supabase.from("users").insert({
    id: authData.user?.id,
    name: data.name,
    email: data.email,
    type: "guide",
  });

  if (profileError) throw profileError;

  // 3. Create guide profile
  const { error: guideError } = await supabase.from("guides").insert({
    user_id: authData.user?.id,
    name: data.name,
    email: data.email,
    location: data.location,
    languages: data.languages,
    specialties: data.specialties,
    cadastur_number: data.cadastur_number,
    social_links: data.social_links,
    rating: 5.0,
  });

  if (guideError) throw guideError;

  return authData;
};
