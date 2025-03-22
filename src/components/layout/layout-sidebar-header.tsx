import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";

import { MessagesSquare } from "lucide-react";

type Props = {
  open: boolean;
};

function LayoutSidebarHeader({ open }: Props) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Tauri Chat"
            className={`${open ? "hover:bg-transparent" : ""}`}
          >
            <MessagesSquare />
            <span className="text-lg font-bold">Tauri Chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default LayoutSidebarHeader;
