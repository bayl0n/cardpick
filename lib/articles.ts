import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const wordsPerMinute = 200;

export type ArticleSummary = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
};

export type Article = ArticleSummary & {
  content: string;
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

function readDate(value: unknown, filename: string): string {
  const date = readString(value, "date", filename);
  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsedDate.valueOf()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`Invalid "date" in ${filename}; expected YYYY-MM-DD`);
  }

  return date;
}

function calculateReadTime(content: string): string {
  const readableText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/https?:\/\/\S+/g, " ");
  const wordCount =
    readableText.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}

function readArticleFile(filename: string): Article {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(articlesDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: readString(data.title, "title", filename),
    category: readString(data.category, "category", filename),
    excerpt: readString(data.excerpt, "excerpt", filename),
    readTime: calculateReadTime(content),
    date: readDate(data.date, filename),
    content,
  };
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getAllArticles(): ArticleSummary[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readArticleFile)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .map(({ content: _content, ...article }) => article);
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

  return readArticleFile(filename);
}
