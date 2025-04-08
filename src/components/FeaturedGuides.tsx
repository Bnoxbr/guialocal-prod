import React from "react";
import GuideCard from "./GuideCard";

interface Guide {
  id: string;
  name: string;
  photo: string;
  location: string;
  languages: string[];
  rating: number;
  specialties: string[];
}

interface FeaturedGuidesProps {
  guides?: Guide[];
  title?: string;
  subtitle?: string;
}

const defaultGuides: Guide[] = [
  {
    id: "1",
    name: "Turismo de Aventura",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    location: "Serra da Mantiqueira",
    languages: ["Português", "Inglês"],
    rating: 4.9,
    specialties: ["Trilhas", "Rapel", "Escalada"],
  },
  {
    id: "2",
    name: "Turismo Cultural",
    photo: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    location: "Ilhabela",
    languages: ["Português", "Inglês"],
    rating: 4.8,
    specialties: ["História Local", "Patrimônio", "Artesanato"],
  },
  {
    id: "3",
    name: "Ecoturismo",
    photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    location: "Ubatuba",
    languages: ["Português", "Inglês"],
    rating: 4.7,
    specialties: ["Observação de Aves", "Fauna Local", "Trilhas"],
  },
  {
    id: "4",
    name: "Turismo Rural",
    photo: "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
    location: "Sul de Minas",
    languages: ["Português", "Inglês"],
    rating: 4.9,
    specialties: ["Fazendas", "Café", "Gastronomia"],
  },
];

const FeaturedGuides = ({
  guides = defaultGuides,
  title = "Tipos de Turismo",
  subtitle = "Escolha sua experiência ideal na região",
}: FeaturedGuidesProps) => {
  return <></>;
};

export default FeaturedGuides;
