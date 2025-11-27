"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { puzzles } from "../../puzzleData";

export default function PuzzlesList() {
  const router = useRouter();
  const [solvedStatus, setSolvedStatus] = useState([]);
  const [firstUnsolvedIndex, setFirstUnsolvedIndex] = useState(0);

  useEffect(() => {
    // Runs only in the browser
    const status = puzzles.map((_, index) => {
      const id = index + 1;
      return localStorage.getItem(`puzzle-${id}-solved`) === "true";
    });
    setSolvedStatus(status);

    // Find first unsolved puzzle
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
      <h1 className="text-3xl font-bold mb-6">Heidin Joulu Retki</h1>
      <p className="mb-4">Valitse taso siirtyäksesi siihen:</p>

      <div className="flex flex-col gap-3">
        {puzzles.map((puzzle, index) => {
          const puzzleId = index + 1;
          const solved = solvedStatus[index];
          const isFirstUnsolved = index === firstUnsolvedIndex;

          // Button colors using inline style
          return (
            <Button
              key={puzzleId}
              onClick={() => goToPuzzle(puzzleId, index)}
              style={{
                backgroundColor: solved
                  ? "#16a34a" // green-600
                  : isFirstUnsolved
                  ? "#9ca3af" // gray-400
                  : "#f472b6", // pink-400
                cursor: !solved && !isFirstUnsolved ? "not-allowed" : "pointer",
              }}
            >
              Taso {puzzleId}{" "}
              {solved ? "(Oikein)" : isFirstUnsolved ? "(Seuraava)" : "(Lukittu)"}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
