import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Star, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

interface Tour {
  id: string;
  name: string;
  photo: string;
  location: string;
  rating: number;
  price: number;
  description?: string;
}

interface TourListingsProps {
  tours: Tour[];
  title?: string;
}

const TourListings = ({
  tours,
  title = "Experiências Populares",
}: TourListingsProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative">
              <img
                src={tour.photo}
                alt={tour.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{tour.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-base line-clamp-1">
                  {tour.name}
                </h3>
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{tour.location}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {tour.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="font-semibold">R$ {tour.price}</span>
                  <span className="text-sm text-gray-500"> / pessoa</span>
                </div>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Reservar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourListings;
