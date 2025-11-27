"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { puzzles } from "../../puzzleData";
import { fi } from "../locales/fi"; // import Finnish strings

export default function PuzzlesList() {
  const router = useRouter();
  const [solvedStatus, setSolvedStatus] = useState([]);
  const [firstUnsolvedIndex, setFirstUnsolvedIndex] = useState(0);

  useEffect(() => {
    const status = puzzles.map((_, index) => {
      const id = index + 1;
      return localStorage.getItem(`puzzle-${id}-solved`) === "true";
    });
    setSolvedStatus(status);

    const firstUnsolved = status.findIndex((s) => !s);
    setFirstUnsolvedIndex(firstUnsolved >= 0 ? firstUnsolved : puzzles.length);
  }, []);

  const goToPuzzle = (id, index) => {
    if (index === firstUnsolvedIndex || solvedStatus[index]) {
      router.push(`/puzzles/${id}`);
    }
  };

  if (solvedStatus.length === 0) return null; // wait for client

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">{fi.appTitle}</h1>
      <p className="mb-4">{fi.puzzles.choosePuzzle}</p>

      <div className="flex flex-col gap-3">
        {puzzles.map((_, index) => {
          const puzzleId = index + 1;
          const solved = solvedStatus[index];
          const isFirstUnsolved = index === firstUnsolvedIndex;

          let backgroundColor = "";
          if (solved) backgroundColor = "#16a34a"; // green
          else if (isFirstUnsolved) backgroundColor = "#9ca3af"; // gray
          else backgroundColor = "#f472b6"; // pink

          return (
            <Button
              key={puzzleId}
              onClick={() => goToPuzzle(puzzleId, index)}
              style={{
                backgroundColor,
                cursor: !solved && !isFirstUnsolved ? "not-allowed" : "pointer",
              }}
            >
              Taso {puzzleId}{" "}
              {solved
                ? `(${fi.puzzles.solved})`
                : isFirstUnsolved
                ? `(${fi.puzzles.open})`
                : `(${fi.puzzles.locked})`}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
