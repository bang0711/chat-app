import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import LayoutSidebar from "./layout-sidebar";

import { cookies } from "next/headers";

import ollama from "ollama";
import { prisma } from "@/lib/prisma";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const models = (await ollama.list()).models;

  const chats = await prisma.chat.findMany({
    include: {
      messages: {
        select: {
          content: true,
        },
      },
    },
  });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <LayoutSidebar models={models} chats={chats} />

      <SidebarInset className="max-h-screen flex-1">{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
