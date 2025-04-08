import supabase from "./supabase";

export const fetchLocations = async () => {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const fetchTourismTypes = async () => {
  const { data, error } = await supabase
    .from("tourism_types")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};
