import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="bookings">Reservas</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
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
      </Tabs>
    </div>
  );
}
