import Link from "next/link";
import { Mic, Share2, MessageCircle, Play, Send } from "lucide-react";

const footerLinks = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/studio", label: "Our Studio" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services#podcast-recording", label: "Podcast Recording" },
    { href: "/services#video-podcast", label: "Video Podcast" },
    { href: "/services#editing", label: "Editing & Post" },
    { href: "/services#live-streaming", label: "Live Streaming" },
    { href: "/services#shorts", label: "Shorts & Reels" },
  ],
  Resources: [
    { href: "/pricing", label: "Pricing" },
    { href: "/booking", label: "Book a Session" },
    { href: "/contact", label: "Get a Quote" },
  ],
};

const socialLinks = [
  { href: "https://facebook.com/easypodstudio", Icon: Share2, label: "Facebook" },
  { href: "https://instagram.com/easypodstudio", Icon: MessageCircle, label: "Instagram" },
  { href: "https://youtube.com/@easypodstudio", Icon: Play, label: "YouTube" },
  { href: "https://twitter.com/easypodstudio", Icon: Send, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">EasyPod</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Bangladesh&apos;s premium video podcast studio. Record, produce, and
              grow studio-quality content in Gulshan, Dhaka.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} EasyPod Studio. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Gulshan, Dhaka, Bangladesh · hello@easypod.studio
          </p>
        </div>
      </div>
    </footer>
  );
}
