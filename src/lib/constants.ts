import { Bot, File, Image, MessageCircleMore } from "lucide-react";

export const SIDEBAR_CHAT_PROVIDERS = [
  {
    title: "OpenAI",
    image: "/logo/openai.webp",
    baseURL: "https://api.openai.com/v1",
    models: [
      {
        title: "GPT-4o",
        id: "gpt-4o",
      },
      {
        title: "GPT-4o Mini",
        id: "gpt-4o-mini",
      },
      {
        title: "o1",
        id: "o1",
      },
      {
        title: "o3-mini",
        id: "o3-mini",
      },
    ],
  },
  {
    title: "Anthropic",
    image: "/logo/anthropic.jpg",
    baseURL: "https://api.anthropic.com/v1",
    models: [
      {
        title: "Claude 3",
        id: "claude-3",
      },
      {
        title: "Claude 3.5",
        id: "claude-3.5",
      },
    ],
  },
  {
    title: "Mistral",
    image: "/logo/mistral.png",
    baseURL: "https://api.mistral.ai/v1",
    models: [
      {
        title: "Mistral 7B",
        id: "mistral-7b",
      },
      {
        title: "Mistral 7B Instruct",
        id: "mistral-7b-instruct",
      },
    ],
  },
  {
    title: "Gemini",
    image: "/logo/gemini.png",
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    models: [
      {
        title: "Gemini 1.5",
        id: "gemini-1.5",
      },
      {
        title: "Gemini 2",
        id: "gemini-2",
      },
    ],
  },
  {
    title: "Deepseek",
    image: "/logo/deepseek.png",
    baseURL: "https://api.deepseek.com/v1",
    models: [
      {
        title: "DeepSeek R1",
        id: "deepseek-r1",
      },
      {
        title: "DeepSeek V3",
        id: "deepseek-v3",
      },
      {
        title: "DeepSeek-VL2",
        id: "deepseek-vl2",
      },
    ],
  },
  {
    title: "xAI",
    image: "/logo/xAI.svg",
    baseURL: "https://api.x.ai/v1",
    models: [
      {
        title: "Grok 2",
        id: "grok-2-latest",
      },
      {
        title: "Grok-1.5V",
        id: "grok-1.5v",
      },
    ],
  },
];

export const TOOLS_INTRODUCTION = [
  {
    title: "Image Studio",
    description: "Text to stunning visuals",
    icon: Image,
  },
  {
    title: "AI Chat",
    description: "Chat with several AIs",
    icon: MessageCircleMore,
  },
  {
    title: "Compare AI Models",
    description: "See how different AIs think",
    icon: Bot,
  },
  {
    title: "PDF Chat",
    description: "Chat with any documents",
    icon: File,
  },
];
