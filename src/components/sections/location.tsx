"use client";

import { motion } from "framer-motion";
import { MapPin, Car, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, waLink } from "@/lib/site";

const details = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["Gulshan Avenue", "Dhaka, Bangladesh"],
  },
  {
    icon: Car,
    title: "Parking",
    lines: ["Free on-site visitor parking", "Valet available on request"],
  },
  {
    icon: Clock,
    title: "Studio Hours",
    lines: ["Daily, 9:00 AM – 10:00 PM", "Flexible slots by appointment"],
  },
];

export function LocationSection() {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            Visit Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find the Studio in Dhaka
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Centrally located in Gulshan — easy to reach from anywhere in the
            city.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Map */}
          <motion.div
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src={site.mapEmbedSrc}
              title={`${site.name} location in Dhaka`}
              className="h-full min-h-[360px] w-full"
              style={{ border: 0, filter: "grayscale(0.3) invert(0.9) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          {/* Details */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {details.map(({ icon: Icon, title, lines }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-600/10">
                  <Icon className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-white/55">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-3 font-semibold text-white">Get in touch</h3>
              <div className="flex flex-col gap-2.5 text-sm">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-purple-400" />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-purple-400" />
                  {site.email}
                </a>
              </div>
              <Button
                asChild
                className="mt-4 w-full border-0 bg-purple-600 text-white hover:bg-purple-700"
              >
                <a
                  href={waLink(
                    "Hi! I'd like to visit the EasyPod studio in Dhaka."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
