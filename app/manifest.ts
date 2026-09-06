import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "../lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Australian Credit Card Guides`,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ef",
    theme_color: "#0d6f72",
    lang: "en-AU",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
