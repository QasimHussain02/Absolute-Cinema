"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot({ movie }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you with this movie?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const response = await fetch(`/api/ai/movieDetailsChat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movie: movie.title,
        overview: movie.overview,
        question: input.trim(),
      }),
    });

    const aiMessage = await response.json();

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 2,
        text: aiMessage.answers,
        sender: "ai",
      },
    ]);
  };

  return (
    <>
      {/* ── Chatbot Floating Button ── */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-black shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}`}
        aria-label="Open Chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed z-[110] flex flex-col overflow-hidden bg-surface/95 backdrop-blur-3xl transition-all duration-400 ease-in-out md:bottom-6 md:right-6 md:h-[500px] md:w-[380px] md:rounded-2xl md:border md:border-white/10 md:shadow-2xl md:shadow-black/60 
        ${isOpen ? "inset-0 opacity-100 md:inset-auto md:translate-y-0 md:scale-100" : "pointer-events-none translate-y-12 opacity-0 md:scale-95"}`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-semibold text-primary-container">
                AI Assistant
              </h3>
              <p className="text-xs text-on-surface-variant/70">
                Always here to help
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-primary active:scale-95"
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${msg.sender === "user" ? "rounded-2xl rounded-br-sm bg-secondary text-black font-medium" : "rounded-2xl rounded-bl-sm bg-white/[0.06] text-on-surface border border-white/[0.05]"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 bg-surface/50 p-4">
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#050505] p-1.5 pl-5 transition-all duration-300 focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary/30 shadow-inner shadow-black/50"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-black transition-all duration-200 disabled:opacity-40 disabled:scale-100 hover:scale-105 active:scale-95"
            >
              <Send size={16} className="-ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
