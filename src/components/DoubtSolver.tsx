"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquareText, Search, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export const DoubtSolver = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Namaste! I am your AI Ayurvedic tutor. What doubt can I help clarify about the Samhitas today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI response function (Replace with real OpenAI / Gemini route later)
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    // Simulated network delay
    setTimeout(() => {
       const aiResponse = "According to Charaka Samhita, " + userMessage.split(' ')[0] + " plays a vital role in balancing the doshas. Let me explain further...";
       setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
       setIsLoading(false);
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground p-0" />}>
        <MessageSquareText className="w-6 h-6" />
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden border-2 border-primary/20">
        <DialogHeader className="p-4 bg-primary/5 border-b border-border shadow-sm">
          <DialogTitle className="flex items-center gap-2 text-primary font-heading text-xl">
             <Sparkles className="w-5 h-5" />
             AI Assistant
          </DialogTitle>
          <p className="text-xs text-muted-foreground">Ask questions related to your curriculum</p>
        </DialogHeader>

        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
           {messages.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
               <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                 msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-muted text-foreground border border-border rounded-tl-sm shadow-sm"
               }`}>
                 <p className="text-sm leading-relaxed">{msg.content}</p>
               </div>
             </div>
           ))}
           {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm w-16 flex justify-center items-center h-10 space-x-1">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                  </div>
              </div>
           )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-card border-t border-border mt-auto">
           <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex gap-2"
           >
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Doshas, Dhatus, or Sutras..." 
                className="min-h-[50px] max-h-[120px] resize-none bg-background py-3"
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="h-[50px] w-[50px] shrink-0 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Send className="w-5 h-5" />
              </Button>
           </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
