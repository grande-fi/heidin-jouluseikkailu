"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false); // ensure client-side
  const [nextPuzzle, setNextPuzzle] = useState(1);

  useEffect(() => {
    // runs only in browser
    let firstUnsolved = 1;
    for (let i = 1; i <= 14; i++) {
      if (localStorage.getItem(`puzzle-${i}-solved`) !== "true") {
        firstUnsolved = i;
        break;
      }
      if (i === 14) firstUnsolved = 15; // all solved
    }
    setNextPuzzle(firstUnsolved);
    setReady(true);
  }, []);

  const goToPuzzle = () => {
    if (nextPuzzle <= 14) {
      router.push(`/puzzles/${nextPuzzle}`);
    } else {
      router.push("/final");
    }
  };

  const resetProgress = () => {
    for (let i = 1; i <= 14; i++) {
      localStorage.removeItem(`puzzle-${i}-solved`);
    }
    alert("Progressi nollattu! 😎");
    setNextPuzzle(1);
  };

  if (!ready) return null; // wait for client-side

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-8">Heidin Joulu Retki</h1>
      
      <div className="flex flex-col gap-4">
        {/* Dynamic Puzzle Button */}
        <Button onClick={goToPuzzle}>
          Aloita Peli
        </Button>

		{/* Go to puzzle list view */}
		<Button onClick={() => router.push("/puzzles")} className="bg-blue-600 hover:bg-blue-700">
          Tasot
        </Button>

        {/* Reset Progress */}
        <Button onClick={resetProgress} className="bg-red-600 hover:bg-red-700">
          Resetoi Peli
        </Button>
      </div>
    </div>
  );
}
