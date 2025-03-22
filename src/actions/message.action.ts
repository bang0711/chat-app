"use server";

import { prisma } from "@/lib/prisma";

import { getSession } from "@/lib/session";

import { CreateMessageProp } from "@/types";

export const sendMessage = async ({
  chatId,
  content,
  role,
  fileUrl,
  file,
}: CreateMessageProp) => {
  const session = await getSession();
  if (!session) {
    return { message: "Unauthorized", success: false, statusCode: 401 };
  }

  const newMessage = await prisma.message.create({
    data: {
      chatId,
      content,
      role,
    },
  });

  if (file && fileUrl) {
    await prisma.file.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileUrl,
        message: {
          connect: {
            id: newMessage.id,
          },
        },
      },
    });
  }

  return {
    message: "Message sent successfully",
    success: true,
    statusCode: 201,
  };
};
