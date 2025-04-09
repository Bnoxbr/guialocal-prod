import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Search, Utensils, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

interface Destination {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  type: string;
  category: "tour" | "restaurant" | "accommodation";
}

interface DestinationGridProps {
  destinations?: Destination[];
}

const regionsData = {
  "Serra da Mantiqueira": [
    {
      id: 1,
      title: "Trekking Pico dos Marins",
      description: "Trilhas deslumbrantes, cachoeiras e clima de montanha",
      imageUrl:
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&q=80",
      location: "Piquete, SP",
      type: "Ecoturismo",
      category: "tour",
    },
    {
      id: 2,
      title: "Restaurante Sabor da Serra",
      description: "Gastronomia local com ingredientes orgânicos",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
      location: "Campos do Jordão, SP",
      type: "Gastronomia",
      category: "restaurant",
    },
    {
      id: 3,
      title: "Chalé Vista Panorâmica",
      description: "Hospedagem com vista para o vale e café da manhã incluso",
      imageUrl:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
      location: "Monte Verde, MG",
      type: "Hospedagem",
      category: "accommodation",
    },
    {
      id: 13,
      title: "Passeio de Bicicleta",
      description: "Explore as trilhas da serra em um passeio guiado",
      imageUrl:
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80",
      location: "Campos do Jordão, SP",
      type: "Aventura",
      category: "tour",
    },
  ],
  "Serra do Mar": [
    {
      id: 4,
      title: "Trilha da Bocaina",
      description: "Mata Atlântica preservada e vistas deslumbrantes",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
      location: "São José do Barreiro, SP",
      type: "Aventura",
      category: "tour",
    },
    {
      id: 5,
      title: "Restaurante Frutos do Mar",
      description: "Especialidades marinhas com ingredientes frescos",
      imageUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
      location: "Cunha, SP",
      type: "Gastronomia",
      category: "restaurant",
    },
    {
      id: 6,
      title: "Pousada Mata Atlântica",
      description: "Quartos confortáveis em meio à natureza",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      location: "Cunha, SP",
      type: "Hospedagem",
      category: "accommodation",
    },
    {
      id: 14,
      title: "Observação de Aves",
      description: "Observe dezenas de espécies de aves em seu habitat natural",
      imageUrl:
        "https://images.unsplash.com/photo-1621494547431-5eabcbfaa2f0?w=600&q=80",
      location: "Ubatuba, SP",
      type: "Ecoturismo",
      category: "tour",
    },
  ],
  "Litoral Norte Paulista": [
    {
      id: 7,
      title: "Passeio de Barco em Ilhabela",
      description: "Praias paradisíacas e trilhas costeiras",
      imageUrl:
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80",
      location: "Ilhabela, SP",
      type: "Aventura",
      category: "tour",
    },
    {
      id: 8,
      title: "Restaurante Pé na Areia",
      description: "Frutos do mar frescos à beira-mar",
      imageUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      location: "Ubatuba, SP",
      type: "Gastronomia",
      category: "restaurant",
    },
    {
      id: 9,
      title: "Resort Maresias",
      description: "Suítes de luxo com vista para o mar",
      imageUrl:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      location: "São Sebastião, SP",
      type: "Hospedagem",
      category: "accommodation",
    },
    {
      id: 15,
      title: "Aula de Surf",
      description: "Aprenda a surfar nas melhores praias do litoral",
      imageUrl:
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80",
      location: "Ubatuba, SP",
      type: "Aventura",
      category: "tour",
    },
  ],
  "Sul Fluminense": [
    {
      id: 10,
      title: "Tour Histórico em Paraty",
      description: "Centro histórico e cultura colonial",
      imageUrl:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
      location: "Paraty, RJ",
      type: "Cultural",
      category: "tour",
    },
    {
      id: 11,
      title: "Restaurante Colonial",
      description: "Culinária tradicional em casarão histórico",
      imageUrl:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80",
      location: "Angra dos Reis, RJ",
      type: "Gastronomia",
      category: "restaurant",
    },
    {
      id: 12,
      title: "Pousada Baía de Angra",
      description: "Acomodações com vista para as ilhas",
      imageUrl:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
      location: "Angra dos Reis, RJ",
      type: "Hospedagem",
      category: "accommodation",
    },
    {
      id: 16,
      title: "Passeio de Caiaque",
      description: "Explore as águas cristalinas da baía de Paraty",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
      location: "Paraty, RJ",
      type: "Aventura",
      category: "tour",
    },
  ],
};

const DestinationGrid = ({ destinations = [] }: DestinationGridProps) => {
  const [activeRegion, setActiveRegion] = useState("Serra da Mantiqueira");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "tour" | "restaurant" | "accommodation"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = regionsData[
    activeRegion as keyof typeof regionsData
  ].filter((destination) => {
    if (activeCategory !== "all" && destination.category !== activeCategory) {
      return false;
    }

    if (
      searchTerm &&
      !destination.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !destination.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !destination.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tour":
        return <MapPin className="w-4 h-4" />;
      case "restaurant":
        return <Utensils className="w-4 h-4" />;
      case "accommodation":
        return <Home className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-16 bg-emerald-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-emerald-900">
        Conheça nossos destinos
      </h2>

      <Tabs
        defaultValue="Serra da Mantiqueira"
        className="w-full"
        onValueChange={setActiveRegion}
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="Serra da Mantiqueira">
            Serra da Mantiqueira
          </TabsTrigger>
          <TabsTrigger value="Serra do Mar">Serra do Mar</TabsTrigger>
          <TabsTrigger value="Litoral Norte Paulista">
            Litoral Norte Paulista
          </TabsTrigger>
          <TabsTrigger value="Sul Fluminense">Sul Fluminense</TabsTrigger>
        </TabsList>

        {Object.keys(regionsData).map((region) => (
          <TabsContent key={region} value={region} className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={activeCategory === "tour" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("tour")}
                >
                  Passeios
                </Button>
                <Button
                  variant={
                    activeCategory === "restaurant" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory("restaurant")}
                >
                  Restaurantes
                </Button>
                <Button
                  variant={
                    activeCategory === "accommodation" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory("accommodation")}
                >
                  Hospedagem
                </Button>
              </div>

              <div className="relative w-64">
                <Input
                  placeholder="Buscar destinos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm("")}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDestinations.map((destination) => (
                <Card
                  key={destination.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/destination/${destination.id}`)
                  }
                >
                  <CardContent className="p-0">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={destination.imageUrl}
                        alt={destination.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </AspectRatio>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {getCategoryIcon(destination.category)}
                          <span className="text-sm">
                            {destination.location}
                          </span>
                        </div>
                        <Badge variant="outline">{destination.type}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold">
                        {destination.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {destination.description}
                      </p>
                      <Button variant="outline" className="w-full">
                        {destination.category === "tour"
                          ? "Reservar"
                          : destination.category === "restaurant"
                            ? "Fazer Reserva"
                            : "Ver Disponibilidade"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DestinationGrid;
