'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Search,
  Database,
  ShieldCheck,
  Building2,
  Truck,
  Landmark,
  FileCheck2,
} from 'lucide-react';

/**
 * 3-Cube Isometric Pyramid Mark from buildaba.com (BuildABALogo.tsx)
 * Top cube: #08d6a0 (Emerald Mint)
 * Bottom-left cube: #ffd166 (Gold)
 * Bottom-right cube: #ef476f (Coral Red)
 */
export const IsometricCubesLogo = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg
    viewBox="3 3 84 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Bottom-Left Cube (#ffd166) */}
    <path fill="#ffd166" d="M 44.980469 50.597656 L 25.5625 61.816406 L 6.144531 50.597656 L 25.5625 39.386719 Z M 44.980469 50.597656" />
    <path fill="#ffd166" d="M 44.980469 50.597656 L 44.980469 73.03125 L 25.5625 84.246094 L 25.5625 61.816406 Z M 44.980469 50.597656" />
    <path fill="#ffd166" d="M 25.5625 61.816406 L 25.5625 84.246094 L 6.144531 73.03125 L 6.144531 50.597656 Z M 25.5625 61.816406" />

    {/* Bottom-Right Cube (#ef476f) */}
    <path fill="#ef476f" d="M 83.816406 50.597656 L 64.398438 61.816406 L 44.980469 50.597656 L 64.398438 39.386719 Z M 83.816406 50.597656" />
    <path fill="#ef476f" d="M 64.398438 61.816406 L 64.398438 84.246094 L 44.980469 73.03125 L 44.980469 50.597656 Z M 64.398438 61.816406" />
    <path fill="#ef476f" d="M 83.816406 50.597656 L 83.816406 73.03125 L 64.398438 84.246094 L 64.398438 61.816406 Z M 83.816406 50.597656" />

    {/* Top Cube (#08d6a0) */}
    <path fill="#08d6a0" d="M 44.980469 28.167969 L 44.980469 50.597656 L 25.5625 39.386719 L 25.5625 16.953125 Z M 44.980469 28.167969" />
    <path fill="#08d6a0" d="M 64.398438 16.953125 L 44.980469 28.167969 L 25.5625 16.953125 L 44.980469 5.738281 Z M 64.398438 16.953125" />
    <path fill="#08d6a0" d="M 64.398438 16.953125 L 64.398438 39.386719 L 44.980469 50.597656 L 44.980469 28.167969 Z M 64.398438 16.953125" />

    {/* Crisp Isometric Outlines (#000000) */}
    <path fill="#000000" d="M 25.5625 85.488281 C 25.34375 85.488281 25.128906 85.433594 24.941406 85.324219 L 5.523438 74.105469 C 5.335938 73.996094 5.179688 73.839844 5.070312 73.652344 C 4.960938 73.464844 4.902344 73.25 4.902344 73.03125 L 4.902344 50.601562 C 4.902344 50.382812 4.960938 50.167969 5.070312 49.980469 C 5.179688 49.792969 5.335938 49.632812 5.523438 49.527344 L 24.941406 38.308594 C 25.128906 38.199219 25.34375 38.144531 25.5625 38.144531 C 25.777344 38.144531 25.992188 38.199219 26.179688 38.308594 L 45.597656 49.527344 C 45.789062 49.632812 45.945312 49.792969 46.054688 49.980469 C 46.164062 50.167969 46.21875 50.382812 46.21875 50.601562 L 46.21875 73.03125 C 46.21875 73.25 46.164062 73.464844 46.054688 73.652344 C 45.945312 73.839844 45.789062 73.996094 45.597656 74.105469 L 26.179688 85.324219 C 25.992188 85.433594 25.777344 85.488281 25.5625 85.488281 Z M 7.382812 72.316406 L 25.5625 82.816406 L 43.738281 72.316406 L 43.738281 51.316406 L 25.5625 40.816406 L 7.382812 51.316406 Z M 7.382812 72.316406" />
    <path fill="#000000" d="M 25.5625 63.058594 C 25.34375 63.058594 25.128906 63 24.941406 62.890625 L 5.523438 51.675781 C 5.382812 51.59375 5.257812 51.484375 5.160156 51.355469 C 5.058594 51.226562 4.988281 51.078125 4.945312 50.921875 C 4.902344 50.765625 4.890625 50.601562 4.914062 50.4375 C 4.933594 50.277344 4.988281 50.121094 5.070312 49.980469 C 5.148438 49.839844 5.257812 49.714844 5.386719 49.617188 C 5.515625 49.515625 5.664062 49.445312 5.820312 49.402344 C 5.980469 49.359375 6.144531 49.347656 6.304688 49.371094 C 6.464844 49.390625 6.621094 49.445312 6.761719 49.527344 L 25.5625 60.382812 L 44.359375 49.527344 C 44.644531 49.359375 44.984375 49.316406 45.300781 49.402344 C 45.617188 49.488281 45.890625 49.695312 46.054688 49.980469 C 46.21875 50.265625 46.261719 50.601562 46.175781 50.921875 C 46.09375 51.238281 45.882812 51.511719 45.597656 51.675781 L 26.179688 62.890625 C 25.992188 63 25.777344 63.058594 25.5625 63.058594 Z M 25.5625 63.058594" />
    <path fill="#000000" d="M 25.5625 85.488281 C 25.230469 85.488281 24.917969 85.359375 24.683594 85.125 C 24.453125 84.894531 24.320312 84.578125 24.320312 84.25 L 24.320312 61.816406 C 24.320312 61.488281 24.453125 61.171875 24.683594 60.9375 C 24.917969 60.707031 25.230469 60.574219 25.5625 60.574219 C 25.890625 60.574219 26.207031 60.707031 26.4375 60.9375 C 26.671875 61.171875 26.800781 61.488281 26.800781 61.816406 L 26.800781 84.25 C 26.800781 84.578125 26.671875 84.894531 26.4375 85.125 C 26.207031 85.359375 25.890625 85.488281 25.5625 85.488281 Z M 25.5625 85.488281" />
    <path fill="#000000" d="M 64.398438 85.488281 C 64.179688 85.488281 63.964844 85.433594 63.777344 85.324219 L 44.359375 74.105469 C 44.171875 73.996094 44.015625 73.839844 43.90625 73.652344 C 43.796875 73.464844 43.738281 73.25 43.738281 73.03125 L 43.738281 50.601562 C 43.738281 50.382812 43.796875 50.167969 43.90625 49.980469 C 44.015625 49.792969 44.171875 49.632812 44.359375 49.527344 L 63.777344 38.308594 C 63.964844 38.199219 64.179688 38.144531 64.398438 38.144531 C 64.617188 38.144531 64.828125 38.199219 65.019531 38.308594 L 84.4375 49.527344 C 84.625 49.632812 84.78125 49.792969 84.890625 49.980469 C 85 50.167969 85.054688 50.382812 85.054688 50.601562 L 85.054688 73.03125 C 85.054688 73.25 85 73.464844 84.890625 73.652344 C 84.78125 73.839844 84.625 73.996094 84.4375 74.105469 L 65.019531 85.324219 C 64.828125 85.433594 64.617188 85.488281 64.398438 85.488281 Z M 46.21875 72.316406 L 64.398438 82.816406 L 82.574219 72.316406 L 82.574219 51.316406 L 64.398438 40.816406 L 46.21875 51.316406 Z M 46.21875 72.316406" />
    <path fill="#000000" d="M 64.398438 63.058594 C 64.179688 63.058594 63.964844 63 63.777344 62.890625 L 44.359375 51.675781 C 44.21875 51.59375 44.09375 51.484375 43.996094 51.355469 C 43.894531 51.226562 43.824219 51.078125 43.78125 50.921875 C 43.738281 50.765625 43.730469 50.601562 43.75 50.4375 C 43.769531 50.277344 43.824219 50.121094 43.90625 49.980469 C 43.988281 49.839844 44.09375 49.714844 44.222656 49.617188 C 44.355469 49.515625 44.5 49.445312 44.660156 49.402344 C 44.816406 44.359375 44.980469 49.347656 45.140625 49.371094 C 45.300781 49.390625 45.457031 49.445312 45.597656 49.527344 L 64.398438 60.382812 L 83.195312 49.527344 C 83.335938 49.445312 83.492188 49.390625 83.652344 49.371094 C 83.816406 49.347656 83.980469 49.359375 84.136719 49.402344 C 84.292969 49.445312 84.441406 49.515625 84.570312 49.617188 C 84.699219 49.714844 84.808594 49.839844 84.890625 49.980469 C 84.972656 50.121094 85.023438 50.277344 85.046875 50.4375 C 85.066406 50.601562 85.054688 50.765625 85.015625 50.921875 C 84.972656 51.078125 84.898438 51.226562 84.800781 51.355469 C 84.699219 51.484375 84.578125 51.59375 84.4375 51.675781 L 65.019531 62.890625 C 64.828125 63 64.617188 63.058594 64.398438 63.058594 Z M 64.398438 63.058594" />
    <path fill="#000000" d="M 64.398438 85.488281 C 64.070312 85.488281 63.753906 85.359375 63.519531 85.125 C 63.289062 84.894531 63.15625 84.578125 63.15625 84.25 L 63.15625 61.816406 C 63.15625 61.488281 63.289062 61.171875 63.519531 60.9375 C 63.753906 60.707031 64.070312 60.574219 64.398438 60.574219 C 64.726562 60.574219 65.042969 60.707031 65.273438 60.9375 C 65.507812 61.171875 65.636719 61.488281 65.636719 61.816406 L 65.636719 84.25 C 65.636719 84.578125 65.507812 84.894531 65.273438 85.125 C 65.042969 85.359375 64.726562 85.488281 64.398438 85.488281 Z M 64.398438 85.488281" />
    <path fill="#000000" d="M 44.980469 51.839844 C 44.761719 51.839844 44.546875 51.785156 44.359375 51.675781 L 24.941406 40.457031 C 24.753906 40.351562 24.597656 40.191406 24.488281 40.003906 C 24.378906 39.816406 24.320312 39.601562 24.320312 39.382812 L 24.320312 16.953125 C 24.320312 16.734375 24.378906 16.519531 24.488281 16.332031 C 24.597656 16.144531 24.753906 15.988281 24.941406 15.878906 L 44.359375 4.660156 C 44.546875 4.554688 44.761719 4.496094 44.980469 4.496094 C 45.195312 4.496094 45.410156 4.554688 45.597656 4.660156 L 65.019531 15.878906 C 65.207031 15.988281 65.363281 16.144531 65.472656 16.332031 C 65.582031 16.519531 65.636719 16.734375 65.636719 16.953125 L 65.636719 39.382812 C 65.636719 39.601562 65.582031 39.816406 65.472656 40.003906 C 65.363281 40.191406 65.207031 40.351562 65.019531 40.457031 L 45.597656 51.675781 C 45.410156 51.785156 45.195312 51.839844 44.980469 51.839844 Z M 26.800781 38.667969 L 44.980469 49.167969 L 63.15625 38.667969 L 63.15625 17.667969 L 44.980469 7.167969 L 26.800781 17.667969 Z M 26.800781 38.667969" />
    <path fill="#000000" d="M 44.980469 29.410156 C 44.761719 29.410156 44.546875 29.351562 44.359375 29.242188 L 24.941406 18.027344 C 24.65625 17.863281 24.449219 17.589844 24.363281 17.273438 C 24.277344 16.957031 24.324219 16.617188 24.488281 16.332031 C 24.652344 16.046875 24.921875 15.839844 25.238281 15.753906 C 25.558594 15.667969 25.894531 15.714844 26.179688 15.878906 L 44.980469 26.734375 L 63.777344 15.878906 C 63.917969 15.796875 64.074219 15.742188 64.234375 15.722656 C 64.398438 15.699219 64.5625 15.710938 64.71875 15.753906 C 64.875 15.796875 65.023438 15.867188 65.152344 15.96875 C 65.28125 16.066406 65.390625 16.191406 65.472656 16.332031 C 65.554688 16.472656 65.605469 16.628906 65.628906 16.789062 C 65.648438 16.953125 65.636719 17.117188 65.59375 17.273438 C 65.554688 17.429688 65.480469 17.578125 65.382812 17.707031 C 65.28125 17.835938 65.160156 17.945312 65.019531 18.027344 L 45.597656 29.242188 C 45.410156 29.351562 45.195312 29.410156 44.980469 29.410156 Z M 44.980469 29.410156" />
    <path fill="#000000" d="M 44.980469 51.839844 C 44.652344 51.839844 44.335938 51.710938 44.101562 51.476562 C 43.871094 51.246094 43.738281 50.929688 43.738281 50.601562 L 43.738281 28.167969 C 43.738281 27.839844 43.871094 27.523438 44.101562 27.289062 C 44.335938 27.058594 44.652344 26.925781 44.980469 26.925781 C 45.308594 26.925781 45.625 27.058594 45.855469 27.289062 C 46.089844 27.523438 46.21875 27.839844 46.21875 28.167969 L 46.21875 50.601562 C 46.21875 50.929688 46.089844 51.246094 45.855469 51.476562 C 45.625 51.710938 45.308594 51.839844 44.980469 51.839844 Z M 44.980469 51.839844" />
  </svg>
);

const VAULT_DROPDOWN_ITEMS = [
  {
    label: 'Engine 1: Healthcare & Multi-Site Clinics',
    desc: '184K Org Type-2 NPIs, Authorized Officials, CMS & OIG',
    to: '/portal/demo?engine=HEALTHCARE_NPPES',
    icon: Building2,
  },
  {
    label: 'Engine 2: Industrial, Fleet & Facility Risk',
    desc: '246K FMCSA 30-day BMC-35 cancellations, OSHA & EPA',
    to: '/portal/demo?engine=INDUSTRIAL_FLEET_OSHA',
    icon: Truck,
  },
  {
    label: 'Engine 3: Public Sector & Commercial Permits',
    desc: '319K SAM.gov expirations, recompetes & permits >$100K',
    to: '/portal/demo?engine=PUBLIC_SECTOR_SAM',
    icon: Landmark,
  },
  {
    label: '6-Table Schema & Provenance Merger',
    desc: 'Inspect fn_provenance_update & SHA-256 receipts',
    to: '/credibility',
    icon: ShieldCheck,
  },
  {
    label: '5 Data Engineering Plays',
    desc: 'How we resolve domains & strip 55+ CPA keywords',
    to: '/academy',
    icon: FileCheck2,
  },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimer();
    setOpenDropdown(true);
  }, [clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(false);
    }, 130);
  }, [clearCloseTimer]);

  const isVaultActive = pathname.startsWith('/portal/demo');
  const isPlaysActive = pathname.startsWith('/academy');
  const isVerifyActive = pathname.startsWith('/credibility');
  const isPricingActive = pathname.startsWith('/pricing');

  return (
    <header
      style={{ backgroundColor: '#faf9f5' }}
      className={`fixed top-0 left-0 right-0 z-[100] h-16 lg:h-[72px] flex items-center font-sans transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-[#faf9f5] border-b border-black/10 shadow-[0_1px_2px_rgba(20,20,19,0.03),0_8px_24px_-6px_rgba(20,20,19,0.06)]'
          : 'bg-[#faf9f5] border-b border-black/5'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-5 relative">
          {/* Left Zone: BuildABA-Matched 3-Cube BrandMark */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 min-h-[36px] group z-50 relative hover:opacity-85 transition-opacity shrink-0"
          >
            <IsometricCubesLogo className="w-8 h-8 shrink-0" />
            <span
              style={{
                fontFamily:
                  "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#202124',
              }}
              className="text-[19px] leading-none select-none"
            >
              salesautonomy.com
            </span>
          </Link>

          {/* Center Zone: buildaba.com Rounded Pill Dock */}
          <nav
            ref={navRef}
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-[#f0eee6] border border-black/[0.08] shrink-0"
          >
            {/* 1. Live Vault Explorer Pill */}
            <Link
              href="/portal/demo"
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenDropdown(false);
              }}
              className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 px-3 xl:px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 ${
                isVaultActive && !openDropdown
                  ? 'bg-white text-[#141413] shadow-[0_1px_2px_rgba(20,20,19,0.07),0_0_0_1px_rgba(20,20,19,0.06)]'
                  : 'text-[#141413]/65 hover:text-[#141413] hover:bg-black/[0.04]'
              }`}
            >
              <span>3 Vertical Engines</span>
            </Link>

            {/* 2. 5 Data Plays Pill */}
            <Link
              href="/academy"
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenDropdown(false);
              }}
              className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 px-3 xl:px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 ${
                isPlaysActive && !openDropdown
                  ? 'bg-white text-[#141413] shadow-[0_1px_2px_rgba(20,20,19,0.07),0_0_0_1px_rgba(20,20,19,0.06)]'
                  : 'text-[#141413]/65 hover:text-[#141413] hover:bg-black/[0.04]'
              }`}
            >
              <span>5 Data Plays</span>
            </Link>

            {/* 3. Schema & Verification Dropdown Pill (Matches buildaba Launch Guide Dropdown) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown((p) => !p)}
                className={`flex items-center gap-1 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 px-3 xl:px-3.5 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 focus:outline-none ${
                  openDropdown || isVerifyActive
                    ? 'bg-white text-[#141413] shadow-[0_1px_2px_rgba(20,20,19,0.07),0_0_0_1px_rgba(20,20,19,0.06)]'
                    : 'text-[#141413]/65 hover:text-[#141413] hover:bg-black/[0.04]'
                }`}
              >
                <span>Schema &amp; Verification</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    openDropdown ? 'rotate-180 text-[#141413]' : 'text-[#141413]/45'
                  }`}
                />
              </button>

              <div
                aria-hidden={!openDropdown}
                className={`absolute top-full left-0 pt-2.5 w-[364px] z-[200] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left ${
                  openDropdown
                    ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 invisible -translate-y-1.5 scale-[0.98] pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-2xl border border-black/10 shadow-[0_18px_48px_-8px_rgba(20,20,19,0.16),0_4px_14px_-2px_rgba(20,20,19,0.08)] overflow-hidden">
                  <div className="p-2 space-y-0.5 bg-white">
                    {VAULT_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.to}
                          onClick={() => setOpenDropdown(false)}
                          className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-[#f5f4ef] transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#f5f4ef] group-hover:bg-[#141413] group-hover:text-[#faf9f5] border border-black/10 flex items-center justify-center shrink-0 text-[#141413]/75 transition-colors">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-[12.5px] font-semibold text-[#141413] whitespace-nowrap">
                              {item.label}
                            </span>
                            <div className="text-[11px] text-[#6b665e] truncate mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/portal/demo"
                    onClick={() => setOpenDropdown(false)}
                    className="flex items-center justify-between px-4 py-2.5 bg-[#f5f4ef] hover:bg-[#ece9df] border-t border-black/[0.08] text-xs font-semibold text-[#141413] transition-colors group"
                  >
                    <span>Open Full 66-Row Live PowerTable</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5c5852] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Pricing Direct Pill */}
            <Link
              href="/pricing"
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenDropdown(false);
              }}
              className={`inline-flex items-center text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 px-3 xl:px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 ${
                isPricingActive && !openDropdown
                  ? 'bg-white text-[#141413] shadow-[0_1px_2px_rgba(20,20,19,0.07),0_0_0_1px_rgba(20,20,19,0.06)]'
                  : 'text-[#141413]/65 hover:text-[#141413] hover:bg-black/[0.04]'
              }`}
            >
              <span>Pricing</span>
            </Link>
          </nav>

          {/* Right Zone: Search ⌘K Pill + API Console + Primary Rounded-Full CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 z-50 relative shrink-0">
            <button
              type="button"
              onClick={() => router.push('/portal/demo')}
              className="hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 xl:px-3 rounded-full bg-[#f0eee6] hover:bg-[#e6e3d8] border border-black/10 text-xs text-[#5c5852] hover:text-[#141413] transition-all cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <Search className="w-3.5 h-3.5 text-[#6b665e] group-hover:text-[#141413] transition-colors shrink-0" />
              <span className="hidden xl:inline text-[12px] font-medium">Search Vault</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium bg-white rounded border border-black/10 text-[#5c5852] shrink-0">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center min-h-[44px] lg:min-h-0 lg:h-9 px-2.5 xl:px-3 rounded-full text-[13px] font-medium tracking-[-0.01em] text-[#141413]/75 hover:text-[#141413] hover:bg-black/5 transition-colors whitespace-nowrap shrink-0"
            >
              API Keys
            </Link>

            <Link
              href="/hire/apply"
              className="group min-h-[40px] lg:min-h-0 lg:h-9 bg-[#141413] hover:bg-[#2c2b28] active:scale-[0.99] text-[#faf9f5] px-3.5 xl:px-4 rounded-full text-[12px] sm:text-[12.5px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.14),0_4px_12px_rgba(20,20,19,0.10)] transition-all shrink-0 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span className="sm:hidden">7-Day Pilot</span>
              <span className="hidden sm:inline">Start 7-Day Pilot ($1,950)</span>
              <ArrowRight size={13} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] -mr-1.5 flex items-center justify-center rounded-full text-[#141413] hover:bg-[#f0eee6] transition-colors cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — Matched to buildaba.com rounded card drawers */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-[#faf9f5] z-[90] lg:hidden flex flex-col border-t border-black/10 p-4 sm:p-5 space-y-3 overflow-y-auto">
          <div className="bg-white border border-black/10 rounded-xl divide-y divide-black/6 overflow-hidden">
            <Link
              href="/portal/demo"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3.5 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold text-[#141413]">3 Pre-Cleaned Vertical Engines</div>
                <div className="text-xs text-[#6b665e] mt-0.5">Healthcare Clinics, Industrial &amp; Fleet, Public Sector &amp; Permits</div>
              </div>
              <ArrowRight size={14} className="text-[#6b665e] shrink-0" />
            </Link>
            <Link
              href="/academy"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3.5 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold text-[#141413]">5 Open-Book Data Plays</div>
                <div className="text-xs text-[#6b665e] mt-0.5">How we resolve domains, strip 55+ CPA keywords &amp; verify &lt;2% bounce</div>
              </div>
              <ArrowRight size={14} className="text-[#6b665e] shrink-0" />
            </Link>
            <Link
              href="/credibility"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3.5 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold text-[#141413]">6-Table Schema &amp; SHA-256 Receipts</div>
                <div className="text-xs text-[#6b665e] mt-0.5">Atomic fn_provenance_update lock &amp; daily urgency decay</div>
              </div>
              <ArrowRight size={14} className="text-[#6b665e] shrink-0" />
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3.5 flex items-center justify-between gap-3 bg-[#f5f4ef]/70"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#141413]">7-Day Territory Pilot &amp; Pricing</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-black/10 text-[#141413] font-medium tabular-nums">
                    $1,950 (100% Rollover)
                  </span>
                </div>
                <div className="text-xs text-[#6b665e] mt-0.5">2,500 enriched accounts + 5,000 verified buyers in 7 days</div>
              </div>
              <ArrowRight size={14} className="text-[#6b665e] shrink-0" />
            </Link>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3.5 rounded-xl bg-white border border-black/15 text-xs font-semibold text-[#141413] shrink-0"
            >
              API Keys
            </Link>
            <Link
              href="/hire/apply"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3.5 rounded-xl bg-[#141413] text-[#faf9f5] text-xs font-semibold hover:bg-[#2c2b28] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Start 7-Day Pilot ($1,950)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
