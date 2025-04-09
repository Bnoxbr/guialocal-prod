import React from "react";
import HeroSection from "./HeroSection";
import DestinationGrid from "./DestinationCarousel";
import RegistrationSection from "./RegistrationSection";
import TourListings from "./TourListings";
import { whatToDoTours, adventureTours } from "@/lib/tours";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      {/* Destination Carousel Section */}
      <DestinationGrid />
      {/* Popular Tours Section */}
      <TourListings tours={whatToDoTours} title="O que quer fazer?" />
      {/* Adventure Tours Section */}
      <TourListings tours={adventureTours} title="Mais Aventuras para Você" />
      {/* Registration Section */}
      <RegistrationSection />
    </div>
  );
};

export default Home;
