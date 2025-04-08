import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface BookingConfirmationProps {
  isOpen?: boolean;
  onClose?: () => void;
  guideData?: {
    name: string;
    email: string;
    price: number;
    location: string;
  };
}

const BookingConfirmation = ({
  isOpen = true,
  onClose = () => {},
  guideData = {
    name: "Maria Silva",
    email: "maria@example.com",
    price: 150,
    location: "Serra da Mantiqueira",
  },
}: BookingConfirmationProps) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    participants: 1,
    clientName: "",
    clientEmail: "",
  });

  const handleBooking = async () => {
    try {
      // Simulating booking process
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep(3); // Move to confirmation step
    } catch (error) {
      console.error("Error processing booking:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Detalhes da Reserva"}
            {step === 2 && "Confirmação"}
            {step === 3 && "Reserva Confirmada!"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Data do Tour</Label>
              <Input
                type="date"
                value={bookingData.date}
                onChange={(e) =>
                  setBookingData({ ...bookingData, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Número de Participantes</Label>
              <Input
                type="number"
                min="1"
                value={bookingData.participants}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    participants: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Seu Nome</Label>
              <Input
                value={bookingData.clientName}
                onChange={(e) =>
                  setBookingData({ ...bookingData, clientName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Seu Email</Label>
              <Input
                type="email"
                value={bookingData.clientEmail}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    clientEmail: e.target.value,
                  })
                }
              />
            </div>

            <Button className="w-full" onClick={() => setStep(2)}>
              Continuar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Reserva</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Guia:</span>
                    <span>{guideData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participantes:</span>
                    <span>{bookingData.participants}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>R$ {guideData.price * bookingData.participants}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={handleBooking}>
              Confirmar Reserva
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-lg">Sua reserva foi confirmada!</p>
            <p className="text-muted-foreground">
              Um email com os detalhes será enviado para{" "}
              {bookingData.clientEmail}
            </p>
            <Button className="w-full" onClick={onClose}>
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmation;
