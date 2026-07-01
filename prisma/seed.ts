import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "postgresql://easypod:easypod123@localhost:5432/easypod",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("Admin@123", 12);
  await prisma.user.upsert({
    where: { email: "admin@easypod.studio" },
    update: {},
    create: {
      name: "Easy Pod Admin",
      email: "admin@easypod.studio",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  // Packages
  const packages = [
    {
      name: "Starter",
      slug: "starter",
      description: "Perfect for first-time podcasters and solo creators.",
      price: 999,
      duration: "1 Hours",
      features: [
        "1-Hour Studio Session",
        "2 Microphone Setup",
        "Professional Lighting Setup",
        "Basic Audio Editing",
        "3 Camera Setup",
        "RAW File Delivery",
        "WhatsApp Support",
      ],
      isPopular: false,
      sortOrder: 1,
    },
    {
      name: "Growth",
      slug: "growth",
      description:
        "Most popular for growing podcast brands and content creators.",
      price: 2999,
      duration: "3 Hours",
      features: [
        "3-Hour Studio Session",
        "2 Microphone Setup",
        "Professional Lighting Setup",
        "Basic Audio & Video Editing",
        "3 Camera Setup",
        "Thumbnail Design",
        "3 Short Clips / Reels",
        "Same-Day Delivery",
        "Priority Support",
      ],
      isPopular: true,
      sortOrder: 2,
    },
    {
      name: "Premium",
      slug: "premium",
      description:
        "Full-service production for brands and professional creators.",
      price: 7999,
      duration: "5 Hours",
      features: [
        "Full-Day Studio Access",
        "2 Microphones",
        "Multi-Camera Production",
        "Professional Lighting Setup",
        "Live Streaming Ready",
        "Full Editing Suite",
        "10+ Short Clips",
        "Thumbnail & Artwork",
        "Dedicated Producer",
        "1-Year Content Archive",
      ],
      isPopular: false,
      sortOrder: 3,
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg,
    });
  }

  // Services
  const services = [
    {
      title: "Podcast Recording",
      slug: "podcast-recording",
      description:
        "Record crystal-clear audio in our acoustically treated studio with professional-grade microphones and interfaces. Whether solo or with guests, we ensure studio-quality sound every time.",
      icon: "Mic",
      features: [
        "Up to 6 microphone inputs",
        "Acoustic treatment",
        "Real-time monitoring",
        "Lossless audio capture",
        "Noise-free environment",
      ],
      sortOrder: 1,
    },
    {
      title: "Video Podcast Production",
      slug: "video-podcast-production",
      description:
        "Look as professional as you sound. A multi-camera Sony & DJI setup with Godox cinematic lighting creates compelling visual content that keeps viewers watching.",
      icon: "Video",
      features: [
        "Sony Alpha 7 IV, ZV-1 & DJI Osmo Pocket 3 cameras",
        "4K multi-camera recording",
        "Godox cinematic lighting",
        "Desview T12S teleprompter",
        "B-roll recording",
      ],
      sortOrder: 2,
    },
    {
      title: "Editing & Post Production",
      slug: "editing-post-production",
      description:
        "From raw footage to polished content. Two dedicated professional editors handle everything — multi-camera sync, audio enhancement, color correction, motion graphics, and platform-optimized exports.",
      icon: "Scissors",
      features: [
        "Two dedicated professional video editors",
        "Multi-camera synchronization",
        "Audio enhancement & noise reduction",
        "Color correction & motion graphics",
        "Captions, subtitles & thumbnail design",
        "Multi-platform exports",
      ],
      sortOrder: 3,
    },
    {
      title: "Live Streaming",
      slug: "live-streaming",
      description:
        "Stream to YouTube, Facebook, and multiple platforms simultaneously with professional production values. Engage your audience in real-time.",
      icon: "Radio",
      features: [
        "Multi-platform streaming",
        "Stable fiber connection",
        "Live graphic overlays",
        "Chat moderation support",
        "Stream recording included",
      ],
      sortOrder: 4,
    },
    {
      title: "Shorts & Reels Creation",
      slug: "shorts-reels-creation",
      description:
        "Turn long-form content into viral short-form clips. We identify the best moments and edit them for maximum engagement on TikTok, Instagram, and YouTube Shorts.",
      icon: "Zap",
      features: [
        "AI-powered clip selection",
        "Vertical & square formats",
        "Dynamic captions",
        "Platform optimization",
        "Rapid 24hr turnaround",
      ],
      sortOrder: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  // Testimonials
  const testimonials = [
    {
      name: "Arif Rahman",
      company: "TechTalk BD",
      role: "Podcast Host",
      content:
        "Easy Pod completely transformed my podcast. The studio quality is unmatched and the team is incredibly professional. My downloads tripled after just one session.",
      rating: 5,
      sortOrder: 1,
    },
    {
      name: "Nadia Islam",
      company: "StartupDhaka",
      role: "Founder & CEO",
      content:
        "We've been recording our company podcast at Easy Pod for 6 months. The equipment, the team, and the editing quality are all top-tier. Highly recommended for any business.",
      rating: 5,
      sortOrder: 2,
    },
    {
      name: "Tariq Hossain",
      company: "The Coach Room",
      role: "Executive Coach",
      content:
        "As a coach, I need to look and sound credible. Easy Pod delivers exactly that. Professional setup, fast delivery, and the reels they create get massive engagement.",
      rating: 5,
      sortOrder: 3,
    },
    {
      name: "Sadia Khatun",
      company: "EduBD",
      role: "Educator & YouTuber",
      content:
        "I was worried about the technical side but the Easy Pod team handled everything. I just showed up and focused on my content. Best decision for my YouTube channel.",
      rating: 5,
      sortOrder: 4,
    },
    {
      name: "Minhaj Chowdhury",
      company: "Digital Agency BD",
      role: "Creative Director",
      content:
        "We produce content for multiple clients at Easy Pod. The studio handles everything from recording to post-production. It's our secret weapon for client delivery.",
      rating: 5,
      sortOrder: 5,
    },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    await prisma.testimonial.upsert({
      where: { id: `seed-testimonial-${i}` },
      update: {},
      create: { ...t, id: `seed-testimonial-${i}` },
    });
  }

  // FAQs
  const faqs = [
    {
      question: "How do I book a session at Easy Pod?",
      answer:
        "Simply click the 'Book a Session' button on our website, fill in your details, choose your package and preferred date/time. We'll confirm your booking within 24 hours via email and WhatsApp.",
      sortOrder: 1,
    },
    {
      question: "What equipment do you have available?",
      answer:
        "We have Sony Alpha 7 IV, Sony ZV-1 and DJI Osmo Pocket 3 cameras with premium Sony & Tamron lenses, DJI Mic 2 and Rode PodMic microphones through a RodeCaster Duo, Godox cinematic lighting, a Desview T12S teleprompter, acoustic treatment panels, and a high-speed fiber internet connection for live streaming.",
      sortOrder: 2,
    },
    {
      question: "Do you provide editing services?",
      answer:
        "Yes! All our Growth and Premium packages include full audio and video editing. We handle noise reduction, color grading, captions, intros/outros, and platform-optimized exports.",
      sortOrder: 3,
    },
    {
      question: "How many people can record at once?",
      answer:
        "Our studio comfortably accommodates up to 6 guests for podcast recording. For larger corporate events or panel discussions, contact us for custom arrangements.",
      sortOrder: 4,
    },
    {
      question: "How fast do you deliver the edited content?",
      answer:
        "Typical turnaround is 2-3 business days for full editing. Same-day delivery is available for Growth and Premium packages at no extra cost.",
      sortOrder: 5,
    },
    {
      question: "Can I bring my own equipment?",
      answer:
        "Absolutely! If you prefer using your own microphones or cameras, you're welcome to bring them. Our engineers will integrate them seamlessly with our studio setup.",
      sortOrder: 6,
    },
    {
      question: "Is parking available near the studio?",
      answer:
        "Yes, there is convenient parking available near our studio. We'll share the exact location and parking details in your booking confirmation.",
      sortOrder: 7,
    },
    {
      question: "Do you offer packages for corporate teams?",
      answer:
        "Yes! We have dedicated corporate packages for internal communications, training videos, thought-leadership content, and company podcasts. Contact us for custom corporate pricing.",
      sortOrder: 8,
    },
  ];

  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];
    await prisma.fAQ.upsert({
      where: { id: `seed-faq-${i}` },
      update: {},
      create: { ...faq, id: `seed-faq-${i}` },
    });
  }

  // Site settings
  const settings = [
    { key: "studio_name", value: "Easy Pod", group: "general" },
    { key: "studio_tagline", value: "Professional Podcast Studio in Bangladesh", group: "general" },
    { key: "studio_phone", value: "+880 1XXX-XXXXXX", group: "contact" },
    { key: "studio_email", value: "hello@easypod.studio", group: "contact" },
    { key: "studio_address", value: "Dhaka, Bangladesh", group: "contact" },
    { key: "whatsapp_number", value: "8801890698946", group: "contact" },
    { key: "facebook_url", value: "https://facebook.com/easypodstudio", group: "social" },
    { key: "instagram_url", value: "https://instagram.com/easypodstudio", group: "social" },
    { key: "youtube_url", value: "https://youtube.com/@easypodstudio", group: "social" },
    { key: "tiktok_url", value: "https://tiktok.com/@easypodstudio", group: "social" },
    { key: "meta_title", value: "Easy Pod — Professional Podcast Studio in Bangladesh", group: "seo" },
    {
      key: "meta_description",
      value:
        "Record, livestream, and produce studio-quality podcasts at Easy Pod. Professional audio, multi-camera video, and full editing support in Dhaka, Bangladesh.",
      group: "seo",
    },
    { key: "hero_client_count", value: "200+", group: "homepage" },
    { key: "hero_rating", value: "4.9", group: "homepage" },
    { key: "hero_episodes_count", value: "1000+", group: "homepage" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
