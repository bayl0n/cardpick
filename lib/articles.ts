import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export type ArticleSummary = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
};

export type Article = ArticleSummary & {
  content: string;
};

type ArticleFile = Article & {
  order: number;
};

function readString(
  value: unknown,
  field: string,
  filename: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing or invalid "${field}" in ${filename}`);
  }

  return value;
}

function readOrder(value: unknown, filename: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Missing or invalid "order" in ${filename}`);
  }

  return value;
}

function readArticleFile(filename: string): ArticleFile {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(articlesDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: readString(data.title, "title", filename),
    category: readString(data.category, "category", filename),
    excerpt: readString(data.excerpt, "excerpt", filename),
    readTime: readString(data.readTime, "readTime", filename),
    order: readOrder(data.order, filename),
    content,
  };
}

export function getAllArticles(): ArticleSummary[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readArticleFile)
    .sort((a, b) => a.order - b.order)
    .map(({ content: _content, order: _order, ...article }) => article);
}

export function getArticle(slug: string): Article | null {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }

  const filename = `${slug}.md`;
  const filePath = path.join(articlesDirectory, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { order: _order, ...article } = readArticleFile(filename);

  return article;
}
