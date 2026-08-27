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
import MobileNavigation from "../../components/mobile-navigation";

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
    return {};
  }

  return {
    title: `${article.title} | CardPick`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="article-page">
      <header className="article-site-header">
        <Link className="brand" href="/">
          <span>CardPick</span>
        </Link>
        <MobileNavigation />
      </header>

      <article className="article-shell">
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
                <div className="markdown-table-scroll">
                  <table {...props} />
                </div>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      <footer>
        <p>
          CardPick is an editorial comparison concept. Always read the provider
          terms, fees, eligibility criteria, and PDS/TMD before applying.
        </p>
      </footer>
    </main>
  );
}
