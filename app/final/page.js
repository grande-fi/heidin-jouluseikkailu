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
    <main style={backgroundStyle}>
      <div className="max-w-xl mx-auto bg-black/70 p-8 rounded-xl shadow-xl" style={{ textAlign: "center" }}>
        <h1 style={{ 
          color: "white", 
          fontSize: "3rem",
          WebkitTextStroke: "2px black",
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)"
        }} className="font-bold mb-4">
          {fi.finalCoordinates.title}
        </h1>
        
        <p style={{ 
          color: "white", 
          fontSize: "1.5rem",
          fontWeight: "bold",
          WebkitTextStroke: "1px black",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
        }} className="mb-6">
          N 56° 56.703, E 24° 06.475 <br />
		Ja check-in 6.2.2026 klo 11:00 😘
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
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
              opacity: 0.7,
              transition: "all 0.2s ease"
            }}
            onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#0d4a1a"}
            onMouseUp={(e) => e.currentTarget.style.backgroundColor = "#126524"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#126524"}
          >
            Takaisin päävalikkoon
          </Button>
        </div>
      </div>
    </main>
  );
}