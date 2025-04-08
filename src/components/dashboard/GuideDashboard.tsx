import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import GuideProfile from "./GuideProfile";
import GuideBookings from "./GuideBookings";
import GuideChat from "./GuideChat";

const GuideDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Painel do Guia</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="bookings">Agendamentos</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <GuideProfile />
        </TabsContent>

        <TabsContent value="bookings">
          <GuideBookings />
        </TabsContent>

        <TabsContent value="chat">
          <GuideChat />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuideDashboard;
