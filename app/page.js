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
    const status = puzzles.map((_, index) => {
      const id = index + 1;
      return localStorage.getItem(`puzzle-${id}-solved`) === "true";
    });

    setSolvedStatus(status);

    const firstUnsolved = status.findIndex((s) => !s);
    setFirstUnsolvedIndex(firstUnsolved >= 0 ? firstUnsolved : puzzles.length);
  }, []);

  const startPuzzle = () => {
    router.push(`/puzzles/${firstUnsolvedIndex + 1}`);
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

  return (
    <>
      {/* --- Full-viewport background layer (independent of layout) --- */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('/backgrounds/menu.jpg')",
        }}
      />

      {/* --- Foreground content --- */}
      <main className="
	  min-h-screen w-full 
   	 flex items-center justify-center 
    bg-[url('/christmas-bg.jpg')] 
    bg-cover bg-center bg-no-repeat">
        
		
		
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
