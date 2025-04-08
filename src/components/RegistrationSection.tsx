import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { registerTourist, registerGuide } from "@/lib/auth";

interface RegistrationSectionProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
}

const RegistrationSection = ({
  onSubmit = () => {},
  isLoading: externalLoading = false,
}: RegistrationSectionProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [touristForm, setTouristForm] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [guideForm, setGuideForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    languages: [],
    specialties: [],
    cadastur_number: "",
    tripadvisor: "",
    instagram: "",
    termsAccepted: false,
  });

  const handleTouristSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await registerTourist({
        name: touristForm.name,
        email: touristForm.email,
        password: touristForm.password,
      });
      toast({
        title: "Sucesso!",
        description: "Verifique seu email para confirmar o cadastro",
      });
      onSubmit(touristForm);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await registerGuide({
        ...guideForm,
        social_links: {
          tripadvisor: guideForm.tripadvisor,
          instagram: guideForm.instagram,
        },
      });
      toast({
        title: "Sucesso!",
        description: "Verifique seu email para confirmar o cadastro",
      });
      onSubmit(guideForm);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-[600px] bg-slate-50 py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-muted-foreground">
            Registre-se como turista ou guia para começar
          </p>
        </div>

        <Card className="max-w-[600px] mx-auto bg-white">
          <CardContent className="pt-6">
            <Tabs defaultValue="tourist" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="tourist">Turista</TabsTrigger>
                <TabsTrigger value="guide">Guia</TabsTrigger>
              </TabsList>

              <TabsContent value="tourist">
                <form className="space-y-4" onSubmit={handleTouristSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="tourist-name">Nome Completo</Label>
                    <Input
                      id="tourist-name"
                      placeholder="Digite seu nome completo"
                      value={touristForm.name}
                      onChange={(e) =>
                        setTouristForm({ ...touristForm, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tourist-email">Email</Label>
                    <Input
                      id="tourist-email"
                      type="email"
                      placeholder="Digite seu email"
                      value={touristForm.email}
                      onChange={(e) =>
                        setTouristForm({
                          ...touristForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tourist-password">Senha</Label>
                    <Input
                      id="tourist-password"
                      type="password"
                      placeholder="Crie uma senha"
                      value={touristForm.password}
                      onChange={(e) =>
                        setTouristForm({
                          ...touristForm,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tourist-terms"
                      checked={touristForm.termsAccepted}
                      onCheckedChange={(checked) =>
                        setTouristForm({
                          ...touristForm,
                          termsAccepted: checked as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="tourist-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Eu concordo com os termos e condições
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={
                      isLoading ||
                      !touristForm.name ||
                      !touristForm.email ||
                      !touristForm.password ||
                      !touristForm.termsAccepted
                    }
                  >
                    {isLoading ? "Registrando..." : "Registrar como Turista"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="guide">
                <form className="space-y-4" onSubmit={handleGuideSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="guide-name">Nome Completo</Label>
                    <Input
                      id="guide-name"
                      placeholder="Digite seu nome completo"
                      value={guideForm.name}
                      onChange={(e) =>
                        setGuideForm({ ...guideForm, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-email">Email</Label>
                    <Input
                      id="guide-email"
                      type="email"
                      placeholder="Digite seu email"
                      value={guideForm.email}
                      onChange={(e) =>
                        setGuideForm({ ...guideForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-password">Senha</Label>
                    <Input
                      id="guide-password"
                      type="password"
                      placeholder="Crie uma senha"
                      value={guideForm.password}
                      onChange={(e) =>
                        setGuideForm({ ...guideForm, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-specialties">Especialização</Label>
                    <Select
                      value={guideForm.specialties[0]}
                      onValueChange={(value) =>
                        setGuideForm({ ...guideForm, specialties: [value] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione suas especializações" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trekking">Trekking</SelectItem>
                        <SelectItem value="cultura-cafeeira">
                          Cultura Cafeeira
                        </SelectItem>
                        <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                        <SelectItem value="gastronomia">Gastronomia</SelectItem>
                        <SelectItem value="aventura">
                          Turismo de Aventura
                        </SelectItem>
                        <SelectItem value="cultural">
                          Turismo Cultural
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-location">Regiões de Atuação</Label>
                    <Select
                      value={guideForm.location}
                      onValueChange={(value) =>
                        setGuideForm({ ...guideForm, location: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione suas regiões" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="campos-jordao">
                          Campos do Jordão
                        </SelectItem>
                        <SelectItem value="sao-bento">
                          São Bento do Sapucaí
                        </SelectItem>
                        <SelectItem value="monte-verde">Monte Verde</SelectItem>
                        <SelectItem value="goncalves">Gonçalves</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-languages">Idiomas</Label>
                    <Select
                      value={guideForm.languages[0]}
                      onValueChange={(value) =>
                        setGuideForm({ ...guideForm, languages: [value] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os idiomas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portugues">Português</SelectItem>
                        <SelectItem value="ingles">Inglês</SelectItem>
                        <SelectItem value="espanhol">Espanhol</SelectItem>
                        <SelectItem value="frances">Francês</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-social">Links Externos</Label>
                    <Input
                      id="guide-tripadvisor"
                      placeholder="Link do TripAdvisor"
                      className="mb-2"
                      value={guideForm.tripadvisor}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          tripadvisor: e.target.value,
                        })
                      }
                    />
                    <Input
                      id="guide-instagram"
                      placeholder="Link do Instagram"
                      value={guideForm.instagram}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          instagram: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-license">Número do Cadastur</Label>
                    <Input
                      id="guide-license"
                      placeholder="Digite seu número do Cadastur"
                      value={guideForm.cadastur_number}
                      onChange={(e) =>
                        setGuideForm({
                          ...guideForm,
                          cadastur_number: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="guide-terms"
                      checked={guideForm.termsAccepted}
                      onCheckedChange={(checked) =>
                        setGuideForm({
                          ...guideForm,
                          termsAccepted: checked as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="guide-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Eu concordo com os termos e condições e processo de
                      verificação
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={
                      isLoading ||
                      !guideForm.name ||
                      !guideForm.email ||
                      !guideForm.password ||
                      !guideForm.location ||
                      !guideForm.languages.length ||
                      !guideForm.specialties.length ||
                      !guideForm.cadastur_number ||
                      !guideForm.termsAccepted
                    }
                  >
                    {isLoading ? "Registrando..." : "Registrar como Guia"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationSection;
