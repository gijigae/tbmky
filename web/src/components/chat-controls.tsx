import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";
import { TranscriptDrawer } from "@/components/transcript-drawer";

interface ChatControlsProps {
  showEditButton: boolean;
  isEditingInstructions: boolean;
  onToggleEdit: () => void;
}

export function ChatControls({
  showEditButton,
  isEditingInstructions,
  onToggleEdit,
}: ChatControlsProps) {
  return (
    <div className="absolute top-2 right-2 flex justify-end">
      <div className="flex gap-2">
        <TranscriptDrawer>
          <Button variant="outline" size="icon" className="md:hidden">
            <MessageSquareQuote className="h-4 w-4" />
          </Button>
        </TranscriptDrawer>
      </div>
    </div>
  );
}
