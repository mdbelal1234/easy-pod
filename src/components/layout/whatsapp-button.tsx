import { siWhatsapp } from "simple-icons";
import { BrandIcon } from "@/components/site/brand-icon";
import { waLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Hi! I'm interested in booking a podcast session at EasyPod Studio.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-tight border border-paper/15 bg-ink-2 text-[#25D366] shadow-[0_12px_32px_-12px_rgb(0_0_0/0.6)] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-paper/40 active:translate-y-px"
    >
      <BrandIcon icon={siWhatsapp} className="size-6" />
    </a>
  );
}
