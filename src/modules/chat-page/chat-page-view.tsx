"use client";

import { useState } from "react";

import { ChatWithMessages, MessageWithFile } from "@/types";

import ChatEmptyView from "./chat-empty-view";
import ChatMessageView from "./chat-message-view";
import ChatInput from "./chat-input";

type Props = {
  chat: ChatWithMessages;
  logo: string | undefined;
};

function ChatPageView({ chat, logo }: Props) {
  const [messages, setMessages] = useState<Partial<MessageWithFile>[]>(
    chat.messages,
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {messages.length === 0 ? (
        <ChatEmptyView chat={chat} logo={logo} setMessages={setMessages} />
      ) : (
        <div className="flex h-full flex-1 flex-col justify-between gap-3 p-3">
          <div className="flex-1 overflow-y-auto">
            <ChatMessageView
              messages={messages}
              setMessages={setMessages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          <ChatInput setMessages={setMessages} />
        </div>
      )}
    </>
  );
}

export default ChatPageView;
