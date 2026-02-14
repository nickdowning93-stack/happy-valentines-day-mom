import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff69b4, #e63946)",
          borderRadius: "36px",
          fontSize: "100px",
        }}
      >
        ❤️
      </div>
    ),
    { ...size }
  );
}
