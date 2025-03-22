import { clearChat } from "@/actions/chat.action";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

import { SIDEBAR_CHAT_PROVIDERS } from "@/lib/constants";

import { ChevronRight, TimerReset, Trash2 } from "lucide-react";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { ChatWithMessagesContent } from "@/types";
import Link from "next/link";

type Props = {
  chats: ChatWithMessagesContent[];
};

function ChatHistory({ chats }: Props) {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleClearChat = async () => {
    setIsLoading(true);
    const { message, success } = await clearChat();

    if (!success) {
      toast.error(message);
      setIsLoading(false);
      return;
    }

    router.refresh();
    toast.success(message);
    setIsLoading(false);
  };
  return (
    <SidebarMenuSub>
      <Collapsible asChild className="group/submenu">
        <SidebarMenuSubItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton>
              <TimerReset />
              <span>History</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/submenu:rotate-90" />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-1">
            {chats.map((chat) => {
              const provider = SIDEBAR_CHAT_PROVIDERS.find(
                (p) => p.title === chat.provider,
              );
              return (
                <SidebarMenuSub key={chat.id}>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={id === chat.id}
                      className="flex cursor-pointer items-center gap-2"
                      asChild
                    >
                      <Link href={`/chat/${chat.id}`}>
                        {provider ? (
                          <Image
                            alt={chat.provider}
                            width={15}
                            height={15}
                            src={provider.image}
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            alt={chat.provider}
                            src={"/logo/ollama.png"}
                            width={15}
                            height={15}
                            className="object-cover dark:brightness-0 dark:invert"
                          />
                        )}

                        <span className="truncate">{chat.modelTitle}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              );
            })}

            {chats.length > 0 && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <Button
                    onClick={handleClearChat}
                    disabled={isLoading}
                    variant={"destructive"}
                  >
                    <Trash2 />
                    <span>Clear History</span>
                  </Button>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </CollapsibleContent>
        </SidebarMenuSubItem>
      </Collapsible>
    </SidebarMenuSub>
  );
}

export default ChatHistory;
