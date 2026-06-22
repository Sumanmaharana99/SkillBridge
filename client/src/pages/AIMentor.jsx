import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
function AIMentor() {
    const navigate = useNavigate();
  const [goal, setGoal] =
    useState("");

 const [result, setResult] =
  useState(null);

  const [loading, setLoading] =
    useState(false);

  const generateRoadmap =
    async () => {
      try {
        setLoading(true);

        const res =
          await API.post(
            "/ai/roadmap",
            { goal }
          );

        setResult(
  res.data.data
);
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to generate roadmap"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <MainLayout>
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Mentor Bot
      </h1>

      <textarea
        value={goal}
        onChange={(e) =>
          setGoal(e.target.value)
        }
        placeholder="Describe your learning goal..."
        className="w-full border p-4 rounded-lg"
        rows="4"
      />

      <button
        onClick={
          generateRoadmap
        }
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Generating..."
          : "Generate Roadmap"}
      </button>
      <button
    onClick={() =>
      navigate("/ai-chat")
    }
    className="bg-green-600 text-white px-6 py-3 rounded-lg"
  >
    Open AI Chat
  </button>

      {result && (
  <div className="mt-8 space-y-6">

    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        📚 Learning Roadmap
      </h2>

      <div className="whitespace-pre-wrap">
  {result.roadmap}
</div>
    </div>

   {/* YouTube */}
<div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">
    🎥 YouTube Resources
  </h2>

  <ul className="space-y-3">
    {result.youtube?.map((item, index) => (
      <li
        key={index}
        className="border rounded p-3"
      >
        {typeof item === "object" ? (
          <>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold"
            >
              {item.title}
            </a>

            {item.reason && (
              <p className="text-sm text-gray-500 mt-1">
                {item.reason}
              </p>
            )}
          </>
        ) : (
          item
        )}
      </li>
    ))}
  </ul>
</div>

{/* GitHub */}
<div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">
    📂 GitHub Repositories
  </h2>

  <ul className="space-y-3">
    {result.github?.map((item, index) => (
      <li
        key={index}
        className="border rounded p-3"
      >
        {typeof item === "object" ? (
          <>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold"
            >
              {item.title}
            </a>

            {item.reason && (
              <p className="text-sm text-gray-500 mt-1">
                {item.reason}
              </p>
            )}
          </>
        ) : (
          item
        )}
      </li>
    ))}
  </ul>
</div>

{/* Blogs */}
<div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">
    📝 Blogs & Articles
  </h2>

  <ul className="space-y-3">
    {result.blogs?.map((item, index) => (
      <li
        key={index}
        className="border rounded p-3"
      >
        {typeof item === "object" ? (
          <>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold"
            >
              {item.title}
            </a>

            {item.reason && (
              <p className="text-sm text-gray-500 mt-1">
                {item.reason}
              </p>
            )}
          </>
        ) : (
          item
        )}
      </li>
    ))}
  </ul>
</div>

  </div>
)}
    </div>
    </MainLayout>
  );
}

export default AIMentor;