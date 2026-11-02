'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#fcfaf8]/95 backdrop-blur-sm border-b border-black/10'
          : 'bg-[#fcfaf8]/80 backdrop-blur-xs border-b border-black/5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-serif font-medium tracking-tight text-[#111111] hover:opacity-70 transition-opacity"
        >
          Sales Autonomy
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            <li>
              <Link
                href="/portal/demo"
                className="text-sm text-[#111111]/65 hover:text-[#111111] transition-colors font-medium tracking-tight"
              >
                Live Bench
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-sm text-[#111111]/65 hover:text-[#111111] transition-colors font-medium tracking-tight"
              >
                Bench Pass
              </Link>
            </li>
            <li>
              <Link
                href="/academy"
                className="text-sm text-[#111111]/65 hover:text-[#111111] transition-colors font-medium tracking-tight"
              >
                For Candidates
              </Link>
            </li>
          </ul>
          <Link
            href="/hire/apply"
            className="bg-[#111111] hover:bg-[#333333] text-white px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Unlock the Bench
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#111111] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#fcfaf8] border-b border-black/10 p-6 flex flex-col gap-4 shadow-xl">
          <Link
            href="/portal/demo"
            className="text-base font-medium text-[#111111]/80 hover:text-[#111111] py-2"
            onClick={() => setIsOpen(false)}
          >
            Live Bench
          </Link>
          <Link
            href="/pricing"
            className="text-base font-medium text-[#111111]/80 hover:text-[#111111] py-2"
            onClick={() => setIsOpen(false)}
          >
            Bench Pass
          </Link>
          <Link
            href="/academy"
            className="text-base font-medium text-[#111111]/80 hover:text-[#111111] py-2"
            onClick={() => setIsOpen(false)}
          >
            For Candidates
          </Link>
          <Link
            href="/hire/apply"
            className="bg-[#111111] text-white px-6 py-3.5 font-medium text-center mt-2"
            onClick={() => setIsOpen(false)}
          >
            Unlock the Bench
          </Link>
        </div>
      )}
    </header>
  );
}
