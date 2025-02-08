"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  platform: "ebay" | "mercari" | "poshmark";
  read: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: string;
  platform: "ebay" | "mercari" | "poshmark";
  unread: number;
}

const conversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "John Smith",
      avatar: "",
    },
    lastMessage: "Is this item still available?",
    timestamp: "5m ago",
    platform: "ebay",
    unread: 1,
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      avatar: "",
    },
    lastMessage: "Would you accept $50?",
    timestamp: "15m ago",
    platform: "mercari",
    unread: 0,
  },
  {
    id: "3",
    user: {
      name: "Mike Wilson",
      avatar: "",
    },
    lastMessage: "Thanks for the quick shipping!",
    timestamp: "1h ago",
    platform: "poshmark",
    unread: 2,
  },
];

const messages: Message[] = [
  {
    id: "1",
    content: "Hi, is this item still available?",
    sender: "John Smith",
    timestamp: "10:30 AM",
    platform: "ebay",
    read: true,
  },
  {
    id: "2",
    content: "Yes, it's still available!",
    sender: "me",
    timestamp: "10:32 AM",
    platform: "ebay",
    read: true,
  },
  {
    id: "3",
    content: "Great! Would you accept $45?",
    sender: "John Smith",
    timestamp: "10:35 AM",
    platform: "ebay",
    read: false,
  },
];

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    "1"
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-accent transition-colors ${
                  selectedConversation === conversation.id ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback>
                      {conversation.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {conversation.user.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="capitalize"
                      >
                        {conversation.platform}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {conversation.timestamp}
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="ml-auto">{conversation.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Messages View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">
                    Last active: 2m ago
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[70%] ${
                        message.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs opacity-70">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle message send
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
