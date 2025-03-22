import { createChat } from "@/actions/chat.action";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

import { SIDEBAR_CHAT_PROVIDERS } from "@/lib/constants";

import { BrainCircuit, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";

import { ModelResponse } from "ollama";
import Image from "next/image";

type Props = {
  models: ModelResponse[];
};

function ChatAIProviders({ models }: Props) {
  const router = useRouter();

  const handleClick = async ({
    baseUrl,
    model,
    provider,
    modelTitle,
  }: CreateChatProps) => {
    const { message, success, data } = await createChat({
      baseUrl,
      model,
      provider,
      modelTitle,
    });

    if (!success) {
      toast.error(message);
      return;
    }

    router.push(`/chat/${data?.id}`);
  };
  return (
    <SidebarMenuSub>
      <Collapsible className="group/submenu" asChild>
        <SidebarMenuSubItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton href="#">
              <BrainCircuit />
              <span>Models</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/submenu:rotate-90" />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {SIDEBAR_CHAT_PROVIDERS.map((provider, i) => (
              <SidebarGroup key={i}>
                <SidebarGroupLabel>{provider.title}</SidebarGroupLabel>

                {provider.models.map((model) => (
                  <SidebarMenuSub key={model.id}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        className="cursor-pointer text-xs"
                        onClick={() =>
                          handleClick({
                            baseUrl: provider.baseURL,
                            model: model.id,
                            provider: provider.title,
                            modelTitle: model.title,
                          })
                        }
                      >
                        <Image
                          alt={provider.title}
                          src={provider.image}
                          width={15}
                          height={15}
                          className=""
                        />
                        {model.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                ))}
              </SidebarGroup>
            ))}

            <SidebarGroup>
              <SidebarGroupLabel>Ollama</SidebarGroupLabel>
              {models.map((model) => (
                <SidebarMenuSub key={model.name}>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      className="cursor-pointer text-xs"
                      onClick={() =>
                        handleClick({
                          baseUrl: process.env.NEXT_PUBLIC_OLLAMA_URL!,
                          model: model.name,
                          provider: "Ollama",
                          modelTitle: model.name,
                        })
                      }
                    >
                      <Image
                        alt={model.name}
                        src={"/logo/ollama.png"}
                        width={15}
                        height={15}
                        className="dark:brightness-0 dark:invert"
                      />
                      {model.name}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              ))}
            </SidebarGroup>
          </CollapsibleContent>
        </SidebarMenuSubItem>
      </Collapsible>
    </SidebarMenuSub>
  );
}

export default ChatAIProviders;
