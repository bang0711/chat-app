"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar, useSidebar, SidebarFooter } from "@/components/ui/sidebar";

import ThemeSwitcher from "@/components/theme-switcher";

import LayoutSidebarHeader from "./layout-sidebar-header";
import LayoutSidebarContent from "./layout-sidebar-content";
import LayoutSidebarFooter from "./layout-sidebar-footer";

import { ModelResponse } from "ollama";

import { ChatWithMessagesContent } from "@/types";

type Props = {
  models: ModelResponse[];
  chats: ChatWithMessagesContent[];
};

function LayoutSidebar({ models, chats }: Props) {
  const { state, isMobile } = useSidebar();
  const open = state === "expanded";

  return (
    <Sidebar collapsible="icon">
      <LayoutSidebarHeader open={open} />

      <Separator className="my-1" />

      <LayoutSidebarContent models={models} chats={chats} />

      <SidebarFooter
        className={`flex items-center gap-2 ${isMobile || !open ? "flex-col-reverse" : "flex-row"}`}
      >
        <LayoutSidebarFooter verified={false} />
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}

export default LayoutSidebar;
