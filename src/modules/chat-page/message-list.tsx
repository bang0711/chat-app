"use client";

import { Button } from "@/components/ui/button";

import { useAutoScroll } from "@/hooks/use-auto-scroll";

import { ArrowDown } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

function MessageList({ children }: Props) {
  const { scrollRef, isAtBottom, scrollToBottom, disableAutoScroll } =
    useAutoScroll({
      content: children,
    });

  return (
    <div className="relative h-full w-full">
      <div
        className={`styled-scrollbar flex h-full w-full flex-col overflow-y-auto p-4`}
        ref={scrollRef}
        onWheel={disableAutoScroll}
        onTouchMove={disableAutoScroll}
      >
        <div className="flex flex-col gap-6">{children}</div>
      </div>

      {!isAtBottom && (
        <Button
          onClick={() => {
            scrollToBottom();
          }}
          size="icon"
          className="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 transform rounded-full shadow-md"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default MessageList;
