import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Booking {
  id: string;
  touristName: string;
  touristPhoto: string;
  date: string;
  location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: number;
  participants: number;
}

const GuideBookings = () => {
  const bookings: Booking[] = [
    {
      id: "1",
      touristName: "João Silva",
      touristPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
      date: "2024-04-15",
      location: "Serra da Mantiqueira",
      status: "pending",
      price: 150,
      participants: 2,
    },
  ];

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agendamentos</h2>
        <Button>Exportar Relatório</Button>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={booking.touristPhoto} />
                  <AvatarFallback>{booking.touristName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{booking.touristName}</h3>
                  <p className="text-sm text-gray-500">{booking.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">R$ {booking.price}</p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
                <Button variant="outline">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuideBookings;
