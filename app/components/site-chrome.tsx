import Link from "next/link";
import MobileNavigation from "./mobile-navigation";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="CardPick home">
      <svg className="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="3" y="9" width="25" height="18" rx="4" transform="rotate(-14 3 9)" />
        <rect x="8" y="12" width="25" height="18" rx="4" />
        <path d="m17 21 3 3 6-6" />
      </svg>
      <span>CardPick<span className="brand-dot">.</span></span>
    </Link>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <MobileNavigation />
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>A little clarity for your next card.</p>
          </div>
          <Link className="text-link" href="/#guides">Explore the guides <Arrow /></Link>
        </div>
        <div className="footer-bottom">
          <p>Always read the provider terms, fees, eligibility criteria, and PDS/TMD before applying.</p>
          <span>Australian credit card guides</span>
        </div>
      </div>
    </footer>
  );
}
