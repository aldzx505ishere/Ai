export const config = { runtime: "edge" };

const Apikey = "sk-b5f2f839d17d4f3686416898b0e4bbc9";
export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { system, message } = await req.json();

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
      temperature: 0.9,
    }),
  });

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content || "No reply";

  return new Response(
    JSON.stringify({ reply }),
    { headers: { "Content-Type": "application/json" } }
  );
}
