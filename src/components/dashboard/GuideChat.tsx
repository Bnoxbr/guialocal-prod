import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface Message {
  id: string;
  sender: "guide" | "tourist";
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  touristName: string;
  touristPhoto: string;
  messages: Message[];
}

const GuideChat = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const chats: Chat[] = [
    {
      id: "1",
      touristName: "João Silva",
      touristPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
      messages: [
        {
          id: "1",
          sender: "tourist",
          text: "Olá! Gostaria de saber mais sobre o tour na Serra da Mantiqueira.",
          timestamp: "2024-03-20T10:00:00",
        },
        {
          id: "2",
          sender: "guide",
          text: "Olá João! Claro, será um prazer ajudar. Que tipo de informação você precisa?",
          timestamp: "2024-03-20T10:05:00",
        },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "guide",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Here you would typically send the message to your backend
    setNewMessage("");
  };

  return (
    <div className="flex h-[600px] gap-4">
      <Card className="w-1/3">
        <CardContent className="p-4">
          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedChat?.id === chat.id ? "bg-gray-100" : ""}`}
                onClick={() => setSelectedChat(chat)}
              >
                <Avatar>
                  <AvatarImage src={chat.touristPhoto} />
                  <AvatarFallback>{chat.touristName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{chat.touristName}</p>
                  <p className="text-sm text-gray-500">
                    {chat.messages[chat.messages.length - 1]?.text.slice(0, 30)}
                    ...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="p-4 h-full flex flex-col">
          {selectedChat ? (
            <>
              <div className="flex items-center space-x-4 mb-4 p-2 border-b">
                <Avatar>
                  <AvatarImage src={selectedChat.touristPhoto} />
                  <AvatarFallback>{selectedChat.touristName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedChat.touristName}</p>
                </div>
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "guide" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${message.sender === "guide" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Enviar</Button>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Selecione um chat para começar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideChat;
