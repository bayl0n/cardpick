import type { MetadataRoute } from "next";
import { getAllArticles } from "../lib/articles";
import { absoluteUrl } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const mostRecentArticle = articles.at(0)?.date;

  return [
    {
      url: absoluteUrl(),
      lastModified: mostRecentArticle
        ? `${mostRecentArticle}T00:00:00.000Z`
        : undefined,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/cardpick-hero.png")],
    },
    {
      url: absoluteUrl("/about-us"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: `${article.date}T00:00:00.000Z`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
