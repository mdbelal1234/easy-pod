import Link from "next/link";
import { siFacebook, siInstagram, siTiktok, siYoutube } from "simple-icons";
import { BrandIcon } from "@/components/site/brand-icon";
import { site } from "@/lib/site";

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
    <footer className="overflow-hidden border-t border-paper/10">
      <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-muted-ink">
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
                    className="text-sm text-paper/85 transition-colors hover:text-tally"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 text-xs text-dim sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} EasyPod Studio</p>
          <p>Salam Tower, Vatara, Dhaka</p>
        </div>

        <p
          aria-hidden
          className="font-display-wide -mb-[0.2em] mt-6 select-none text-[clamp(4rem,19vw,17rem)] leading-none text-ink-3"
        >
          easypod
        </p>
      </div>
    </footer>
  );
}
