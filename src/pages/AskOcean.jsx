import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Brain, User, Waves, Sparkles, Search } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import { apiClient } from "@/api/apiClient";

const suggestedQuestions = [
  "What is the current coral bleaching risk in the Great Barrier Reef?",
  "How has ocean temperature changed over the last decade?",
  "What are the main threats to the Caribbean Sea ecosystem?",
  "Explain ocean acidification in simple terms.",
  "What is the healthiest ocean region right now?",
  "How does plastic pollution affect marine biodiversity?",
];

export default function AskOcean() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to **Ask The Ocean**! I'm your AI ocean analyst. Ask me anything about ocean health, marine ecosystems, environmental risks, or climate impact on our seas. I'll provide data-driven insights in plain language."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const result = await apiClient.integrations.Core.InvokeLLM({
        prompt: `You are OceanPulse AI, an expert ocean health analyst. Answer the following question about ocean conditions, marine ecosystems, or environmental science in a clear, informative, and accessible way. Use specific data points where relevant. Keep the response concise but thorough (2-4 paragraphs).\n\nQuestion: ${userMsg}`,
        model: "gpt_5_mini"
      });
      setMessages((prev) => [...prev, { role: "assistant", content: result }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble processing that question right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground flex items-center gap-3">
          <Waves className="w-7 h-7 text-[#00D2D3]" />
          Ask The Ocean
        </h1>
        <p className="text-muted-foreground mt-1">Chat with our AI to understand ocean conditions in plain language</p>
      </motion.div>

      {/* Suggested Questions */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Suggested questions
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              className="px-3 py-1.5 rounded-full text-xs bg-secondary/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-[#00D2D3]/30 hover:bg-secondary/70 transition-all disabled:opacity-50"
            >
              {q.length > 50 ? q.slice(0, 50) + "…" : q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <GlassCard className="flex flex-col h-[500px] sm:h-[560px]" hover={false} delay={0.1}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#006EE6] to-[#00D2D3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#006EE6]/20 border border-[#006EE6]/30 text-foreground"
                    : "bg-secondary/50 border border-border/30 text-foreground"
                }`}>
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-2" : ""}>
                      {line.split("**").map((part, k) =>
                        k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#006EE6] to-[#00D2D3] flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="bg-secondary/50 border border-border/30 rounded-xl px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#00D2D3] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[#00D2D3] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[#00D2D3] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/30">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-2"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type an ocean question..."
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00D2D3]/50 transition-colors disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#006EE6] to-[#00D2D3] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#006EE6]/20 transition-all disabled:opacity-50 disabled:hover:shadow-none flex items-center gap-1.5"
            >
              Send <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}