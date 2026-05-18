"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMatch } from "@/context/MatchContext";
import { motion } from "framer-motion";
import { AppIcon } from "@/components/icons/app-icon";
import { ArrowUpRight, Headphones } from "lucide-react";
import { useRef, useState } from "react";

const SUGGESTIONS = [
  "Can MI still win from here?",
  "Who is under pressure right now?",
  "What changed the momentum?",
  "Is CSK's defense holding?",
];

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export function FanChat() {
  const { matchState, sessionKey } = useMatch();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hey fan! I'm your MatchMind AI analyst. Ask me anything about this MI vs CSK chase!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchState, message: trimmed }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.reply ?? "Couldn't reach the analyst — try again!",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Network hiccup! Ask again — this chase is heating up.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <Card key={sessionKey} className="glass-card neon-border border-0 bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <AppIcon icon={Headphones} size={17} className="text-cyan-400" />
          AI Fan Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              disabled={loading}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-300 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <ScrollArea className="h-40 rounded-lg border border-white/10 bg-black/20 pr-3">
          <div className="space-y-2 p-3">
            {messages.map((msg, i) => (
              <motion.div
                key={`${msg.role}-${i}-${msg.text.slice(0, 12)}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-600/30 text-cyan-100"
                      : "bg-white/5 text-slate-300"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <p className="text-xs text-cyan-400 animate-pulse">
                Analyst is thinking…
              </p>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the IPL analyst…"
            disabled={loading}
            className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="shrink-0 bg-cyan-600 hover:bg-cyan-500"
          >
            <AppIcon icon={ArrowUpRight} size={17} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
