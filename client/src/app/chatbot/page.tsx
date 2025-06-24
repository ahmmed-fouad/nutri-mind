import ChatBot from "@/components/chatbot";

export default function ChatbotPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[60vh] py-6 px-2">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">AI Chatbot</h1>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-xl">
        <ChatBot />
      </div>
    </section>
  );
}
