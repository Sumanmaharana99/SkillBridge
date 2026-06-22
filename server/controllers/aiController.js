import axios from "axios";

export const generateRoadmap =
  async (req, res) => {
    try {
      const { goal } = req.body;

      const response =
        await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
          model: "openrouter/free",

            messages: [
              {
                role: "user",
                content: `
Return ONLY valid JSON.

{
  "roadmap": "",
  "youtube": [],
  "github": [],
  "blogs": []
}

Goal: ${goal}

Generate:
1. Detailed learning roadmap
2. Top 5 YouTube channels/videos
3. Top 5 GitHub repositories
4. Top 5 blogs/articles

Return JSON only.
                `,
              },
            ],
          },
          {
            headers: {
              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type":
                "application/json",
            },
          }
        );
const aiResponse =
        response.data.choices[0]
          .message.content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const parsed =
        JSON.parse(aiResponse);

      res.status(200).json({
  success: true,
  data: parsed,
});
    } catch (error) {
      console.error(
        error.response?.data ||
          error.message
      );

      res.status(500).json({
        success: false,
        message:
          error.response?.data ||
          error.message,
      });
    }
  };