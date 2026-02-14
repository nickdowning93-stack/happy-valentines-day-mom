import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Happy Valentine's Day, Mom! From Johnny & James";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff0f3 0%, #ffd6e0 25%, #ffb3c6 50%, #ff8fab 75%, #e63946 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {["X", "O", "X", "O", "X", "O", "X", "O", "X", "O", "X", "O"].map(
          (letter, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i % 4) * 30 + 5}%`,
                top: `${Math.floor(i / 4) * 35 + 5}%`,
                fontSize: `${40 + (i % 3) * 15}px`,
                color: "rgba(230, 57, 70, 0.08)",
                fontWeight: "bold",
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (10 + i * 3)}deg)`,
              }}
            >
              {letter}
            </div>
          )
        )}
        <div style={{ position: "absolute", top: "30px", left: "40px", fontSize: "50px", display: "flex" }}>💕</div>
        <div style={{ position: "absolute", top: "50px", right: "60px", fontSize: "40px", display: "flex" }}>💖</div>
        <div style={{ position: "absolute", bottom: "50px", left: "80px", fontSize: "45px", display: "flex" }}>💗</div>
        <div style={{ position: "absolute", bottom: "30px", right: "50px", fontSize: "50px", display: "flex" }}>💘</div>
        <div style={{ fontSize: "28px", letterSpacing: "12px", color: "#e63946", fontWeight: "bold", marginBottom: "10px", display: "flex" }}>XOXOXO</div>
        <div style={{ fontSize: "90px", marginBottom: "5px", display: "flex" }}>❤️</div>
        <div style={{ fontSize: "72px", fontWeight: "bold", color: "#e63946", textAlign: "center", lineHeight: 1.1, display: "flex" }}>Happy Valentine&apos;s Day</div>
        <div style={{ fontSize: "64px", fontWeight: "bold", color: "#c1121f", display: "flex", alignItems: "center", gap: "10px" }}>Mom! 💖</div>
        <div style={{ fontSize: "30px", margin: "8px 0", letterSpacing: "10px", display: "flex" }}>💋 💋 💋</div>
        <div style={{ fontSize: "32px", color: "#c1121f", fontStyle: "italic", display: "flex" }}>From your favorite nephews</div>
        <div style={{ fontSize: "48px", fontWeight: "bold", color: "#e63946", display: "flex" }}>Johnny & James</div>
        <div style={{ fontSize: "24px", letterSpacing: "10px", color: "#e63946", fontWeight: "bold", marginTop: "10px", display: "flex" }}>XOXOXO</div>
      </div>
    ),
    { ...size }
  );
}
