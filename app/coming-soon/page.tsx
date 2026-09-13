import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Coming soon",
  description: "More credit card, rewards and travel guides are on the way.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonPage() {
  return (
    <>
      <SiteHeader />
      <main className="article-shell coming-soon" id="main-content">
        <div className="article-title">
          <p className="section-kicker">More guides on the way</p>
          <h1>Coming soon</h1>
          <p>
            We’re preparing more credit card, rewards and travel guides.
            Explore our latest guides while you wait.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/#guides">
              All guides <Arrow />
            </Link>
            <Link className="text-link" href="/">Back to Home</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
