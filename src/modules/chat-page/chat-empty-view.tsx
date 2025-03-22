import { Chat, Message } from "@prisma/client";

import Image from "next/image";

import { Dispatch, SetStateAction } from "react";
import ChatInput from "./chat-input";

type Props = {
  chat: Chat;
  logo: string | undefined;
  setMessages: Dispatch<SetStateAction<Partial<Message>[]>>;
};

function ChatEmptyView({ chat, logo, setMessages }: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto w-2/3 space-y-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            alt="Logo"
            src={logo || "/logo/ollama.png"}
            width={100}
            height={100}
            className={`mx-auto size-20 rounded-lg object-cover ${!logo && "dark:brightness-0 dark:invert"}`}
          />
          <h1 className="text-center text-3xl font-bold">{chat.modelTitle}</h1>
          <p className="text-muted-foreground">
            Start a conversation by typing a message below
          </p>
        </div>

        <ChatInput setMessages={setMessages} />
      </div>
    </div>
  );
}

export default ChatEmptyView;
