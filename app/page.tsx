import Image from "next/image";
import Link from "next/link";
import { formatArticleDate, getAllArticles } from "../lib/articles";
import MobileNavigation from "./components/mobile-navigation";

const featuredCards = [
  {
    name: "Velocity Points All-Rounder",
    fit: "Best for frequent domestic travellers",
    annualFee: "$295",
    earn: "1.25 Velocity pts / $1 eligible spend",
    perks: ["2 lounge passes", "Travel insurance", "60k bonus points"],
    tone: "blue",
  },
  {
    name: "Everyday Cashback Plus",
    fit: "Best for groceries and fuel",
    annualFee: "$99",
    earn: "Up to 3% back in rotating categories",
    perks: ["No FX margin", "Mobile wallet offers", "Low income threshold"],
    tone: "green",
  },
  {
    name: "Premium Qantas Rewards",
    fit: "Best for points maximisers",
    annualFee: "$450",
    earn: "1 Qantas pt / $1 up to cap",
    perks: ["90k bonus points", "Airport lounge access", "Concierge"],
    tone: "charcoal",
  },
];

const metrics = [
  ["120+", "cards tracked"],
  ["24", "benefit categories"],
  ["Weekly", "offer refresh"],
];

export default function Home() {
  const articles = getAllArticles();

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#">
          <span>CardPick</span>
        </a>
        <MobileNavigation />
      </header>

      <section className="hero">
        <Image
          src="/cardpick-hero.png"
          alt="Credit cards, coffee, and a phone showing comparison rows on a Sydney cafe table"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Australian credit card intelligence</p>
          <h1>CardPick</h1>
          <p className="hero-copy">
            Clear, benefit-led guides to help Australians compare rewards cards,
            cashback offers, travel perks, fees, and sign-up bonuses with less
            noise.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#picks">
              View top picks
            </a>
            <a className="secondary-action" href="#guides">
              Read latest guides
            </a>
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="CardPick coverage">
        {metrics.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      {/* <section className="section intro">
        <div>
          <p className="section-kicker">Built for comparison</p>
          <h2>Find the card whose benefits actually match your spending.</h2>
        </div>
        <p>
          CardPick weighs fees, points value, bonus eligibility, travel perks,
          insurance rules, purchase rates, and the everyday details that can
          make a card useful or expensive.
        </p>
      </section> */}

      {/* <section className="section" id="picks">
        <div className="section-heading">
          <p className="section-kicker">Editor picks</p>
          <h2>Cards worth shortlisting this month</h2>
        </div>
        <div className="card-grid">
          {featuredCards.map((card) => (
            <article
              className="pick-card"
              data-tone={card.tone}
              key={card.name}
            >
              <div className="mini-card" aria-hidden="true">
                <span />
                <span />
              </div>
              <p>{card.fit}</p>
              <h3>{card.name}</h3>
              <dl>
                <div>
                  <dt>Annual fee</dt>
                  <dd>{card.annualFee}</dd>
                </div>
                <div>
                  <dt>Earn rate</dt>
                  <dd>{card.earn}</dd>
                </div>
              </dl>
              <ul>
                {card.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section> */}

      <section className="section articles" id="guides">
        <div className="section-heading">
          <p className="section-kicker">Latest articles</p>
          <h2>Fresh explainers for smarter applications</h2>
        </div>
        <div className="article-list">
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.slug}>
              <article className="article-row">
                <div>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <div className="article-meta">
                  <time dateTime={article.date}>
                    {formatArticleDate(article.date)}
                  </time>
                  <span>{article.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div>
          <p className="section-kicker">Weekly shortlist</p>
          <h2>Get the best new offers before you apply.</h2>
        </div>
        <form>
          <label htmlFor="email">Email address</label>
          <div className="signup-row">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <button type="submit">Subscribe</button>
          </div>
        </form>
      </section>

      <footer>
        <p>
          CardPick is an editorial comparison concept. Always read the provider
          terms, fees, eligibility criteria, and PDS/TMD before applying.
        </p>
      </footer>
    </main>
  );
}
