import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
// Import KaTeX CSS
import "katex/dist/katex.min.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Check, BrainCircuit, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { processThinkTags } from "@/lib/utils";

type Props = {
  content: string;
};

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => console.error("Failed to copy code: ", err));
  };

  return (
    <div className="my-4 rounded-md border bg-[#282A36] transition-all duration-300">
      {/* Header with language, theme selector, and action buttons */}
      <div className="flex h-12 items-center justify-between border-b px-4 py-2 text-sm">
        <div className="flex items-center gap-2 text-white">
          <span>{language || "text"}</span>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative ml-2 rounded-md"
                  onClick={handleCopy}
                  aria-label={copied ? "Copied" : "Copy to clipboard"}
                >
                  <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
                  <Copy
                    className={`h-4 w-4 transition-all duration-300 ${
                      copied ? "scale-0" : "scale-100"
                    }`}
                  />
                  <Check
                    className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                      copied ? "scale-100" : "scale-0"
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <SyntaxHighlighter
        style={dracula}
        language={language || "text"}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "1rem 0",
          background: "transparent",
          fontSize: "0.875rem",
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineProps={() => ({
          style: {
            display: "block",
            width: "100%",
          },
        })}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

// Added Think component for AI thinking process
const Think = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-4 rounded-md border-l-4 border-purple-500 bg-purple-50 p-4 dark:bg-purple-900/20 dark:text-purple-100">
      <div className="mb-2 flex items-center gap-2">
        <BrainCircuit className="h-5 w-5 text-purple-500" />

        <span className="font-medium text-purple-700 dark:text-purple-300">
          AI Thinking Process
        </span>
      </div>

      <div className="prose dark:prose-invert">{children}</div>
    </div>
  );
};

// Math block component for better styling of math blocks
const MathBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-4 overflow-x-auto py-2 text-center">{children}</div>
  );
};

// Define the markdown components
const components: Partial<Components> = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeText = String(children).replace(/\n$/, "");

    // Math block handling
    if (match && match[1] === "math") {
      return <MathBlock>{children}</MathBlock>;
    }

    // Regular code block
    if (match) {
      return <CodeBlock language={match[1]} value={codeText} />;
    }

    // Otherwise, it's inline code
    return (
      <code
        className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-mono text-sm font-medium italic"
        {...props}
      >
        {children}
      </code>
    );
  },
  ol: ({ children, ...props }) => (
    <ol className="my-4 ml-6 list-outside list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-4 ml-6 list-outside list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="py-1" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <span className="font-bold" {...props}>
      {children}
    </span>
  ),
  a: ({ children, href, ...props }) => (
    <Link
      href={href || "#"}
      className="text-blue-600 hover:underline dark:text-blue-400"
      target={"_blank"}
      rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
      {...props}
    >
      {children}
    </Link>
  ),

  hr: ({ ...props }) => <hr className="my-4" {...props} />,

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="bg-primary-foreground my-4 border-l-4 border-gray-300 py-2 pl-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
};

function MessageContent({ content }: Props) {
  const processedParts = processThinkTags(content);

  return (
    <div className="bg-muted max-w-full rounded-lg p-3 break-words">
      {processedParts.map((part, index) => (
        <React.Fragment key={index}>
          {part.isThink ? (
            <Think>
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {part.content}
              </ReactMarkdown>
            </Think>
          ) : (
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {part.content}
            </ReactMarkdown>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default MessageContent;
