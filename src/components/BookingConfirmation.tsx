import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { supabase, createBooking } from "@/lib/supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface BookingConfirmationProps {
  isOpen?: boolean;
  onClose?: () => void;
  guideId?: string;
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
  guideId: propGuideId,
  guideData: propGuideData,
}: BookingConfirmationProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { guideId: paramGuideId } = useParams<{ guideId: string }>();
  const finalGuideId = propGuideId || paramGuideId;

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [guideData, setGuideData] = useState(
    propGuideData || {
      name: "Maria Silva",
      email: "maria@example.com",
      price: 150,
      location: "Serra da Mantiqueira",
    },
  );

  const [bookingData, setBookingData] = useState({
    date: "",
    participants: 1,
    clientName: "",
    clientEmail: "",
  });

  // Fetch guide data if not provided as prop
  useEffect(() => {
    const fetchGuideData = async () => {
      if (propGuideData) return; // Skip if data is provided as prop

      if (!finalGuideId) {
        toast({
          title: "Erro",
          description: "ID do guia não fornecido",
          variant: "destructive",
        });
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("guides")
          .select("*")
          .eq("id", finalGuideId)
          .single();

        if (error) throw error;

        if (data) {
          setGuideData({
            name: data.name,
            email: data.email,
            price: 150, // Default price if not available
            location: data.location,
          });
        }
      } catch (error: any) {
        console.error("Error fetching guide data:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do guia",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuideData();
  }, [finalGuideId, propGuideData, toast]);

  // Fetch user data if logged in
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          const { data: userData, error } = await supabase
            .from("users")
            .select("name, email")
            .eq("id", sessionData.session.user.id)
            .single();

          if (error) throw error;

          if (userData) {
            setBookingData((prev) => ({
              ...prev,
              clientName: userData.name,
              clientEmail: userData.email,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleBooking = async () => {
    if (!finalGuideId) {
      toast({
        title: "Erro",
        description: "ID do guia não fornecido",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        toast({
          title: "Faça login",
          description: "Você precisa estar logado para fazer uma reserva",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // Create booking in database
      const bookingPayload = {
        user_id: sessionData.session.user.id,
        guide_id: finalGuideId,
        date: bookingData.date,
        participants: bookingData.participants,
        total_price: guideData.price * bookingData.participants,
        status: "pending",
      };

      const { data, error } = await createBooking(bookingPayload);

      if (error) throw error;

      // Send notification email (would be implemented in a real app)

      toast({
        title: "Reserva confirmada",
        description: "Sua reserva foi realizada com sucesso!",
      });

      setStep(3); // Move to confirmation step
    } catch (error: any) {
      console.error("Error processing booking:", error);
      toast({
        title: "Erro",
        description:
          error.message || "Ocorreu um erro ao processar sua reserva",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep1 = () => {
    if (!bookingData.date) {
      toast({
        title: "Data obrigatória",
        description: "Por favor, selecione uma data para o tour",
        variant: "destructive",
      });
      return false;
    }

    if (!bookingData.clientName || !bookingData.clientEmail) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha seu nome e email",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  if (isLoading && step === 1) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="mt-2">Carregando informações...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
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
                    participants: parseInt(e.target.value) || 1,
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

            <Button
              className="w-full"
              onClick={() => validateStep1() && setStep(2)}
            >
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
                    <span>Local:</span>
                    <span>{guideData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span>
                      {new Date(bookingData.date).toLocaleDateString("pt-BR")}
                    </span>
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

            <Button
              className="w-full"
              onClick={handleBooking}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Confirmar Reserva"
              )}
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
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => navigate("/reservas")}
              >
                Minhas Reservas
              </Button>
              <Button className="w-1/2" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmation;
