export const siteName = "CardPick";
export const siteTitle = "CardPick | Australian Credit Card Guides";
export const siteDescription =
  "Independent Australian credit card guides covering rewards, points, fees, cashback, lounge access, travel perks, and sign-up offers.";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cardpick.com.au";

export const siteUrl = new URL(
  configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`,
);

export function absoluteUrl(path = "/"): string {
  return new URL(path.replace(/^\//, ""), siteUrl).toString();
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
