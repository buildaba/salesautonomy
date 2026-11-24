import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import { NavWrapper } from "@/components/NavWrapper";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salesautonomy.com"),
  title: {
    default: "Sales Autonomy — Private Market Databases for B2B Sales Teams",
    template: "%s | Sales Autonomy",
  },
  description:
    "We build and deploy a private, secure database of every buyer, location, public record, and decision-maker in your market—then keep it updated for a small monthly retainer.",
  openGraph: {
    title: "Sales Autonomy — Private Market Databases for B2B Sales Teams",
    description:
      "Own your market database. Stop renting stale lists from Apollo and ZoomInfo.",
    url: "https://salesautonomy.com",
    siteName: "Sales Autonomy",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${newsreader.variable} font-sans bg-[#fcfaf8] text-[#111111] antialiased min-h-screen flex flex-col tracking-tight selection:bg-[#e0dcd0] selection:text-[#111111]`}
      >
        <NavWrapper>
          <Header />
        </NavWrapper>

        <main className="flex-grow">{children}</main>

        <NavWrapper>
          <footer className="bg-[#fcfaf8] border-t border-black/10 pt-20 pb-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-2">
                  <Link
                    href="/"
                    className="text-2xl font-serif font-medium tracking-tight mb-4 inline-block text-[#111111]"
                  >
                    Sales Autonomy
                  </Link>
                  <p className="text-[#111111]/60 text-sm mb-6 max-w-sm font-light leading-relaxed">
                    We build and deploy a private database of every qualified buyer in your market, backed by public filings, permits, and directories. Then we keep it updated for a flat monthly fee.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-[#111111]/40 mb-5 uppercase tracking-[0.2em] text-[0.7rem]">
                    Product &amp; Data
                  </h3>
                  <ul className="flex flex-col gap-3.5 text-sm">
                    <li>
                      <Link href="/portal/demo" className="text-[#111111]/70 hover:text-[#111111] transition-colors">
                        Live Database Preview
                      </Link>
                    </li>
                    <li>
                      <Link href="/academy" className="text-[#111111]/70 hover:text-[#111111] transition-colors">
                        5 Data Plays
                      </Link>
                    </li>
                    <li>
                      <Link href="/credibility" className="text-[#111111]/70 hover:text-[#111111] transition-colors">
                        How We Verify Data
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-[#111111]/40 mb-5 uppercase tracking-[0.2em] text-[0.7rem]">
                    Get Started
                  </h3>
                  <ul className="flex flex-col gap-3.5 text-sm">
                    <li>
                      <Link href="/pricing" className="text-[#111111]/70 hover:text-[#111111] transition-colors">
                        Build &amp; Retainer Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="/hire/apply" className="text-[#111111]/70 hover:text-[#111111] transition-colors">
                        Request 250-Row Sandbox
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="text-[#111111]/70 hover:text-[#111111] transition-colors">
                        Client Vault API Keys
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#111111]/45">
                <p>&copy; {new Date().getFullYear()} Sales Autonomy. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <Link href="/llms.txt" className="hover:text-[#111111] transition-colors">
                    llms.txt
                  </Link>
                  <Link href="/terms" className="hover:text-[#111111] transition-colors">
                    Terms
                  </Link>
                  <Link href="/privacy" className="hover:text-[#111111] transition-colors">
                    Privacy
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </NavWrapper>
      </body>
    </html>
  );
}
