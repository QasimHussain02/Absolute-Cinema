import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROK_API_KEY,
});
export async function POST(req) {
  const { movie, overview, question } = await req.json();
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are a movie assistant. Only answer based on the given movie.

Movie:
Title: ${movie}
Description: ${overview}

Keep answers short and helpful.`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });
  return Response.json({
    answers: response.choices[0].message.content,
  });
}
