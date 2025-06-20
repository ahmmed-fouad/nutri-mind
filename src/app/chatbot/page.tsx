import ChatBox from "@/components/chatbot";

export default function ChatbotPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
      <ChatBox/>
    </section>
  );
}
