import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  formatArticleDate,
  getAllArticles,
  getArticle,
} from "../../../lib/articles";
import {
  absoluteUrl,
  serializeJsonLd,
  siteName,
} from "../../../lib/seo";
import { Arrow, SiteFooter, SiteHeader } from "../../components/site-chrome";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "en-AU": canonicalPath,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_AU",
      url: canonicalPath,
      siteName,
      title: article.title,
      description: article.excerpt,
      publishedTime: `${article.date}T00:00:00.000Z`,
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = absoluteUrl(`/articles/${article.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        datePublished: `${article.date}T00:00:00.000Z`,
        articleSection: article.category,
        inLanguage: "en-AU",
        image: absoluteUrl(`/articles/${article.slug}/opengraph-image`),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        author: {
          "@id": `${absoluteUrl()}#organization`,
        },
        publisher: {
          "@id": `${absoluteUrl()}#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="article-page" id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
        />
        <article className="article-shell">
          <Link className="back-link" href="/#guides">
            <Arrow /> All guides
          </Link>
          <header className="article-title">
            <p className="section-kicker">{article.category}</p>
            <h1 className="article-heading">{article.title}</h1>
            <p>{article.excerpt}</p>
            <div className="article-meta">
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
              <span>{article.readTime}</span>
            </div>
          </header>

          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node: _node, ...props }) => (
                  <div
                    className="markdown-table-scroll"
                    tabIndex={0}
                    role="region"
                    aria-label="Scrollable comparison table"
                  >
                    <table {...props} />
                  </div>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
