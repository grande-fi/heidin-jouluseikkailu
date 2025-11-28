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

  const goToPuzzlesList = () => {
    router.push("/puzzles");
  };

  const resetProgress = () => {
    puzzles.forEach((_, index) => {
      localStorage.removeItem(`puzzle-${index + 1}-solved`);
    });
    setSolvedStatus(puzzles.map(() => false));
    setFirstUnsolvedIndex(0);
  };

  const backgroundStyle = {
    backgroundImage: "url('/backgrounds/menu.jpg')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={backgroundStyle}>
      <div className="max-w-xl mx-auto text-center bg-black bg-opacity-70 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">{fi.appTitle}</h1>

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
            {fi.mainMenu.levels}
          </Button>

          <Button
            onClick={resetProgress}
            className="bg-red-600 hover:bg-red-700"
          >
            {fi.mainMenu.resetProgress}
          </Button>
        </div>
      </div>
    </div>
  );
}