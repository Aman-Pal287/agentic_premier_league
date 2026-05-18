# MatchMind AI

**IPL second-screen companion** — watch the match on TV, engage on MatchMind AI with live simulation, Gemini-powered insights, predictions, quizzes, and fan reactions.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4)

## Features

- **Live Match Dashboard** — MI vs CSK death-overs chase with simulated ball-by-ball updates
- **AI Match Insights** — Gemini-generated momentum, pressure & tactical bullets
- **Ball Prediction** — Predict next ball (Boundary / Wicket / Dot / Single) and earn points
- **Live IPL Quiz** — Timed trivia with instant feedback
- **Fan Reactions** — Floating emoji reactions (🔥 😮 👏 💀)
- **Match Momentum Meter** — Visual MI vs CSK momentum bar
- **AI Match Moments** — Dramatic cards on key events (SIX, FOUR, WICKET)
- **AI Fan Chat** — Ask the IPL analyst anything about the chase

## Tech Stack

- Next.js 15+ (App Router) · TypeScript · Tailwind CSS
- shadcn/ui · Lucide React · Framer Motion (minimal)
- Google Gemini API (`gemini-2.0-flash`)
- Mock match data (no external cricket API)

## Quick Start

```bash
# Install dependencies
npm install

# Add your Gemini API key
cp .env.example .env
# Edit .env → GEMINI_API_KEY=your_key_here

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key |

> If Gemini is unavailable, the app falls back to offline canned responses so demos never break.

## Project Structure

```
app/
  page.tsx              # Home — full dashboard
  api/ai/               # Gemini route handlers
components/
  match/                # Scoreboard, momentum, dashboard
  engagement/           # Prediction, quiz, reactions
  ai/                   # Insights, moments, chat UI
context/                # MatchProvider + simulation state
lib/
  mock/                 # IPL teams, events, quiz data
  simulation/           # Match engine + momentum
  ai/                   # Gemini prompts & fallbacks
```

## 90-Second Demo Script

1. Open app → **MI vs CSK LIVE** chase at Wankhede
2. Watch score update every few seconds (simulated)
3. **Predict next ball** → wait → see points feedback
4. Fire **fan reactions** 🔥
5. Answer an **IPL quiz** question
6. Read **AI Insights** updating
7. Wait for a **SIX or WICKET** → **AI Moment** card appears
8. Chat: *"Can MI still win from here?"*

Use **Reset** (↻ top-right) to restart the demo anytime.

## API Routes

| Route | Method | Body |
|-------|--------|------|
| `/api/ai/insights` | POST | `{ matchState }` |
| `/api/ai/moments` | POST | `{ matchState, event }` |
| `/api/ai/chat` | POST | `{ matchState, message }` |

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to Vercel — add `GEMINI_API_KEY` in project environment settings.

## License

MIT — built for hackathon / demo purposes.
