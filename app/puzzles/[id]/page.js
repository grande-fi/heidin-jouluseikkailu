"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { puzzles } from "../../puzzleData";
import { fi } from "../../locales/fi";

// Map each puzzle ID to its background image
const puzzleBackgrounds = {
  1: "/backgrounds/puzzle1.jpg",
  2: "/backgrounds/puzzle2.jpg",
  3: "/backgrounds/puzzle3.jpg",
  4: "/backgrounds/puzzle4.jpg",
  5: "/backgrounds/puzzle5.jpg",
  6: "/backgrounds/puzzle6.jpg",
  7: "/backgrounds/puzzle7.jpg",
  8: "/backgrounds/puzzle8.jpg",
  9: "/backgrounds/puzzle9.jpg",
  10: "/backgrounds/puzzle10.jpg",
  11: "/backgrounds/puzzle11.jpg",
  12: "/backgrounds/puzzle12.jpg",
  13: "/backgrounds/puzzle13.jpg",
  14: "/backgrounds/puzzle14.jpg",
};

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
      // Use unique feedback if available, otherwise use default
      setFeedback(puzzle.correctFeedback || fi.feedback.correct);
      setSolved(true);
      localStorage.setItem(`puzzle-${puzzleId}-solved`, "true");
    } else {
      // Use unique feedback if available, otherwise use default
      setFeedback(puzzle.wrongFeedback || fi.feedback.wrong);
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

  // Get the background for this puzzle, fallback to puzzle1.jpg if not found
  const backgroundStyle = {
    backgroundImage: `url('${puzzleBackgrounds[puzzleId] || "/backgrounds/puzzle1.jpg"}')`,
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
        <h1 style={{ 
				color: "white", 
	            fontSize: "3rem",
	            WebkitTextStroke: "2px black",
	            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)"
			}} className="font-bold mb-4">
          {`Taso ${puzzleId}`}
        </h1>
        
        <p style={{ 
		            color: "white", 
		            fontSize: "1.5rem",
			  		fontWeight: "bold",
		            WebkitTextStroke: "1px black",
		            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
			 	}} className="mb-6">
          {puzzle.question}
        </p>
        
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          style={{ fontSize: "18px", padding: "12px", maxWidth: "280px", margin: "0 auto" }}
          disabled={solved}
        />
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <Button 
            onClick={checkAnswer} 
            disabled={solved}
            className="hover:opacity-90"
            style={{ 
              width: "100%", 
              maxWidth: "280px",
              padding: "16px 24px",
              borderRadius: "50px",
              fontSize: "18px",
              minHeight: "56px",
              backgroundColor: "#126524",
              border: "none",
              color: "white",
              opacity: solved ? 0.5 : 0.7,
              cursor: solved ? "not-allowed" : "pointer"
            }}
          >
            Tarkista
          </Button>
          
          <Button 
            onClick={backToMenu}
            className="hover:opacity-90"
            style={{ 
              width: "100%", 
              maxWidth: "280px",
              padding: "16px 24px",
              borderRadius: "50px",
              fontSize: "18px",
              minHeight: "56px",
              backgroundColor: "#126524",
              border: "none",
              color: "white",
			  opacity: 0.7
            }}
          >
            Takaisin päävalikkoon
          </Button>
          
          {solved && (
            <Button 
              onClick={nextPuzzle}
              className="hover:opacity-90"
              style={{ 
                width: "100%", 
                maxWidth: "280px",
                padding: "16px 24px",
                borderRadius: "50px",
                fontSize: "18px",
                minHeight: "56px",
                backgroundColor: "#126524",
                border: "none",
                color: "white",
				opacity: 0.7
              }}
            >
              Seuraava Taso
            </Button>
          )}
        </div>
        
        {feedback && (
          <p style={{ 
		            color: "white", 
		            fontSize: "1.5rem",
			  		fontWeight: "bold",
		            WebkitTextStroke: "1px black",
		            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"}} className="mt-6">
            {feedback}
          </p>
        )}
      </div>
    </main>
  );
}