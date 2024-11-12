import { Button } from "@/components/ui/button";
import { Building, User, Mail, MessageSquare, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type FeedbackForm = {
  companyName: string;
  userName: string;
  email: string;
  comment: string;
};

export function CodeViewer() {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<"python" | "typescript">("python");
  const { pgState } = usePlaygroundState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    companyName: '',
    userName: '',
    email: '',
    comment: ''
  });
  const { toast } = useToast();

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackForm),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast({
        title: "問い合わせが送信されました",
        description: "お問い合わせ有難うございます。",
        variant: "success",
      });
      setFeedbackForm({
        companyName: '',
        userName: '',
        email: '',
        comment: ''
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "問い合わせを送信できませんでした。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="group relative transition-all duration-300 ease-in-out transform hover:scale-105 text-sm font-semibold bg-[#0EA37F] hover:bg-[#0c8c6a] text-white"
        >
          <Mail className="h-5 w-5" />
          <span className="sm:ml-2 hidden sm:block">安全なうに関する問い合わせ</span>
          <span className="ml-2 sm:hidden">問い合わせ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[95vw] bg-gradient-to-br from-[#e6f7f2] to-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0EA37F]">安全なうに関する問い合わせ</DialogTitle>
          <DialogDescription className="text-gray-600">
            安全なうについてのご意見やご要望をお聞かせください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitFeedback} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700 flex items-center">
                <Building className="w-4 h-4 mr-2 text-[#0EA37F]" />
                会社名
              </Label>
              <Input
                id="companyName"
                value={feedbackForm.companyName}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, companyName: e.target.value }))}
                required
                className="rounded-md border-gray-300 focus:border-[#0EA37F] focus:ring focus:ring-[#0EA37F] focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-sm font-medium text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2 text-[#0EA37F]" />
                お名前
              </Label>
              <Input
                id="userName"
                value={feedbackForm.userName}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, userName: e.target.value }))}
                required
                className="rounded-md border-gray-300 focus:border-[#0EA37F] focus:ring focus:ring-[#0EA37F] focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-[#0EA37F]" />
              会社のメールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              value={feedbackForm.email}
              onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
              required
              className="rounded-md border-gray-300 focus:border-[#0EA37F] focus:ring focus:ring-[#0EA37F] focus:ring-opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium text-gray-700 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-[#0EA37F]" />
              ご意見やご要望
            </Label>
            <Textarea
              id="comment"
              value={feedbackForm.comment}
              onChange={(e) => setFeedbackForm(prev => ({ ...prev, comment: e.target.value }))}
              required
              className="min-h-[100px] rounded-md border-gray-300 focus:border-[#0EA37F] focus:ring focus:ring-[#0EA37F] focus:ring-opacity-50"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0EA37F] hover:bg-[#0c8c6a] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? '送信中...' : '送信'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
