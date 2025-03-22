import { Spinner } from "@/components/ui/spinner";

function ChatLoading() {
  return (
    <div className="bg-muted rounded-lg p-3">
      <Spinner variant="bars" />
    </div>
  );
}

export default ChatLoading;
