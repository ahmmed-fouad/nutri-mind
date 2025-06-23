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
      className=""
    >
      <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
        <p className="text-4xl p-2 font-bold text-green-700 text-center">
          welcome, user ... chat with AI
        </p>
        <p
          className="h-[20rem] border-2 border-green-700 rounded-xl 
        text-left overflow-y-auto w-[50rem] z-[50] p-5 bg-green-200 text-2xl"
        >
          <strong>AI:</strong>
          {isFetching ? "  thinking..." : ""}
          {response}
        </p>
      </div>
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Talk to GPT..."
          className="border-2 border-green-700 resize-none rounded-xl w-[50rem] p-5 bg-green-200 text-2xl my-5 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isFetching}
          className="bg-green-600 p-2 absolute bottom-[29px] right-1 rounded-full text-gray-200 hover:bg-green-700 cursor-pointer"
        >
          <ArrowUp />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;
