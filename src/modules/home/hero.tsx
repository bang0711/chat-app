"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { SIDEBAR_CHAT_PROVIDERS } from "@/lib/constants";
import { Crown, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="space-y-6 rounded-lg border px-3 py-6">
        <Badge>Good morning, Bang Chau</Badge>
        <h1 className="text-3xl font-bold">
          Your Personalized <br /> AI Workspace
        </h1>
        <p className="text-muted-foreground w-lg">
          Experience the next generation of AI-powered creativity and
          productivity tools, all in one seamless workspace.
        </p>

        <div className="flex items-center gap-2">
          <Button asChild variant={"secondary"}>
            <Link href={"#"}>
              Start a new chat <Sparkle />
            </Link>
          </Button>

          <Button asChild>
            <Link href={"#"}>
              Upgrade to Premium <Crown />
            </Link>
          </Button>
        </div>
      </div>

      <InfiniteSlider
        gap={50}
        className="flex items-center justify-center rounded-lg border px-3 py-6"
      >
        {SIDEBAR_CHAT_PROVIDERS.map((provider, i) => (
          <Card key={i} className="flex flex-col justify-between px-6 py-3">
            <Image
              src={provider.image}
              alt={provider.title}
              width={50}
              height={50}
              className="mx-auto object-contain"
            />

            <CardContent>{provider.title}</CardContent>
          </Card>
        ))}

        <Card className="flex flex-col justify-between px-6 py-3">
          <Image
            src={"/logo/ollama.png"}
            alt={"Ollama"}
            width={50}
            height={50}
            className="mx-auto size-[50px] object-contain dark:brightness-0 dark:invert"
          />

          <CardContent>Ollama</CardContent>
        </Card>
      </InfiniteSlider>
    </div>
  );
}

export default Hero;
