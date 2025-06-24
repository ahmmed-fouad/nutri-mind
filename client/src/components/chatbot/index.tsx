"use client";
import { useState, useEffect } from "react";
import { streamChat } from "../../services/streamApi";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const prefill = typeof window !== 'undefined' ? localStorage.getItem("chatbot_prefill") : null;
    if (prefill) {
      setInput(prefill);
      localStorage.removeItem("chatbot_prefill");
    }
  }, []);

  const handleSend = async () => {
    setResponse("");
    setIsFetching(true);
    try {
      await streamChat(input, async (chunk: string) => {
        await delay(800);
        setResponse((prev) => prev + chunk);
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto"
    >
      <div className="mt-4">
        <p className="text-xl sm:text-2xl md:text-3xl p-2 font-bold text-green-700 text-center">
          welcome, user ... chat with AI
        </p>
        <div className="min-h-[12rem] h-64 sm:h-80 border-2 border-green-700 rounded-xl text-left overflow-y-auto w-full z-[50] p-3 sm:p-5 bg-green-200 text-base sm:text-lg md:text-xl mb-4">
          <strong>AI:</strong> {isFetching ? "  thinking..." : ""}{response}
        </div>
      </div>
      <div className="flex flex-row items-end gap-2 w-full mt-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Talk to GPT..."
          className="border-2 border-green-700 resize-none rounded-xl w-full p-3 sm:p-5 bg-green-200 text-base sm:text-lg md:text-xl outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isFetching}
          className="bg-green-600 p-2 sm:p-3 rounded-full text-gray-200 hover:bg-green-700 cursor-pointer shrink-0 mb-1"
        >
          <ArrowUp />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;
