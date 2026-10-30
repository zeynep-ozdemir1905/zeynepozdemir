import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          background: "#f9a8c9",
          border: "4px solid #1a1033",
          borderRadius: 18,
          color: "#1a1033",
          fontSize: 40,
          fontWeight: 800,
        }}
      >
        Z
      </div>
    ),
    size,
  );
}
