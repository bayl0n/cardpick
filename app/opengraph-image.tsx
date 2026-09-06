import { ImageResponse } from "next/og";

export const alt =
  "CardPick — independent Australian credit card guides and comparisons";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0d6f72",
          color: "#f7f5ef",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              color: "#bce4df",
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Australian credit card intelligence
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 1,
              marginTop: 28,
            }}
          >
            CardPick
          </div>
          <div
            style={{
              color: "#e5f4f1",
              display: "flex",
              fontSize: 38,
              lineHeight: 1.25,
              marginTop: 30,
            }}
          >
            Clear guides to rewards, fees, points and travel perks.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
