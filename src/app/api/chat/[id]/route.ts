import { prisma } from "@/lib/prisma";

import { getSession } from "@/lib/session";

import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";
import { encode } from "gpt-tokenizer"; // Lightweight tokenizer for OpenAI models
import { MessageWithFile } from "@/types";

async function fetchImageAsBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new NextResponse("Failed to fetch image", { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer(); // Explicitly cast to ArrayBuffer
    const imageBuffer = Buffer.from(arrayBuffer); // This should now be correctly typed

    const base64 = imageBuffer.toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 400 });
  }
}

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const body = await request.json();

  const messages = body.messages as Partial<MessageWithFile>[];

  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    return new NextResponse("No user message found", { status: 400 });
  }

  const { id } = await params;

  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
  });

  if (!chat) {
    return new NextResponse("Chat not found", { status: 404 });
  }

  const session = getSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { model, baseUrl } = chat;
  const openai = new OpenAI({
    apiKey: "ollama",
    baseURL: baseUrl,
  });

  // Convert all images in messages to base64
  const formattedMessages = await Promise.all(
    messages.map(async (m, index) => {
      const isLast = index === messages.length - 1;

      if (isLast && m.file?.url) {
        const imageBase64 = await fetchImageAsBase64(m.file.url);
        if (imageBase64) {
          return {
            role: m.role,
            content: [
              { type: "text", text: m.content ?? "" },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                  detail: "auto",
                },
              },
            ],
          };
        }
      }
      return { role: m.role, content: m.content };
    }),
  );

  const stream = new ReadableStream({
    async start(controller) {
      const response = await openai.chat.completions.create({
        model,
        // @ts-expect-error it's fine
        messages: formattedMessages,
        max_tokens: 8000,
        stream: true,
      });

      let promptTokens = 0;
      let completionTokens = 0;
      let contentToUpdate = "";

      for (const message of messages) {
        promptTokens += encode(message.content!).length;
      }

      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";

        controller.enqueue(new TextEncoder().encode(content));

        contentToUpdate += content;

        completionTokens += encode(content).length;
      }

      const totalTokens = promptTokens + completionTokens;

      await prisma.message.create({
        data: {
          content: contentToUpdate,
          role: "AI",
          chatId: id,
          token: totalTokens,
        },
      });

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
