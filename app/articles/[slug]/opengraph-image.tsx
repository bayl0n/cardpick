import { ImageResponse } from "next/og";
import { getArticle } from "../../../lib/articles";

export const alt = "CardPick article";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#eef1ee",
          color: "#013D57",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 82px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#013D57",
            display: "flex",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          CardPick
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: "#013D57",
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article?.category ?? "Credit card guide"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              marginTop: 20,
            }}
          >
            {article?.title ?? "Australian credit card guide"}
          </div>
        </div>
        <div
          style={{
            background: "#7E9296",
            display: "flex",
            height: 10,
            width: 170,
          }}
        />
      </div>
    ),
    size,
  );
}
