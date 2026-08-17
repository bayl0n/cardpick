import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardPick | Australian credit card guides",
  description:
    "CardPick publishes independent guides to Australian credit cards, rewards, points, fees, and everyday benefits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";try{var s=localStorage.getItem("cardpick-theme");if(s==="light"||s==="dark")t=s}catch(e){}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
