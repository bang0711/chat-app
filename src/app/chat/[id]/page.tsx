import { SIDEBAR_CHAT_PROVIDERS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

import { ChatPageView } from "@/modules/chat-page";

import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function ChatPage({ params }: Props) {
  const { id } = await params;

  const session = await getSession();

  if (!session) redirect("/");

  const chat = await prisma.chat.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      messages: {
        include: {
          file: true,
        },
      },
    },
  });

  if (!chat) {
    redirect("/");
  }

  const logo = SIDEBAR_CHAT_PROVIDERS.find(
    (provider) => provider.title === chat.provider,
  )?.image;

  return (
    <div className="container mx-auto h-full max-h-full">
      <ChatPageView chat={chat} logo={logo} />
    </div>
  );
}

export default ChatPage;
