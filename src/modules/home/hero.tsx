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
{
  /* <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="size-8"><path d="M2.30047 8.77631L12.0474 23H16.3799L6.63183 8.77631H2.30047ZM6.6285 16.6762L2.29492 23H6.63072L8.79584 19.8387L6.6285 16.6762ZM17.3709 1L9.88007 11.9308L12.0474 15.0944L21.7067 1H17.3709ZM18.1555 7.76374V23H21.7067V2.5818L18.1555 7.76374Z" fill="currentColor"></path></svg> */
}
