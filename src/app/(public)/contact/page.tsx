import { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Easy Pod Studio.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@easypod.studio",
    href: "mailto:hello@easypod.studio",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "#map",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/8801XXXXXXXXX",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-black pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-white/50 text-lg">
            Have questions? Ready to book? Reach out and we&apos;ll respond
            within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get in Touch
                </h2>
                <p className="text-gray-500">
                  Fill out the form and we&apos;ll get back to you as soon as
                  possible.
                </p>
              </div>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                      {label}
                    </div>
                    <div className="text-gray-900 font-medium group-hover:text-purple-600 transition-colors">
                      {value}
                    </div>
                  </div>
                </a>
              ))}

              {/* Map placeholder */}
              <div
                id="map"
                className="rounded-2xl overflow-hidden border border-gray-200 h-48 bg-gray-100 flex items-center justify-center mt-6"
              >
                <div className="text-center text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Dhaka, Bangladesh</p>
                  <p className="text-xs">(Map coming soon)</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
