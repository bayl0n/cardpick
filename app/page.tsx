import type { Metadata } from "next";
import Link from "next/link";
import { formatArticleDate, getAllArticles } from "../lib/articles";
import { siteDescription, siteTitle } from "../lib/seo";
import { Arrow, SiteFooter, SiteHeader } from "./components/site-chrome";

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
    languages: {
      "en-AU": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const topics = [
  { label: "Find your starting point", title: "Choosing a card", description: "Understand the fees, benefits and everyday fit.", href: "/articles/what-card-is-right-for-you", symbol: "card" },
  { label: "Make everyday spending count", title: "Cashback & rewards", description: "Look beyond the bonus and into the real value.", href: "/articles/best-cashback-commbank", symbol: "reward" },
  { label: "Before your next departure", title: "Travel & lounge access", description: "Get to know the perks that go the distance.", href: "/articles/best-lounge-access-cards", symbol: "travel" },
];

function TopicIcon({ symbol }: { symbol: string }) {
  return (
    <svg className="topic-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {symbol === "card" ? <><rect x="4" y="7" width="24" height="18" rx="3" /><path d="M4 13h24M9 20h5" /></> :
        symbol === "reward" ? <><path d="m16 4 3.7 7.5 8.3 1.2-6 5.8 1.4 8.3L16 23l-7.4 3.8 1.4-8.3-6-5.8 8.3-1.2Z" /></> :
        <><path d="m5 17 9 2 2 9 3-1 1-9 7-7c3-3 1-5-2-3l-8 6-9-1Z" /><path d="m6 25 4-4" /></>}
    </svg>
  );
}

export default function Home() {
  const articles = getAllArticles();
  const [featured, ...otherArticles] = articles;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow"><span /> Australian credit card guides</p>
            <h1 id="hero-title">Your next card.<br />A <em>smarter pick.</em></h1>
            <p className="hero-copy">Make sense of the points, perks and fine print. Clear guides to help you find a credit card that fits your life.</p>
            <div className="hero-actions">
              <Link className="primary-action" href="#guides">Explore the guides <Arrow /></Link>
              <Link className="text-link" href="/articles/what-card-is-right-for-you">New to credit cards? <Arrow diagonal /></Link>
            </div>
            <p className="hero-note">Rewards. Travel. Everyday value. Start with what matters to you.</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <span className="art-label">A little clarity. A better choice.</span>
            <div className="illustrated-card card-back"><span>Everyday possibilities</span><span className="card-rings" /></div>
            <div className="illustrated-card card-front">
              <span className="art-card-brand">CardPick<span>.</span></span>
              <svg className="card-chip" viewBox="0 0 40 30"><rect x="1" y="1" width="38" height="28" rx="6" /><path d="M14 1v28M26 1v28M1 10h13m12 0h13M1 20h13m12 0h13M14 15h12" /></svg>
              <span className="card-tagline">Choose with<br /><em>confidence.</em></span>
              <span className="card-monogram">cp.</span>
            </div>
            <div className="art-caption"><span className="art-spark">✳</span> More understanding.<br />More possibility.</div>
          </div>
        </section>

        <section className="topic-section container" aria-label="Explore by interest">
          {topics.map((topic) => (
            <Link className="topic-link" href={topic.href} key={topic.title}>
              <TopicIcon symbol={topic.symbol} />
              <div><span className="topic-label">{topic.label}</span><h2>{topic.title}</h2><p>{topic.description}</p></div>
              <Arrow diagonal />
            </Link>
          ))}
        </section>

        <section className="guides-section" id="guides" aria-labelledby="guides-title">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">The CardPick journal</p><h2 id="guides-title">A clearer view of credit cards.</h2></div>
              <p>Practical explainers. Useful comparisons.<br />A little homework that goes a long way.</p>
            </div>
            {featured && (
              <Link className="featured-guide" href={`/articles/${featured.slug}`}>
                <div className="feature-art" aria-hidden="true">
                  <div className="feature-globe"><span /><span /><span /></div>
                  <svg className="feature-plane" viewBox="0 0 32 32" fill="none"><path d="m3 18 10 2 3 9 3-1 1-10 9-9c2-3 0-5-3-3l-9 8-10-1Z" /></svg>
                  <span className="feature-art-label">The more you know,<br /><em>the further you go.</em></span>
                </div>
                <article className="featured-content">
                  <div className="guide-labels"><span className="category-label">{featured.category.join(" / ")}</span><span className="latest-label">Latest guide</span></div>
                  <h3>{featured.title}</h3>
                  <p>{featured.excerpt}</p>
                  <div className="guide-bottom"><div className="article-meta"><time dateTime={featured.date}>{formatArticleDate(featured.date)}</time><span>{featured.readTime}</span></div><span className="circle-arrow"><Arrow /></span></div>
                </article>
              </Link>
            )}
            <div className="article-grid">
              {otherArticles.map((article) => (
                <Link className="guide-card" href={`/articles/${article.slug}`} key={article.slug}>
                  <article>
                    <span className="category-label">{article.category.join(" / ")}</span>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="guide-bottom"><div className="article-meta"><time dateTime={article.date}>{formatArticleDate(article.date)}</time><span>{article.readTime}</span></div><Arrow diagonal /></div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="getting-started container">
          <div className="getting-started-icon" aria-hidden="true"><TopicIcon symbol="card" /></div>
          <div><p className="section-kicker">Start with the essentials</p><h2>The right card starts with you.</h2><p>Your spending, your travel plans, your priorities. Get to know what to look for before you apply.</p></div>
          <Link className="primary-action" href="/articles/what-card-is-right-for-you">Find your starting point <Arrow /></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
