"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fi } from "../locales/fi";

export default function FinalPage() {
  const router = useRouter();

  const backToMenu = () => {
    router.push("/");
  };
  const backgroundStyle = {
    backgroundImage: "url('/backgrounds/final.jpg')",
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
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">{fi.finalCoordinates.title}</h1>
      <p className="text-xl mb-6">56° 56.703′ N, 24° 6.475′ E</p>
      <Button onClick={backToMenu}>Takaisin päävalikkoon</Button>
    </div>
  );
}
