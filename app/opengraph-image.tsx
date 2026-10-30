import { ImageResponse } from "next/og";
import { PROFILE } from "@/app/data/portfolio";

export const alt = `${PROFILE.name} — ${PROFILE.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#d9cef7",
          padding: 56,
          color: "#1a1033",
          border: "10px solid #1a1033",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {["#f9a8c9", "#eaf7a6", "#a8e4db", "#ffd2b3"].map((c) => (
            <div
              key={c}
              style={{ width: 54, height: 54, borderRadius: 27, background: c, border: "4px solid #1a1033" }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1 }}>{PROFILE.name}</div>
          <div style={{ marginTop: 20, fontSize: 44, fontWeight: 700 }}>Junior Software Engineer</div>
          <div style={{ marginTop: 6, fontSize: 34, fontWeight: 600, color: "#3d3560" }}>
            {`Frontend & Full-Stack · ${PROFILE.city} · ${PROFILE.relocation}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
