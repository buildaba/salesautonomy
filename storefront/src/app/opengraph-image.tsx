import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sales Autonomy — Call buyers who have a deadline right now.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf9f5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 600,
            color: "#141413",
            letterSpacing: "-0.02em",
          }}
        >
          salesautonomy.com
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              lineHeight: 1.06,
              color: "#141413",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
            }}
          >
            Call buyers who have a deadline right now.
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#5c5852",
              maxWidth: "880px",
            }}
          >
            Give sales reps and RevOps verified buyer signals from public government filings across
            healthcare clinics, trucking fleets, factories, and contractors.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "22px",
            color: "#2e6f40",
            fontWeight: 600,
          }}
        >
          <span>7-Day Pilot ($1,950)</span>
          <span>·</span>
          <span>&lt;2% Email Bounce Guarantee</span>
          <span>·</span>
          <span>Max 5 Seats Per Territory</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
