"use client";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Final() {
  const totalPuzzles = 14;
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    let allSolved = true;
    for (let i = 1; i <= totalPuzzles; i++) {
      if (localStorage.getItem('puzzle_' + i) !== 'true') {
        allSolved = false;
        break;
      }
    }
    setCompleted(allSolved);
  }, []);
  return (<main className="max-w-xl mx-auto mt-12"><Card className="bg-gray-800 border-gray-700"><CardHeader><CardTitle className="text-3xl text-center">Final Coordinates</CardTitle></CardHeader><CardContent className="space-y-4 text-center">{completed ? (<><p className="text-green-400 text-xl">Congratulations! You solved all puzzles! Finaali naatit ovat N56° 56.703′ , E 24° 06.475′ E</p></>) : (<><p className="text-red-400 text-xl">You haven't solved all puzzles yet.</p><p>Complete all 14 puzzles to see the final coordinates.</p></>)}<Link href="/puzzles"><Button className="mt-4">Back to Puzzles</Button></Link></CardContent></Card></main>);
}