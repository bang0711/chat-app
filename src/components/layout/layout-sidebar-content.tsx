import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { HomeIcon } from "lucide-react";

import SidebarChat from "./chat";
import SidebarTools from "./tools";
import SidebarCreate from "./create";

import { ModelResponse } from "ollama";

import { ChatWithMessagesContent } from "@/types";

type Props = {
  models: ModelResponse[];
  chats: ChatWithMessagesContent[];
};

function LayoutSidebarContent({ models, chats }: Props) {
  return (
    <SidebarContent className="styled-scrollbar flex h-full w-full flex-col overflow-y-auto">
      <SidebarGroup>
        <SidebarMenu>
          {/* Dashboard Link */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard" asChild>
              <Link href={"/"} className="flex items-center gap-2 font-bold">
                <HomeIcon className="size-5" />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarChat models={models} chats={chats} />
          <SidebarCreate />
          <SidebarTools />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

export default LayoutSidebarContent;
