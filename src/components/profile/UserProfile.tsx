import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadImage } from "@/lib/storage";
import { getCurrentUser } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  photo_url: string | null;
  phone: string;
  address: string;
}

interface Booking {
  id: string;
  date: string;
  guide_name: string;
  location: string;
  status: string;
  total_price: number;
}

const UserProfile = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    photo_url: null,
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const { user } = await getCurrentUser();

        if (user) {
          // In a real app, you would fetch the user profile from your database
          setUserData({
            id: user.id,
            name: user.user_metadata?.name || "Usuário",
            email: user.email || "",
            photo_url: user.user_metadata?.avatar_url || null,
            phone: user.user_metadata?.phone || "",
            address: user.user_metadata?.address || "",
          });

          // Mock bookings data - in a real app, you would fetch from your database
          setBookings([
            {
              id: "1",
              date: "2023-10-15",
              guide_name: "Maria Silva",
              location: "Serra da Mantiqueira",
              status: "Confirmado",
              total_price: 250,
            },
            {
              id: "2",
              date: "2023-11-20",
              guide_name: "João Santos",
              location: "Ubatuba",
              status: "Pendente",
              total_price: 180,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do usuário",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would update the user profile in your database
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(file);
      setUserData({ ...userData, photo_url: imageUrl });
      toast({
        title: "Sucesso",
        description: "Foto de perfil atualizada",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer o upload da imagem",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="bookings">Minhas Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userData.photo_url || undefined} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button variant="outline" type="button">
                      Alterar Foto
                    </Button>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isLoading}
                    />
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={userData.address}
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">
                              {booking.guide_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.location} - {booking.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              R$ {booking.total_price}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.status}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Você ainda não possui reservas.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
