import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { MessageSquareMore, ChevronRight } from "lucide-react";

import ChatAIPlayground from "./chat-ai-playground";
import ChatAIProviders from "./chat-ai-providers";
import ChatHistory from "./chat-history";

import { ModelResponse } from "ollama";

import { ChatWithMessagesContent } from "@/types";

type Props = {
  models: ModelResponse[];
  chats: ChatWithMessagesContent[];
};

function SidebarChat({ models, chats }: Props) {
  return (
    <Collapsible asChild className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={"Chat"}
            className="flex items-center gap-2 font-bold"
          >
            <MessageSquareMore />
            <span>Chat</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ChatAIPlayground />

          <ChatAIProviders models={models} />

          <ChatHistory chats={chats} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default SidebarChat;
