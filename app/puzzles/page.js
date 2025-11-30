"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { puzzles } from "../puzzleData";
import { fi } from "../locales/fi";

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

  if (solvedStatus.length === 0) return null;

  const backgroundStyle = {
    backgroundImage: "url('/backgrounds/menu.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  };

  return (
    <main style={backgroundStyle}>
      <div className="max-w-xl mx-auto bg-black/70 p-8 rounded-xl shadow-xl" style={{ textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "3rem" }} className="font-bold mb-4">
          {fi.appTitle}
        </h1>
        
        <p style={{ color: "white", fontSize: "1.5rem" }} className="mb-6">
          {fi.puzzles.choosePuzzle}
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          {puzzles.map((_, index) => {
            const puzzleId = index + 1;
            const solved = solvedStatus[index];
            const isFirstUnsolved = index === firstUnsolvedIndex;

            let backgroundColor = "";
            if (solved) backgroundColor = "#16a34a"; // green
            else if (isFirstUnsolved) backgroundColor = "#126524"; // same green as main menu
            else backgroundColor = "#f472b6"; // pink (locked)

            return (
              <Button
                key={puzzleId}
                onClick={() => goToPuzzle(puzzleId, index)}
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  padding: "16px 24px",
                  borderRadius: "50px",
                  fontSize: "18px",
                  minHeight: "56px",
                  backgroundColor,
                  border: "none",
                  color: "white",
                  opacity: 0.7,
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
    </main>
  );
}