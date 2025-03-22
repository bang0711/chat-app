import { Chat, File, Message, MessageRole } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  title: string;
  icon?: LucideIcon;
  href: string;
  isActive?: boolean;
  items?: SidebarItem[]; // Optional nested items
};

export type ChatWithMessages = Chat & {
  messages: Message[];
};

export type CreateMessageProp = {
  chatId: string;
  content: string;
  role: MessageRole;
  fileUrl: string | "";
  file: {
    name: string;
    size: number;
    type: string;
  } | null;
};

export type MessageWithFile = Message & {
  file: Partial<File>;
};

export type ChatWithMessagesContent = Chat & {
  messages: {
    content: string;
  }[];
};
