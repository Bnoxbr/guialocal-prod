import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Star, ArrowLeft, Heart } from "lucide-react";
import { Badge } from "./ui/badge";

interface Guide {
  id: string;
  name: string;
  photo: string;
  location: string;
  rating: number;
  price: number;
  specialties: string[];
  languages: string[];
  description: string;
}

interface SearchResultsProps {
  guides?: Guide[];
  location?: string;
  isLoading?: boolean;
}

const defaultGuides: Guide[] = [
  {
    id: "ana",
    name: "Turismo de Aventura",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    location: "Campos do Jordão",
    rating: 4.98,
    price: 106,
    description: "Trilhas, rapel e escalada com equipamentos",
    specialties: ["Equipamentos inclusos"],
    languages: ["Português", "Alemão", "Inglês"],
  },
  {
    id: "rafael",
    name: "Turismo Cultural",
    photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    location: "Ubatuba",
    rating: 4.9,
    price: 137,
    description: "História local e patrimônio cultural",
    specialties: ["Guia especializado"],
    languages: ["Português", "Inglês"],
  },
  {
    id: "julia",
    name: "Ecoturismo",
    photo: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    location: "Ubatuba",
    rating: 4.96,
    price: 171,
    description: "Observação de aves e fauna local",
    specialties: ["Binóculos inclusos"],
    languages: ["Português", "Inglês", "Espanhol"],
  },
];

const SearchResults = ({
  guides = defaultGuides,
  location = "Serra da Mantiqueira",
  isLoading = false,
}: SearchResultsProps) => {
  return (
    <div className="flex h-screen">
      {/* Left side - Results */}
      <div className="w-[60%] overflow-auto p-6 border-r">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Mais de mil espaços</h1>
        </div>

        <div className="space-y-6">
          {guides.map((guide) => (
            <Card
              key={guide.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group cursor-pointer"
              onClick={() => (window.location.href = `/booking/${guide.id}`)}
            >
              <CardContent className="p-0">
                <div className="flex gap-4">
                  <div className="relative w-72 h-64">
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 text-white hover:text-white bg-transparent hover:bg-black/20 rounded-full"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Badge
                      className="absolute top-2 left-2 bg-white text-black"
                      variant="secondary"
                    >
                      Indicado pelos turistas
                    </Badge>
                  </div>

                  <div className="flex-1 py-4 pr-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {guide.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {guide.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 mt-4">
                      {guide.specialties.map((specialty) => (
                        <p key={specialty} className="text-gray-600 text-sm">
                          {specialty}
                        </p>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-black" />
                        <span className="font-medium">{guide.rating}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          R$ {guide.price}
                        </p>
                        <p className="text-sm text-gray-600">A partir de</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right side - Map */}
      <div className="w-[40%] sticky top-0 h-screen">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1598446719622-0813a4c3d8be?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
