import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const GuideProfile = () => {
  const [profile, setProfile] = useState({
    name: "Maria Silva",
    email: "maria@example.com",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    location: "Serra da Mantiqueira",
    languages: ["Português", "Inglês", "Espanhol"],
    specialties: ["Trekking", "Fotografia", "Turismo Cultural"],
    cadasturNumber: "12345678",
    instagram: "@mariasilva",
    tripadvisor: "maria-silva-guide",
  });

  const handleSave = () => {
    // Here you would typically save the profile to your backend
    console.log("Saving profile:", profile);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.photo} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Alterar Foto</Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Número do Cadastur</Label>
              <Input
                value={profile.cadasturNumber}
                onChange={(e) =>
                  setProfile({ ...profile, cadasturNumber: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Região de Atuação</Label>
              <Input
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Especialidades e Idiomas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Especialidades</Label>
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                + Adicionar
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Idiomas</Label>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <Badge key={language} variant="outline">
                  {language}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                + Adicionar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input
              value={profile.instagram}
              onChange={(e) =>
                setProfile({ ...profile, instagram: e.target.value })
              }
              placeholder="@seu.perfil"
            />
          </div>

          <div className="space-y-2">
            <Label>TripAdvisor</Label>
            <Input
              value={profile.tripadvisor}
              onChange={(e) =>
                setProfile({ ...profile, tripadvisor: e.target.value })
              }
              placeholder="Link do seu perfil"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </div>
    </div>
  );
};

export default GuideProfile;
