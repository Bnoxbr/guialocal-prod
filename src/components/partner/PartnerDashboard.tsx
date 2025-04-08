import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { uploadImage } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";
import { X, Upload, Calendar, Users } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  email: string;
  permissions: {
    bookings: boolean;
    content: boolean;
    customer_service: boolean;
  };
}

const PartnerDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const [newAgent, setNewAgent] = useState<Omit<Agent, "id">>({
    name: "",
    email: "",
    permissions: {
      bookings: false,
      content: false,
      customer_service: false,
    },
  });
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Ana Silva",
      email: "ana@example.com",
      permissions: {
        bookings: true,
        content: false,
        customer_service: true,
      },
    },
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check if adding new files would exceed the limit
    if (uploadedFiles.length + files.length > 10) {
      toast({
        title: "Limite excedido",
        description: "Você pode fazer upload de no máximo 10 arquivos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await uploadImage(file);
        setUploadedFiles((prev) => [
          ...prev,
          { name: file.name, url: imageUrl },
        ]);
      }

      toast({
        title: "Sucesso",
        description: `${files.length} arquivo(s) enviado(s) com sucesso`,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer o upload dos arquivos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Clear the input
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e email são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newAgentWithId: Agent = {
      ...newAgent,
      id: Date.now().toString(),
    };

    setAgents((prev) => [...prev, newAgentWithId]);
    setNewAgent({
      name: "",
      email: "",
      permissions: {
        bookings: false,
        content: false,
        customer_service: false,
      },
    });

    toast({
      title: "Agente adicionado",
      description: `${newAgent.name} foi adicionado como agente`,
    });
  };

  const removeAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel do Parceiro</h1>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">12 Reservas</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-md">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">256 Visualizações</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="media" className="space-y-6">
        <TabsList>
          <TabsTrigger value="media">Mídia</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Mídia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arraste e solte arquivos ou clique para fazer upload
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Máximo de 10 arquivos (imagens ou vídeos)
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline">Selecionar Arquivos</Button>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                  />
                </Label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <p className="text-xs truncate mt-1">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Agentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Adicionar Novo Agente
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Nome</Label>
                    <Input
                      id="agent-name"
                      value={newAgent.name}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, name: e.target.value })
                      }
                      placeholder="Nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-email">Email</Label>
                    <Input
                      id="agent-email"
                      type="email"
                      value={newAgent.email}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, email: e.target.value })
                      }
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Permissões</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bookings"
                          checked={newAgent.permissions.bookings}
                          onCheckedChange={(checked) =>
                            setNewAgent({
                              ...newAgent,
                              permissions: {
                                ...newAgent.permissions,
                                bookings: checked as boolean,
                              },
                            })
                          }
                        />
                        <Label htmlFor="bookings">Gerenciar Reservas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="content"
                          checked={newAgent.permissions.content}
                          onCheckedChange={(checked) =>
                            setNewAgent({
                              ...newAgent,
                              permissions: {
                                ...newAgent.permissions,
                                content: checked as boolean,
                              },
                            })
                          }
                        />
                        <Label htmlFor="content">Gerenciar Conteúdo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customer_service"
                          checked={newAgent.permissions.customer_service}
                          onCheckedChange={(checked) =>
                            setNewAgent({
                              ...newAgent,
                              permissions: {
                                ...newAgent.permissions,
                                customer_service: checked as boolean,
                              },
                            })
                          }
                        />
                        <Label htmlFor="customer_service">
                          Atendimento ao Cliente
                        </Label>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleAddAgent}>Adicionar Agente</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Agentes Ativos</h3>
                  {agents.length > 0 ? (
                    <div className="space-y-2">
                      {agents.map((agent) => (
                        <Card key={agent.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{agent.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {agent.email}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {agent.permissions.bookings && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                      Reservas
                                    </span>
                                  )}
                                  {agent.permissions.content && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                      Conteúdo
                                    </span>
                                  )}
                                  {agent.permissions.customer_service && (
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                                      Atendimento
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAgent(agent.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Nenhum agente cadastrado.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Conecte seu calendário para gerenciar suas reservas
                </p>
                <Button>Conectar com Google Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerDashboard;
