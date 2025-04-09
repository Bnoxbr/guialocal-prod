import React from "react";
import HeroSection from "./HeroSection";
import DestinationCarousel from "./DestinationCarousel";
import RegistrationSection from "./RegistrationSection";
import TourListings from "./TourListings";
import { popularTours, adventureTours } from "@/lib/tours";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      {/* Destination Carousel Section */}
      <DestinationCarousel />
      {/* Popular Tours Section */}
      <TourListings tours={popularTours} title="Experiências Populares" />
      {/* Adventure Tours Section */}
      <TourListings tours={adventureTours} title="Mais Aventuras para Você" />
      {/* Registration Section */}
      <RegistrationSection />
    </div>
  );
};

export default Home;
