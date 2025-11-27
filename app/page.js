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

  useEffect(() => {
    const status = puzzles.map((_, index) => {
      const id = index + 1;
      return localStorage.getItem(`puzzle-${id}-solved`) === "true";
    });
    setSolvedStatus(status);

    const firstUnsolved = status.findIndex((s) => !s);
    setFirstUnsolvedIndex(firstUnsolved >= 0 ? firstUnsolved : puzzles.length);
  }, []);

  const startPuzzle = () => {
    const nextId = firstUnsolvedIndex + 1;
    router.push(`/puzzles/${nextId}`);
  };

  const resetProgress = () => {
    puzzles.forEach((_, index) => {
      localStorage.removeItem(`puzzle-${index + 1}-solved`);
    });
    setSolvedStatus(puzzles.map(() => false));
    setFirstUnsolvedIndex(0);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">{fi.appTitle}</h1>
      <Button
        onClick={startPuzzle}
        className="mb-4 bg-gray-400 hover:bg-gray-500"
      >
        {fi.mainMenu.startPuzzle}
      </Button>
      <Button
        onClick={resetProgress}
        className="bg-red-600 hover:bg-red-700"
      >
        {fi.mainMenu.resetProgress}
      </Button>
    </div>
  );
}
