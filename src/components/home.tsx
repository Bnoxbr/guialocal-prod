import React, { useState } from "react";
import HeroSection from "./HeroSection";
import DestinationGrid from "./DestinationCarousel";
import RegistrationSection from "./RegistrationSection";
import TourListings from "./TourListings";
import { whatToDoTours, adventureTours } from "@/lib/tours";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/lib/supabaseClient";
import { useToast } from "./ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("breno@ceo.com", "admin1234");
      navigate("/admin");
    } catch (error: any) {
      console.error("Admin login error:", error);
      toast({
        title: "Erro ao acessar painel admin",
        description:
          error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
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

      {/* Admin Floating Button */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-4 left-4 rounded-full shadow-lg z-50 bg-emerald-600 hover:bg-emerald-700 text-white"
        onClick={handleAdminLogin}
        disabled={isLoading}
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Home;
