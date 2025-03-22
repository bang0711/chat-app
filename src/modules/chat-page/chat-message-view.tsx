import { Message } from "@prisma/client";

import { Dispatch, SetStateAction, useEffect } from "react";

import ChatLoading from "./chat-loading";
import MessageList from "./message-list";
import MessageContent from "./message-content";

import axios from "axios";
import { useParams } from "next/navigation";
import { MessageWithFile } from "@/types";
import Image from "next/image";

type Props = {
  messages: Partial<MessageWithFile>[];
  setMessages: Dispatch<SetStateAction<Partial<MessageWithFile>[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

function ChatMessageView({
  messages,
  isLoading,
  setIsLoading,
  setMessages,
}: Props) {
  const { id } = useParams();

  useEffect(() => {
    const isLastMessageFromUser = messages[messages.length - 1].role === "USER";

    const updateLastMessage = (newText: string) => {
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, content: newText } : msg,
        ),
      );
    };

    const handleSendChat = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `/api/chat/${id as string}`,
          {
            messages,
          },
          {
            adapter: "fetch",
            responseType: "stream",
          },
        );

        const stream = res.data;
        const textDecoder = new TextDecoder();

        const assistantMessage: Partial<Message> = {
          content: "",
          role: "AI",
        };
        setMessages((prev) => [...prev, assistantMessage]);

        setIsLoading(false);

        let accumulatedResponse = "";

        for await (const chunk of stream) {
          const chunkText = textDecoder.decode(chunk);
          accumulatedResponse += chunkText;
          updateLastMessage(accumulatedResponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLastMessageFromUser) {
      console.log("called");
      handleSendChat();
    }
  }, [id, messages, setIsLoading, setMessages]);

  return (
    <MessageList>
      {messages.map((message, i) => {
        const isUser = message.role === "USER";

        return (
          <div key={i} className={`flex w-full gap-2`}>
            <div
              className={`mx-auto flex w-full max-w-[70%] gap-2 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {isUser ? (
                <div className="w-fit">
                  {message.file && (
                    <Image
                      src={message.file.url!}
                      alt={message.file.name!}
                      width={200}
                      height={200}
                      className="mb-6 justify-self-end rounded-md object-cover"
                    />
                  )}
                  <p className="text-primary-foreground bg-primary w-fit justify-self-end rounded-lg p-3 text-right">
                    {message.content}
                  </p>
                </div>
              ) : (
                <MessageContent content={message.content!} />
              )}
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex w-full gap-2">
          <div className="mx-auto flex w-full max-w-[70%] gap-2">
            <ChatLoading />
          </div>
        </div>
      )}
    </MessageList>
  );
}

export default ChatMessageView;
