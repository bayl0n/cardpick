import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { absoluteUrl, serializeJsonLd, siteName } from "../../lib/seo";
import { Arrow, SiteFooter, SiteHeader } from "../components/site-chrome";

const { data, content } = matter(
  fs.readFileSync(
    path.join(process.cwd(), "content", "about-us", "about-us.md"),
    "utf8",
  ),
);

if (
  typeof data.title !== "string" || !data.title.trim() ||
  typeof data.excerpt !== "string" || !data.excerpt.trim()
) {
  throw new Error("The About Us page needs a title and excerpt in its metadata.");
}

const title = data.title.trim();
const description = data.excerpt.trim();

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: {
    canonical: "/about-us",
    languages: { "en-AU": "/about-us" },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName,
    url: "/about-us",
    title: `About us | ${siteName}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `About us | ${siteName}`,
    description,
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/about-us")}#webpage`,
    url: absoluteUrl("/about-us"),
    name: title,
    description,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${absoluteUrl()}#website` },
    about: { "@id": `${absoluteUrl()}#organization` },
  };

  return (
    <>
      <SiteHeader />
      <main className="article-page" id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <article className="article-shell">
          <Link className="back-link" href="/">
            <Arrow /> Back to home
          </Link>
          <header className="article-title">
            <p className="section-kicker">About us</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
          <div className="about-actions">
            <Link className="primary-action" href="/#guides">
              Explore the guides <Arrow />
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
