import React from "react";
import HeroSection from "./HeroSection";
import FeaturedGuides from "./FeaturedGuides";
import DestinationCarousel from "./DestinationCarousel";
import RegistrationSection from "./RegistrationSection";

// StepsSection removed

import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";
import { MapPin, Utensils, Home, Landmark } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: "Ecoturismo",
      description: "Trilhas, cachoeiras e observação de fauna",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      count: "42 experiências",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 2,
      name: "Gastronomia",
      description: "Restaurantes, vinícolas e comida típica",
      imageUrl:
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80",
      count: "35 experiências",
      icon: <Utensils className="w-4 h-4" />,
    },
    {
      id: 3,
      name: "Aventura",
      description: "Escalada, rapel, parapente e rafting",
      imageUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      count: "28 experiências",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 4,
      name: "Cultural",
      description: "Museus, centros históricos e artesanato",
      imageUrl:
        "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80",
      count: "19 experiências",
      icon: <Landmark className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-emerald-900">
        Experiências para todos os Gostos
      </h2>

      <Carousel className="w-full">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="mx-2">
                <CardContent className="p-0">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {category.icon}
                        <span className="text-sm">{category.count}</span>
                      </div>
                      <Badge variant="outline">{category.name}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Explorar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 sm:-left-12" />
        <CarouselNext className="-right-4 sm:-right-12" />
      </Carousel>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Section (Mobile and Desktop) */}
      <CategoriesSection />
      {/* Featured Guides Section */}
      <FeaturedGuides />
      {/* Destination Carousel Section */}
      <DestinationCarousel />
      {/* Registration Section */}
      <RegistrationSection />
    </div>
  );
};

export default Home;
