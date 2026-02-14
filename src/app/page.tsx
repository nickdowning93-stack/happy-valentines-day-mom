"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const XOXO_ITEMS = ["X", "O", "X", "O", "X", "O", "X", "O", "X", "O", "X", "O"];

function FloatingHearts() {
  const [hearts, setHearts] = useState<
    { id: number; left: number; size: number; delay: number; duration: number; emoji: string }[]
  >([]);

  useEffect(() => {
    const emojis = ["❤️", "💕", "💖", "💗", "💘", "💝", "🩷", "❣️", "😘", "🥰"];
    const items = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 24 + 16,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(items);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="floating-element"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </>
  );
}

function XOXOBackground() {
  const [items, setItems] = useState<
    { id: number; left: number; top: number; size: number; delay: number; text: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 30 + 20,
      delay: Math.random() * 6,
      text: XOXO_ITEMS[i % XOXO_ITEMS.length],
    }));
    setItems(generated);
  }, []);

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="xoxo-bg"
          style={{
            position: "fixed",
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            color: "rgba(230, 57, 70, 0.15)",
            fontWeight: "bold",
            fontFamily: "'Georgia', serif",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {item.text}
        </div>
      ))}
    </>
  );
}

function BigHeart({ onClick }: { onClick: () => void }) {
  return (
    <div className="heart-clickable" onClick={onClick} title="Click me!">
      <svg
        width="280"
        height="260"
        viewBox="0 0 280 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff69b4" />
            <stop offset="50%" stopColor="#e63946" />
            <stop offset="100%" stopColor="#c1121f" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M140 245 C140 245 25 170 25 95 C25 50 60 20 100 20 C120 20 135 30 140 45 C145 30 160 20 180 20 C220 20 255 50 255 95 C255 170 140 245 140 245Z"
          fill="url(#heartGrad)"
          filter="url(#glow)"
        />
        <text
          x="140"
          y="120"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          Click Me!
        </text>
        <text
          x="140"
          y="150"
          textAnchor="middle"
          fill="rgba(255,255,255,0.8)"
          fontSize="30"
        >
          💋
        </text>
      </svg>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleClick = () => {
    router.push("/slideshow");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f3 0%, #ffd6e0 30%, #ffb3c6 60%, #ff8fab 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingHearts />
      <XOXOBackground />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Top XOXO decoration */}
        <div
          className={loaded ? "fade-in-up" : ""}
          style={{
            opacity: loaded ? 1 : 0,
            fontSize: "28px",
            letterSpacing: "12px",
            color: "#e63946",
            fontWeight: "bold",
            textShadow: "0 2px 10px rgba(230, 57, 70, 0.3)",
          }}
        >
          XOXOXO
        </div>

        {/* Main title */}
        <h1
          className={`shimmer-text ${loaded ? "fade-in-up" : ""}`}
          style={{
            opacity: loaded ? 1 : 0,
            fontSize: "clamp(36px, 8vw, 72px)",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
            animationDelay: "0.2s",
            padding: "0 20px",
          }}
        >
          Happy Valentine&apos;s Day
        </h1>

        <h2
          className={loaded ? "fade-in-up" : ""}
          style={{
            opacity: loaded ? 1 : 0,
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: "bold",
            color: "#e63946",
            textAlign: "center",
            animationDelay: "0.4s",
            textShadow: "0 2px 15px rgba(230, 57, 70, 0.3)",
          }}
        >
          Nana! 💖
        </h2>

        {/* Divider kisses */}
        <div
          className={loaded ? "fade-in-up" : ""}
          style={{
            opacity: loaded ? 1 : 0,
            fontSize: "24px",
            letterSpacing: "8px",
            animationDelay: "0.6s",
          }}
        >
          💋 💋 💋
        </div>

        {/* Heart button */}
        <div
          className={loaded ? "bounce-in" : ""}
          style={{
            opacity: loaded ? 1 : 0,
            animationDelay: "0.8s",
          }}
        >
          <BigHeart onClick={handleClick} />
        </div>

        {/* Hint text */}
        <p
          className={loaded ? "fade-in-up" : ""}
          style={{
            opacity: loaded ? 1 : 0,
            color: "#c1121f",
            fontSize: "16px",
            fontStyle: "italic",
            animationDelay: "1.2s",
            textAlign: "center",
          }}
        >
          We have a surprise for you...
        </p>

        {/* Bottom XOXO */}
        <div
          className={loaded ? "fade-in-up" : ""}
          style={{
            opacity: loaded ? 1 : 0,
            fontSize: "28px",
            letterSpacing: "12px",
            color: "#e63946",
            fontWeight: "bold",
            animationDelay: "1.4s",
            textShadow: "0 2px 10px rgba(230, 57, 70, 0.3)",
          }}
        >
          XOXOXO
        </div>
      </div>
    </div>
  );
}
