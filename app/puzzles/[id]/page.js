"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { puzzles } from "../../puzzleData";
import { fi } from "../../locales/fi";

export default function PuzzlePage({ params }) {
  const router = useRouter();
  const puzzleId = parseInt(params.id, 10);
  const puzzle = puzzles[puzzleId - 1];

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem(`puzzle-${puzzleId}-solved`) === "true";
    setSolved(status);
  }, [puzzleId]);

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setFeedback(fi.feedback.correct);
      setSolved(true);
      localStorage.setItem(`puzzle-${puzzleId}-solved`, "true");
    } else {
      setFeedback(fi.feedback.wrong);
    }
  };

  const nextPuzzle = () => {
    if (puzzleId < puzzles.length) {
      router.push(`/puzzles/${puzzleId + 1}`);
    } else {
      router.push("/final");
    }
  };

  const backToMenu = () => {
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4">{`Taso ${puzzleId}`}</h1>
      <p className="mb-4">{puzzle.question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
        disabled={solved}
      />
      <div className="flex gap-2 justify-center mb-4">
        <Button onClick={checkAnswer} disabled={solved}>
          Tarkista
        </Button>
        <Button onClick={backToMenu}>Takaisin päävalikkoon</Button>
        {solved && (
          <Button onClick={nextPuzzle}>
            Seuraava Taso
          </Button>
        )}
      </div>
      {feedback && <p className="mt-4 font-bold">{feedback}</p>}
    </div>
  );
}
