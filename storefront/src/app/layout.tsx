import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import { NavWrapper } from "@/components/NavWrapper";
import { Header, IsometricCubesLogo } from "@/components/Header";
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
    default: "Sales Autonomy — Pre-Cleaned Vertical Market Databases for B2B GTM Teams",
    template: "%s | Sales Autonomy",
  },
  description:
    "Pre-cleaned vertical market databases for B2B SaaS, mid-market GTM teams, and Clay agencies. 750,000+ physical facilities, fleet policy cancellations, multi-site clinics, and government filings synced to your CRM.",
  openGraph: {
    title: "Sales Autonomy — Pre-Cleaned Vertical Market Databases for B2B GTM Teams",
    description:
      "Own a private database of every buyer in your market. Synced to HubSpot, Salesforce & Clay.",
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
        className={`${inter.variable} ${newsreader.variable} font-sans bg-[#faf9f5] text-[#141413] antialiased min-h-screen flex flex-col tracking-[-0.012em] selection:bg-[#e5e2d9] selection:text-[#141413]`}
      >
        <NavWrapper>
          <Header />
        </NavWrapper>

        <main className="flex-grow">{children}</main>

        <NavWrapper>
          <footer className="bg-[#faf9f5] border-t border-black/10 pt-16 pb-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
                <div className="md:col-span-5">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2.5 mb-4 hover:opacity-85 transition-opacity"
                  >
                    <IsometricCubesLogo className="w-7 h-7 shrink-0" />
                    <span
                      style={{
                        fontFamily:
                          "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "#202124",
                      }}
                      className="text-[18px] leading-none"
                    >
                      salesautonomy.com
                    </span>
                  </Link>
                  <p className="text-[#5c5852] text-sm mb-5 max-w-sm leading-relaxed">
                    Pre-cleaned vertical market databases for B2B GTM teams and Clay agencies. Backed by SAM.gov, DOL Form 5500, CMS NPPES, FMCSA, and OSHA/EPA public filings with SHA-256 source receipts.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0eee6] border border-black/8 text-xs text-[#3d3a34] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#2e6f40]" />
                    <span>66 Live Federal Signals Synced · &lt;2% Bounce SLA</span>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-xs font-semibold text-[#141413] mb-4">
                    3 Vertical Market Engines
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-sm text-[#5c5852]">
                    <li>
                      <Link href="/portal/demo?engine=HEALTHCARE_NPPES" className="hover:text-[#141413] transition-colors">
                        01 · Healthcare &amp; Multi-Site Clinics (184K Orgs)
                      </Link>
                    </li>
                    <li>
                      <Link href="/portal/demo?engine=INDUSTRIAL_FLEET_OSHA" className="hover:text-[#141413] transition-colors">
                        02 · Industrial, Fleet &amp; Facility Risk (246K Sites)
                      </Link>
                    </li>
                    <li>
                      <Link href="/portal/demo?engine=PUBLIC_SECTOR_SAM" className="hover:text-[#141413] transition-colors">
                        03 · Public Sector, Contractors &amp; Permits (319K Entities)
                      </Link>
                    </li>
                    <li>
                      <Link href="/academy" className="hover:text-[#141413] transition-colors">
                        5 Open-Book Data Engineering Plays
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="md:col-span-3">
                  <h3 className="text-xs font-semibold text-[#141413] mb-4">
                    Pilot &amp; Architecture
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-sm text-[#5c5852]">
                    <li>
                      <Link href="/hire/apply" className="hover:text-[#141413] transition-colors">
                        7-Day Territory Pilot ($1,950)
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:text-[#141413] transition-colors">
                        Pricing &amp; 100% Rollover Credit
                      </Link>
                    </li>
                    <li>
                      <Link href="/credibility" className="hover:text-[#141413] transition-colors">
                        6-Table Schema &amp; Provenance Lock
                      </Link>
                    </li>
                    <li>
                      <Link href="/api/vault" className="hover:text-[#141413] transition-colors">
                        Live REST &amp; MCP API (/api/vault)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#6b665e]">
                <p>&copy; {new Date().getFullYear()} Sales Autonomy. Public-record commercial intelligence · Non-FCRA.</p>
                <div className="flex items-center gap-6">
                  <Link href="/llms.txt" className="hover:text-[#141413] transition-colors">
                    llms.txt
                  </Link>
                  <Link href="/terms" className="hover:text-[#141413] transition-colors">
                    Terms
                  </Link>
                  <Link href="/privacy" className="hover:text-[#141413] transition-colors">
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
