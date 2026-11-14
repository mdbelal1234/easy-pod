import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siFacebook, siInstagram, siTiktok, siYoutube } from "simple-icons";
import { BrandIcon } from "@/components/site/brand-icon";
import { ButtonLink } from "@/components/site/button-link";
import { TallyField } from "@/components/site/tally-field";
import { Wordmark } from "@/components/site/wordmark";
import { site, waLink } from "@/lib/site";

const footerLinks = [
  { href: "/#studio", label: "Studio" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#process", label: "How it works" },
  { href: "/#book", label: "Book a session" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const socialLinks = [
  { href: site.social.instagram, icon: siInstagram, label: "Instagram" },
  { href: site.social.youtube, icon: siYoutube, label: "YouTube" },
  { href: site.social.facebook, icon: siFacebook, label: "Facebook" },
  { href: site.social.tiktok, icon: siTiktok, label: "TikTok" },
];

export function Footer() {
  return (
    <>
      {/* The close: the whole field goes tally-red, like the light over the door. */}
      <TallyField aria-labelledby="close-title" className="text-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <h2
            id="close-title"
            className="max-w-[18ch] font-display-wide text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.98]"
          >
            Pick a time. We&apos;ll light the room.
          </h2>
          <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[46ch] text-pretty text-lg leading-relaxed">
              Sessions from ৳1,500 an hour, crew included. We confirm every
              request within 24 hours.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#book" variant="ink">
                Request a session
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink
                href={waLink("Hi! I'd like to book a session at EasyPod Studio.")}
                variant="line-ink"
              >
                WhatsApp us
              </ButtonLink>
            </div>
          </div>
        </div>
      </TallyField>

      <footer className="overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-16 sm:px-6 lg:px-10">
          <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div className="max-w-xs">
              <Link href="/" aria-label="EasyPod Studio home" className="inline-block">
                <Wordmark variant="full" className="w-56" />
              </Link>
              <p className="mt-8 text-sm leading-relaxed text-muted-ink">
                A video podcast studio in Vatara, Dhaka. Book an hour, bring your
                guests, leave with the footage.
              </p>
              <address className="mt-6 space-y-1 text-sm not-italic text-muted-ink">
                <a href={`mailto:${site.email}`} className="block hover:text-paper">
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="block hover:text-paper"
                >
                  {site.phone}
                </a>
              </address>
              <ul className="mt-6 flex gap-5">
                {socialLinks.map(({ href, icon, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-dim transition-colors hover:text-paper"
                    >
                      <BrandIcon icon={icon} className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Footer" className="md:col-span-3 md:justify-self-end">
              <ul className="grid grid-cols-2 gap-x-16 gap-y-2.5 sm:grid-cols-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/85 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-2 pr-16 text-xs text-dim sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} EasyPod Studio</p>
            <p>Salam Tower, Vatara, Dhaka</p>
          </div>
        </div>
      </footer>
    </>
  );
}
