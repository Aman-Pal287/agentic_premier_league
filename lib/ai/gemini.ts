import { GoogleGenerativeAI } from "@google/generative-ai";

const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"] as const;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimited(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const status = (err as { status?: number }).status;
  if (status === 429) return true;
  return String(err).includes("429") || String(err).includes("Too Many Requests");
}

export function getGeminiModel(modelName = MODELS[0]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelName });
}

async function generateWithModel(
  modelName: (typeof MODELS)[number],
  prompt: string
): Promise<string | null> {
  const model = getGeminiModel(modelName);
  if (!model) return null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      if (text) return text;
    } catch (err) {
      if (isRateLimited(err) && attempt === 0) {
        await sleep(4000);
        continue;
      }
      if (process.env.NODE_ENV === "development") {
        console.warn(`[gemini] ${modelName} failed:`, err);
      }
      return null;
    }
  }
  return null;
}

export async function generateText(prompt: string): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  for (const modelName of MODELS) {
    const text = await generateWithModel(modelName, prompt);
    if (text) return text;
  }
  return null;
}
