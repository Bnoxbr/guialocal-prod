import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "./ui/use-toast";

interface GuideCardProps {
  id?: string;
  name?: string;
  photo?: string;
  location?: string;
  languages?: string[];
  rating?: number;
  specialties?: string[];
  isFavorite?: boolean;
}

const GuideCard = ({
  id = "guide-1",
  name = "John Doe",
  photo = "https://api.dicebear.com/7.x/avataaars/svg?seed=guide1",
  location = "Serra da Mantiqueira",
  languages = ["Português", "Inglês"],
  rating = 4.8,
  specialties = ["Turismo de Aventura", "Ecoturismo", "Turismo Cultural"],
  isFavorite: initialIsFavorite = false,
}: GuideCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    try {
      setIsLoading(true);

      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        toast({
          title: "Faça login",
          description: "Você precisa estar logado para favoritar guias",
          variant: "destructive",
        });
        return;
      }

      const userId = sessionData.session.user.id;

      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorites")
          .delete()
          .match({ user_id: userId, guide_id: id });

        if (error) throw error;

        toast({
          title: "Removido dos favoritos",
          description: `${name} foi removido dos seus favoritos`,
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: userId, guide_id: id });

        if (error) throw error;

        toast({
          title: "Adicionado aos favoritos",
          description: `${name} foi adicionado aos seus favoritos`,
        });
      }

      setIsFavorite(!isFavorite);
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Erro",
        description:
          error.message || "Ocorreu um erro ao atualizar os favoritos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="w-[280px] h-[380px] bg-white hover:shadow-lg transition-shadow relative cursor-pointer"
      onClick={() => navigate(`/guide/${id}`)}
    >
      <CardHeader className="space-y-4">
        <div className="flex justify-center relative">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 text-gray-500 hover:text-red-500"
            onClick={toggleFavorite}
            disabled={isLoading}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Idiomas</p>
          <div className="flex flex-wrap gap-1">
            {languages.map((language) => (
              <Badge key={language} variant="secondary" className="text-xs">
                {language}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Especialidades</p>
          <div className="flex flex-wrap gap-1">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <Button
        className="absolute bottom-4 left-4 right-4 bg-emerald-600 hover:bg-emerald-700"
        onClick={(e) => {
          e.stopPropagation();
          handleBooking();
        }}
      >
        Agendar um tour
      </Button>
    </Card>
  );
};

export default GuideCard;
