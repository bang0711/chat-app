"use client";

import {
  BadgeCheck,
  ChevronsUpDown,
  CircleDollarSign,
  LogOut,
  PanelLeftIcon,
  Settings2,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Props = {
  verified: boolean;
};

function LayoutSidebarFooter({ verified }: Props) {
  const { isMobile, toggleSidebar } = useSidebar();

  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{"Bang Chau"}</span>
                <span className="truncate text-xs">{"bang2004@gmail.com"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="absolute -end-1.5 -top-1.5">
                    {verified ? (
                      <>
                        <span className="sr-only">Verified</span>
                        <BadgeCheck
                          className="text-primary-foreground dark:text-primary size-4"
                          fill="primary"
                        />
                      </>
                    ) : null}
                  </span>
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{"Bang Chau"}</span>

                  <span className="truncate text-xs">
                    {"bang2004@gmail.com"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            {!verified && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={toggleSidebar}>
              <PanelLeftIcon />
              Toggle Sidebar
            </DropdownMenuItem>

            <DropdownMenuItem>
              <CircleDollarSign />
              Pricing
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings2 />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.refresh(),
                  },
                });
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default LayoutSidebarFooter;
