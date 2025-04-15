import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Star, MapPin, Calendar, Clock, Users, Info } from "lucide-react";
import { adventureTours, whatToDoTours, Tour } from "@/lib/tours";
import BookingConfirmation from "./BookingConfirmation";

const TourDetail = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);

  // Combine both tour arrays to search for the tour
  const allTours = [...whatToDoTours, ...adventureTours];
  const tour = allTours.find((t) => t.id === tourId);

  if (!tour) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour não encontrado</h1>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </div>
    );
  }

  // Mock data for the tour details
  const tourDetails = {
    description:
      tour.description ||
      "Uma experiência incrível para explorar as belezas naturais da região.",
    schedule: [
      { time: "09:00", activity: "Encontro no ponto de partida" },
      { time: "09:30", activity: "Início da atividade" },
      { time: "12:00", activity: "Parada para almoço (não incluso)" },
      { time: "13:30", activity: "Continuação da atividade" },
      { time: "16:00", activity: "Encerramento e retorno" },
    ],
    includes: [
      "Guia especializado",
      "Equipamentos de segurança",
      "Água mineral",
      "Seguro de atividades",
    ],
    notIncludes: ["Transporte até o local", "Alimentação", "Itens pessoais"],
    requirements: [
      "Idade mínima: 12 anos",
      "Condicionamento físico moderado",
      "Calçado apropriado para trilhas",
    ],
    images: [
      tour.photo,
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
        ← Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{tour.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{tour.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tourDetails.images.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden ${index === 0 ? "md:col-span-3 h-[300px]" : "h-[150px]"}`}
                >
                  <img
                    src={image}
                    alt={`${tour.name} - imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="schedule">Cronograma</TabsTrigger>
                <TabsTrigger value="includes">Inclui/Não Inclui</TabsTrigger>
                <TabsTrigger value="requirements">Requisitos</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">{tourDetails.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {tourDetails.schedule.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start border-b pb-3 last:border-0"
                        >
                          <div className="bg-emerald-100 text-emerald-800 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{item.time}</p>
                            <p className="text-gray-600">{item.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="includes" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <span className="bg-green-100 p-1 rounded-full mr-2">
                            <Info className="w-4 h-4 text-green-600" />
                          </span>
                          O que está incluso
                        </h3>
                        <ul className="space-y-2">
                          {tourDetails.includes.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              <span className="mr-2 text-green-500">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <span className="bg-red-100 p-1 rounded-full mr-2">
                            <Info className="w-4 h-4 text-red-600" />
                          </span>
                          O que não está incluso
                        </h3>
                        <ul className="space-y-2">
                          {tourDetails.notIncludes.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              <span className="mr-2 text-red-500">✗</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-3">Requisitos</h3>
                    <ul className="space-y-2">
                      {tourDetails.requirements.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-700"
                        >
                          <span className="mr-2 text-blue-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Reservar este tour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-bold">R$ {tour.price}</div>
              <p className="text-gray-500">por pessoa</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Disponível todos os dias</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Duração: 6-7 horas</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Grupos de até 12 pessoas</span>
                </div>
              </div>

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowBooking(true)}
              >
                Reservar agora
              </Button>

              <div className="text-center text-sm text-gray-500">
                Cancelamento gratuito até 24h antes
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showBooking && (
        <BookingConfirmation
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          guideId={tourId}
          guideData={{
            name: tour.name,
            email: "contato@localguia.com",
            price: tour.price,
            location: tour.location,
          }}
        />
      )}
    </div>
  );
};

export default TourDetail;
