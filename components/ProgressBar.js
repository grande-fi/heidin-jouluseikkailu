"use client";

import React, { useEffect, useState } from "react";

export default function ProgressBar() {
  const [solvedCount, setSolvedCount] = useState(0);

  const calculateProgress = () => {
    let count = 0;
    for (let i = 1; i <= 14; i++) {
      if (localStorage.getItem(`puzzle-${i}-solved`) === "true") count++;
    }
    setSolvedCount(count);
  };

  useEffect(() => {
    calculateProgress();

    // Optional: listen to localStorage changes from other tabs
    const handleStorageChange = () => calculateProgress();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="mb-4">
      <div className="text-sm font-semibold mb-1">
        {solvedCount} / 14 puzzles solved
      </div>
      <div className="w-full bg-gray-300 rounded h-4">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${(solvedCount / 14) * 100}%` }}
        />
      </div>
    </div>
  );
}
