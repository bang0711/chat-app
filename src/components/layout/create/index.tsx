import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import { ChevronRight, Image, Music, Palette, Video } from "lucide-react";

function SidebarCreate() {
  const createItems = [
    {
      title: "Images",
      icon: Image,
      href: "#",
    },
    {
      title: "Music",
      icon: Music,
      href: "#",
    },
    {
      title: "Video",
      icon: Video,
      href: "#",
    },
  ];
  return (
    <Collapsible asChild className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip="Create"
            className="flex items-center gap-2 font-bold"
          >
            <Palette />
            <span>Create</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {createItems.map((item) => (
            <SidebarMenuSub key={item.title}>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          ))}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default SidebarCreate;
