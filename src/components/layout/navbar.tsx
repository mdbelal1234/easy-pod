"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/site/wordmark";
import { ButtonLink } from "@/components/site/button-link";
import { cn } from "@/lib/utils";

// Single-page site: every link scrolls to a section on the home page.
const navLinks = [
  { href: "/#studio", label: "Studio" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  // Solid bar once the top 24px of the page leaves the viewport.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Highlight the link for whichever section crosses the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(2)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          setCurrent((prev) =>
            isIntersecting ? target.id : prev === target.id ? null : prev
          );
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-6 w-px" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled || open
            ? "border-paper/10 bg-ink/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label="EasyPod Studio home" onClick={close} className="shrink-0">
            <Wordmark className="h-10 sm:h-11" />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = current === link.href.slice(2);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative py-2 text-sm transition-colors hover:text-paper",
                      "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:bg-tally after:transition-transform after:duration-300",
                      active ? "text-paper after:scale-x-100" : "text-muted-ink after:scale-x-0"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ButtonLink href="/#book" className="hidden h-10 px-5 text-sm md:inline-flex">
            Book a session
          </ButtonLink>

          <div className="flex items-center gap-1 md:hidden">
            {!open && (
              <ButtonLink href="/#book" className="h-9 px-3.5 text-sm">
                Book a session
              </ButtonLink>
            )}
            <button
              className="-mr-2 p-2.5 text-paper"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between bg-ink px-4 pb-8 pt-6 md:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block py-3 font-display-wide text-3xl text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/#book" className="w-full" onClick={close}>
                Book a session
              </ButtonLink>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
