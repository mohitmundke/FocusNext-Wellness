"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useHealth } from "@/lib/health-context";
import {
  Menu,
  X,
  Activity,
  Video,
  LogOut,
  User,
  ShieldCheck,
  Phone,
  Search,
  ChevronRight,
} from "lucide-react";
import { CommandMenu } from "@/components/common/CommandMenu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenAuth?: () => void;
  onOpenCommand?: () => void;
}

export function Navbar({ onOpenAuth, onOpenCommand }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const { isAuthenticated, patient, logout, triggerEmergencyProtocol } = useHealth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (onOpenCommand) {
          onOpenCommand();
        } else {
          setCommandMenuOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommand]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Specialists & OPD", href: "/doctors" },
    { label: "Desk Health & Services", href: "/services" },
    { label: "Care Plans", href: "/pricing" },
    { label: "Medical Leave Certificate", href: "/sick-leave" },
    { label: "Contact & SOS", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Clinical Announcement Bar */}
      <div className="bg-[#164738] text-white text-[11px] py-1.5 px-4 hidden sm:block border-b border-[#12382C]">
        <div className="container flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Healthcare Built for India&apos;s Remote Workers, Software Engineers & Interns</span>
            <span className="text-white/40">|</span>
            <span className="text-emerald-200">10-Min Virtual OPD & Evening Consults (till 11:30 PM)</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="hidden md:inline text-white/80">⚡ Doorstep Vitamin D3/B12 Labs & 45-Min Medicines</span>
            <span className="text-white/40 hidden md:inline">|</span>
            <button
              type="button"
              onClick={triggerEmergencyProtocol}
              className="text-red-200 hover:text-white font-bold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-red-300" />
              <span>National Helpline: 112 / 108 SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-surface/95 backdrop-blur-md border-border py-2.5 shadow-card"
            : "bg-surface/90 backdrop-blur-sm border-border/70 py-3.5 shadow-subtle"
        )}
      >
        <div className="container flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness rounded-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-wellness flex items-center justify-center text-white shadow-subtle transition-transform group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                    FocusNext
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-wellness tracking-wider uppercase">
                    Swasthya India
                  </span>
                </div>
                <span className="text-[9px] text-foreground-muted font-medium tracking-wide">
                  Virtual OPD & Chronic Care RPM
                </span>
              </div>
            </Link>

            {/* Micro Badge for ABDM */}
            <div className="hidden 2xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-wellness-light border border-[#CBD7CE] text-[10px] font-bold text-wellness-dark">
              <ShieldCheck className="w-3 h-3 text-wellness" />
              <span>ABDM Compliant</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-background-subtle/80 p-1 rounded-full border border-border/80" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-full transition-all",
                    isActive
                      ? "bg-surface text-wellness-dark font-bold shadow-subtle border border-[#CBD7CE]"
                      : "text-foreground-secondary hover:text-foreground hover:bg-surface/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions & State */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                if (onOpenCommand) onOpenCommand();
                else setCommandMenuOpen(true);
              }}
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border bg-background-subtle text-xs text-foreground-secondary hover:text-foreground hover:bg-surface transition-all shadow-subtle"
              title="Quick Search & Actions (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-wellness" />
              <span className="text-[11px] font-medium hidden xl:inline">Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono font-bold text-foreground-muted">
                ⌘K
              </kbd>
            </button>

            {/* Live Doctor Waiting Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AIIMS Doctors Online</span>
              <span className="font-mono text-[10px] text-emerald-600 bg-white px-1.5 py-0.5 rounded-md border border-emerald-100 font-bold">~8m wait</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/app">
                  <Button variant="sage" size="sm" className="gap-1.5 shadow-subtle text-xs font-semibold h-9 px-3.5 rounded-xl">
                    <Activity className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Patient Portal</span>
                    <span className="font-mono font-bold text-[11px] bg-white/20 px-1.5 py-0.5 rounded-md">
                      {patient?.name?.split(" ")[0]}
                    </span>
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 text-foreground-secondary hover:text-foreground rounded-xl border border-border hover:bg-background-subtle transition-colors h-9 w-9 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness"
                  title="Sign Out"
                  aria-label="Sign Out of Patient Portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="text-xs font-semibold text-foreground-secondary hover:text-foreground px-3 py-2 transition-colors rounded-xl flex items-center gap-1.5 hover:bg-background-subtle border border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness"
                >
                  <User className="w-3.5 h-3.5 text-wellness" />
                  <span>ABHA Sign In</span>
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenAuth}
                  className="rounded-xl shadow-subtle text-xs gap-1.5 font-bold h-9 px-4 bg-wellness hover:bg-wellness-hover text-white"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Instant OPD (₹199)</span>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-border bg-surface/98 backdrop-blur-xl px-5 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-dropdown max-h-[85vh] overflow-y-auto">
          {/* Quick Doctor Live Strip Mobile */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-wellness-light border border-[#CBD7CE] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-foreground">AIIMS & CMC OPD Active</span>
            </div>
            <span className="text-[11px] font-mono text-wellness-dark font-bold">~8 min wait</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-semibold py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors",
                    isActive
                      ? "bg-wellness-light text-wellness-dark font-bold border border-wellness/30"
                      : "text-foreground hover:bg-background-subtle"
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-foreground-muted" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-border flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="sage" className="w-full justify-center text-xs font-bold h-10">
                    <Activity className="w-4 h-4 mr-2" />
                    <span>Open Patient Portal ({patient?.name})</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-center text-xs h-9"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="w-full justify-center text-xs font-bold h-10 bg-wellness hover:bg-wellness-hover text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                >
                  <Video className="w-4 h-4 mr-1.5" />
                  <span>Consult Doctor in Virtual OPD (₹499)</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center text-xs font-semibold h-10 border-border"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                >
                  <User className="w-4 h-4 mr-1.5 text-wellness" />
                  <span>ABHA Patient Sign In / Mobile OTP</span>
                </Button>
              </>
            )}

            {/* Mobile Emergency SOS Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                triggerEmergencyProtocol();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Emergency SOS: Call 112 / 108</span>
            </button>
          </div>
        </div>
      )}

      {/* Command Palette Modal (rendered if not handled by parent layout) */}
      {!onOpenCommand && (
        <CommandMenu isOpen={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
      )}
    </header>
  );
}
