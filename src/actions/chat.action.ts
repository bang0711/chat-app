"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const createChat = async ({
  provider,
  model,
  baseUrl,
  modelTitle,
}: CreateChatProps) => {
  const session = await getSession();

  if (!session) {
    return {
      message: "Unauthorized",
      success: false,
      statusCode: 401,
    };
  }

  const newChat = await prisma.chat.create({
    data: {
      provider,
      model,
      baseUrl,
      modelTitle,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return {
    message: "Chat created successfully",
    success: true,
    statusCode: 201,
    data: newChat,
  };
};

export const clearChat = async () => {
  const session = await getSession();
  if (!session) {
    return {
      message: "Unauthorized",
      success: false,
      statusCode: 401,
    };
  }

  await prisma.chat.deleteMany({
    where: {
      userId: session.user.id,
    },
  });

  return {
    message: "Chat cleared successfully",
    success: true,
    statusCode: 200,
  };
};
