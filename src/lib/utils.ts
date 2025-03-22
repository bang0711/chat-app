import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFileIcon = (file: File | null) => {
  if (!file) return null;

  const fileType = file.name.split(".").pop()?.toLowerCase();

  const fileIcons: { [key: string]: string } = {
    doc: "/icons/doc.svg",
    docx: "/icons/docx.svg",
    pdf: "/icons/pdf.svg",
    csv: "/icons/csv.svg",
    xlsx: "/icons/xlsx.png",
    xls: "/icons/xls.png",
    txt: "/icons/txt.svg",
  };

  return fileIcons[fileType || ""] || "/icons/other.svg"; // Default file icon
};

export const processThinkTags = (content: string) => {
  // Create a more reliable approach to parsing <think> tags
  const parts = [];
  let currentText = "";
  let isInThinkBlock = false;
  let index = 0;

  while (index < content.length) {
    // Look for opening <think> tag
    if (!isInThinkBlock && content.substring(index, index + 7) === "<think>") {
      // Save the text before the tag
      if (currentText) {
        parts.push({ content: currentText, isThink: false });
        currentText = "";
      }
      isInThinkBlock = true;
      index += 7; // Move past <think>
    }
    // Look for closing </think> tag
    else if (
      isInThinkBlock &&
      content.substring(index, index + 8) === "</think>"
    ) {
      // Save the text inside the think block
      if (currentText) {
        parts.push({ content: currentText, isThink: true });
        currentText = "";
      }
      isInThinkBlock = false;
      index += 8; // Move past </think>
    } else {
      // Add the current character to our buffer
      currentText += content[index];
      index++;
    }
  }

  // Add any remaining text
  if (currentText) {
    parts.push({ content: currentText, isThink: isInThinkBlock });
  }

  return parts;
};
