import { useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import ReactMarkdown from "react-markdown";
function AIChat() {
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {
      setLoading(true);

      const res =
        await API.post(
          "/ai/chat",
          {
            question,
          }
        );

      const aiMessage = {
        role: "ai",
        text:
          res.data.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setQuestion("");

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (
    e
  ) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          🤖 AI Assistant
        </h1>

        <div className="bg-white rounded-xl shadow p-4 h-[500px] overflow-y-auto">

          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              Ask me anything about coding,
              learning, projects, DSA,
              MERN, Java, etc.
            </div>
          )}

          {messages.map(
            (
              message,
              index
            ) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.role ===
                  "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.role ===
                    "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <ReactMarkdown>
                    {message.text}
                 </ReactMarkdown>
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyPress
            }
            placeholder="Ask something..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={
              sendMessage
            }
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Send
          </button>
        </div>

      </div>
    </MainLayout>
  );
}

export default AIChat;