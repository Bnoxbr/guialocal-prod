// Free tier: 28,500 calls/month
export const loadGoogleMaps = () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&libraries=places`;
  document.head.appendChild(script);
  return new Promise((resolve) => (script.onload = resolve));
};

export const getLocationCoordinates = async (address: string) => {
  const geocoder = new google.maps.Geocoder();
  const result = await geocoder.geocode({ address });
  return result.results[0].geometry.location;
};
