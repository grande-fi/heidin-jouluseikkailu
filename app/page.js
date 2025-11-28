"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { puzzles } from "./puzzleData";
import { fi } from "./locales/fi";

export default function MainMenu() {
  const router = useRouter();
  const [solvedStatus, setSolvedStatus] = useState([]);
  const [firstUnsolvedIndex, setFirstUnsolvedIndex] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const status = puzzles.map((_, index) => {
      const stored = localStorage.getItem(`puzzle-${index + 1}-solved`);
      return stored === "true";
    });

    setSolvedStatus(status);

    const firstUnsolved = status.findIndex((s) => !s);
    setFirstUnsolvedIndex(firstUnsolved === -1 ? 0 : firstUnsolved);
  }, []);

  const startPuzzle = () => {
    router.push(`/puzzles/${firstUnsolvedIndex + 1}`);
  };

  const goToPuzzlesList = () => {
    router.push("/puzzles");
  };

  const resetProgress = () => {
    if (typeof window === "undefined") return;

    puzzles.forEach((_, index) => {
      localStorage.removeItem(`puzzle-${index + 1}-solved`);
    });

    setSolvedStatus(puzzles.map(() => false));
    setFirstUnsolvedIndex(0);
  };

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
        <div className="max-w-xl mx-auto text-center bg-black/70 p-8 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-white">
            {fi.appTitle}
          </h1>

          <div className="flex flex-col gap-4">
            <Button
              onClick={startPuzzle}
              className="bg-gray-400 hover:bg-gray-500"
            >
              {fi.mainMenu.startPuzzle}
            </Button>

            <Button
              onClick={goToPuzzlesList}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Kaikki Tasot
            </Button>

            <Button
              onClick={resetProgress}
              className="bg-red-600 hover:bg-red-700"
            >
              {fi.mainMenu.resetProgress}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
