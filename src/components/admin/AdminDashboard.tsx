import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Image as ImageIcon,
  Map,
} from "lucide-react";
import { uploadImage } from "@/lib/storage";

// Mock data for the regions that would normally come from a database
const regionsData = {
  "Serra da Mantiqueira": {
    summary:
      "Região montanhosa com clima ameno, cachoeiras e trilhas deslumbrantes. Ideal para ecoturismo, aventuras ao ar livre e gastronomia local.",
    mainImage:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80",
  },
  "Serra do Mar": {
    summary:
      "Cordilheira que se estende ao longo do litoral, com Mata Atlântica preservada, cachoeiras e vistas panorâmicas. Perfeita para trilhas, observação de aves e contato com a natureza.",
    mainImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  },
  "Litoral Norte Paulista": {
    summary:
      "Praias paradisíacas, ilhas e reservas naturais. Destino ideal para esportes aquáticos, passeios de barco e gastronomia à beira-mar.",
    mainImage:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
  },
  "Sul Fluminense": {
    summary:
      "Região histórica com cidades coloniais, baías e ilhas paradisíacas. Combina patrimônio cultural, praias tranquilas e gastronomia tradicional.",
    mainImage:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
  },
};

interface RegionEditorProps {
  regionName: string;
}

const RegionEditor = ({ regionName }: RegionEditorProps) => {
  const region = regionsData[regionName as keyof typeof regionsData];
  const [summary, setSummary] = useState(region.summary);
  const [mainImage, setMainImage] = useState(region.mainImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // In a real app, this would upload to your storage service
      // const imageUrl = await uploadImage(file);
      // For demo purposes, we'll just use a timeout to simulate upload
      setTimeout(() => {
        setMainImage(URL.createObjectURL(file));
        setIsUploading(false);
      }, 1500);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, this would save to your database
    setTimeout(() => {
      // Update the mock data (in a real app, this would be a database update)
      regionsData[regionName as keyof typeof regionsData] = {
        ...regionsData[regionName as keyof typeof regionsData],
        summary,
        mainImage,
      };
      setIsSaving(false);
      alert(`Região ${regionName} atualizada com sucesso!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="region-summary"
            className="text-base font-medium mb-2 block"
          >
            Descrição da Região
          </Label>
          <Textarea
            id="region-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="min-h-[150px]"
            placeholder="Descreva a região..."
          />
        </div>

        <div>
          <Label
            htmlFor="region-image"
            className="text-base font-medium mb-2 block"
          >
            Imagem Principal
          </Label>
          <div className="border rounded-md p-4 space-y-4">
            <div className="aspect-video rounded-md overflow-hidden bg-gray-100">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={regionName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Label
                htmlFor={`image-upload-${regionName}`}
                className="cursor-pointer flex items-center gap-2 text-sm font-medium px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
              >
                <ImageIcon className="h-4 w-4" />
                Alterar Imagem
              </Label>
              <Input
                id={`image-upload-${regionName}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              {isUploading && (
                <span className="text-sm text-muted-foreground">
                  Enviando...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      type: "tourist",
      created_at: "2023-05-15",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria@example.com",
      type: "guide",
      created_at: "2023-06-20",
    },
    {
      id: 3,
      name: "Carlos Santos",
      email: "carlos@example.com",
      type: "tourist",
      created_at: "2023-07-10",
    },
    {
      id: 4,
      name: "Ana Pereira",
      email: "ana@example.com",
      type: "guide",
      created_at: "2023-08-05",
    },
  ];

  const bookings = [
    {
      id: 1,
      user_name: "João Silva",
      guide_name: "Maria Oliveira",
      date: "2023-09-15",
      amount: 250,
      status: "completed",
    },
    {
      id: 2,
      user_name: "Carlos Santos",
      guide_name: "Ana Pereira",
      date: "2023-09-20",
      amount: 180,
      status: "pending",
    },
    {
      id: 3,
      user_name: "João Silva",
      guide_name: "Ana Pereira",
      date: "2023-09-25",
      amount: 320,
      status: "cancelled",
    },
    {
      id: 4,
      user_name: "Carlos Santos",
      guide_name: "Maria Oliveira",
      date: "2023-10-05",
      amount: 200,
      status: "confirmed",
    },
  ];

  const payments = [
    {
      id: 1,
      booking_id: 1,
      amount: 250,
      method: "credit_card",
      status: "completed",
      date: "2023-09-15",
    },
    {
      id: 2,
      booking_id: 2,
      amount: 180,
      method: "pix",
      status: "pending",
      date: "2023-09-20",
    },
    {
      id: 3,
      booking_id: 4,
      amount: 200,
      method: "credit_card",
      status: "completed",
      date: "2023-10-05",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelado</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmado</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guide_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredPayments = payments.filter((payment) =>
    payment.booking_id.toString().includes(searchTerm),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total de Usuários</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total de Reservas</p>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Pagamentos</p>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
            <CreditCard className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold">
                R$ {payments.reduce((sum, payment) => sum + payment.amount, 0)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, email ou ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="bookings">Reservas</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="regions">Regiões</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.type === "guide"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }
                          >
                            {user.type === "guide" ? "Guia" : "Turista"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.created_at}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Nenhum usuário encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Turista</TableHead>
                    <TableHead>Guia</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.user_name}</TableCell>
                        <TableCell>{booking.guide_name}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>R$ {booking.amount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Nenhuma reserva encontrada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>ID da Reserva</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.booking_id}</TableCell>
                        <TableCell>R$ {payment.amount}</TableCell>
                        <TableCell>
                          {payment.method === "credit_card"
                            ? "Cartão de Crédito"
                            : "PIX"}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Nenhum pagamento encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Regiões</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Serra da Mantiqueira" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="Serra da Mantiqueira">
                    Serra da Mantiqueira
                  </TabsTrigger>
                  <TabsTrigger value="Serra do Mar">Serra do Mar</TabsTrigger>
                  <TabsTrigger value="Litoral Norte Paulista">
                    Litoral Norte Paulista
                  </TabsTrigger>
                  <TabsTrigger value="Sul Fluminense">
                    Sul Fluminense
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Serra da Mantiqueira">
                  <RegionEditor regionName="Serra da Mantiqueira" />
                </TabsContent>

                <TabsContent value="Serra do Mar">
                  <RegionEditor regionName="Serra do Mar" />
                </TabsContent>

                <TabsContent value="Litoral Norte Paulista">
                  <RegionEditor regionName="Litoral Norte Paulista" />
                </TabsContent>

                <TabsContent value="Sul Fluminense">
                  <RegionEditor regionName="Sul Fluminense" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
