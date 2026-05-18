"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMatch } from "@/context/MatchContext";
import { QUIZ_QUESTIONS } from "@/lib/mock/quiz-questions";
import { AnimatePresence, motion } from "framer-motion";
import { AppIcon } from "@/components/icons/app-icon";
import { ChevronsRight, ListChecks } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const TIMER_SECONDS = 15;

export function LiveQuiz() {
  const { addPoints, sessionKey } = useMatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = QUIZ_QUESTIONS[questionIndex % QUIZ_QUESTIONS.length];

  const goNext = useCallback(() => {
    setQuestionIndex((i) => (i + 1) % QUIZ_QUESTIONS.length);
    setTimeLeft(TIMER_SECONDS);
    setSelectedIndex(null);
    setAnswered(false);
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (answered) return;
      setAnswered(true);
      setSelectedIndex(optionIndex);
      if (optionIndex === question.correctIndex) {
        addPoints(question.points);
      }
    },
    [answered, addPoints, question.correctIndex, question.points]
  );

  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      setAnswered(true);
      setSelectedIndex(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answered]);

  useEffect(() => {
    if (!answered) return;
    const t = setTimeout(goNext, 2500);
    return () => clearTimeout(t);
  }, [answered, questionIndex, goNext]);

  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <Card key={sessionKey} className="glass-card neon-border border-0 bg-transparent">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <AppIcon icon={ListChecks} size={17} className="text-cyan-400" />
            Live IPL Quiz
          </CardTitle>
          <Badge variant="outline" className="text-xs text-slate-400">
            {question.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Time left</span>
            <span className={timeLeft <= 5 ? "text-red-400" : "text-cyan-400"}>
              {answered ? "—" : `${timeLeft}s`}
            </span>
          </div>
          <Progress value={answered ? 0 : timerPercent} className="h-1.5" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <p className="text-sm font-medium leading-snug text-white">
              {question.question}
            </p>

            <div className="grid gap-2">
              {question.options.map((opt, i) => {
                let style =
                  "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200";
                if (answered) {
                  if (i === question.correctIndex) {
                    style =
                      "border-emerald-500/50 bg-emerald-500/15 text-emerald-300";
                  } else if (i === selectedIndex && !isCorrect) {
                    style = "border-red-500/40 bg-red-500/10 text-red-300";
                  } else {
                    style = "border-white/5 bg-transparent opacity-50";
                  }
                }

                return (
                  <Button
                    key={opt}
                    variant="outline"
                    disabled={answered}
                    onClick={() => handleAnswer(i)}
                    className={`h-auto justify-start whitespace-normal py-2.5 text-left text-sm ${style}`}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {answered && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-center text-sm font-medium ${
                selectedIndex === -1
                  ? "text-amber-400"
                  : isCorrect
                    ? "text-emerald-400"
                    : "text-red-400"
              }`}
            >
              {selectedIndex === -1
                ? "Time's up!"
                : isCorrect
                  ? `Correct! +${question.points} points`
                  : `Wrong! Answer: ${question.options[question.correctIndex]}`}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          className="flex w-full items-center justify-center gap-1 text-xs text-slate-600 hover:text-cyan-400 transition-colors"
        >
          <AppIcon icon={ChevronsRight} size={14} />
          Demo: Next question
        </button>
      </CardContent>
    </Card>
  );
}
