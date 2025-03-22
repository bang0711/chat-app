"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Dispatch, SetStateAction, useRef, useState } from "react";

import { Paperclip, Send } from "lucide-react";

import { useParams } from "next/navigation";

import { uploadFile } from "@/actions/file-upload";
import { sendMessage } from "@/actions/message.action";
import Image from "next/image";
import { getFileIcon } from "@/lib/utils";
import { MessageWithFile } from "@/types";

type Props = {
  setMessages: Dispatch<SetStateAction<Partial<MessageWithFile>[]>>;
};

function ChatInput({ setMessages }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURl, setFileURL] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [input, setInput] = useState("");

  const { id } = useParams();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const res = await uploadFile(file);
      setFileURL(res.fileUrl!);

      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  // Function to trigger file input click
  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSend = async () => {
    const newMessage: Partial<MessageWithFile> = {
      content: input,
      chatId: id as string,
      role: "USER",
    };

    if (selectedFile && fileURl) {
      newMessage.file = {
        url: fileURl,
        name: selectedFile.name,
        type: selectedFile.type,
      };
    }

    setMessages((prev) => [...prev, newMessage]);

    sendMessage({
      chatId: id as string,
      content: input,
      role: "USER",
      fileUrl: fileURl,
      file: selectedFile,
    });

    setInput("");
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <>
      {selectedFile && (
        <div className="mt-4 flex items-center gap-3">
          {previewUrl ? (
            // Display Image Preview
            <Image
              src={previewUrl}
              alt="Selected Image"
              width={50}
              height={50}
              className="rounded-md object-cover"
            />
          ) : (
            // Display File Icon
            <Image
              src={getFileIcon(selectedFile) as string}
              alt="File Icon"
              width={40}
              height={40}
            />
          )}
          <p className="text-muted-foreground text-sm">{selectedFile.name}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Textarea
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          className="styled-scrollbar field-sizing-content max-h-52 min-h-[none] resize-none"
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*,.doc,.docx,.pdf,.csv,.xls,.xlsx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Button triggers the file input */}
              <Button variant="outline" size="icon" onClick={handleAttachClick}>
                <Paperclip />
              </Button>
            </TooltipTrigger>

            <TooltipContent align="center" side="bottom">
              <p>Attach image or file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          size="icon"
          onClick={handleSend}
          disabled={input.trim() === "" && !selectedFile}
        >
          <Send />
        </Button>
      </div>
    </>
  );
}

export default ChatInput;
