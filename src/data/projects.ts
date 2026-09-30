export interface Project {
  id: number;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  bullets: string[];
  description?: string;
  client?: string;
  role?: string;
  heroImage?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "meiosis-publication",
    title: "Meiosis Publication",
    date: "2026 - Present",
    tags: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    client: "Meiosis Publication",
    role: "Design / Development",
    description: "Rebuilt the storefront UI/UX from scratch for an educational platform serving 2,000+ daily visitors.",
    heroImage: "/hero/hero-img.png",
    gallery: [
      "/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg",
      "/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg",
      "/sphereSection/imgi_4_sebastian_coelho-yfood.jpg",
      "/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg"
    ],
    bullets: [
      "Rebuilt the storefront UI/UX from scratch for an educational platform serving 2,000+ daily visitors.",
      "Built reusable, filterable product sections and a fully mobile-first, responsive interface.",
      "Developed frontend for a reviews system (4.8/5 across 10,000+ reviews), lead popups, carousels, and a cart drawer.",
      "Built a cart-page WhatsApp share button."
    ]
  },
  {
    id: 2,
    slug: "rabbit-autocare",
    title: "Rabbit Autocare",
    date: "2025 - Present",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "GSAP"],
    client: "Rabbit Autocare",
    role: "Design / Development",
    description: "Built the complete frontend for a premium car-care store, delivering a smooth, highly animated, Gen Z–oriented storefront.",
    heroImage: "/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg",
    gallery: [
      "/knowledge/imgi_9_honorable_mention_awwwards-OffGROUND.png",
      "/knowledge/imgi_10_german_web_awards-OffGROUND.png",
      "/bridge/imgi_17_bridge_up-Offground.jpg",
      "/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg"
    ],
    bullets: [
      "Built the complete frontend for a premium car-care store, delivering a smooth, highly animated, Gen Z–oriented storefront.",
      "Engineered scroll-triggered animations and a scroll-aware navigation bar.",
      "Optimized images and asset loading, raising the site's Lighthouse performance score from 43 to 73.",
      "Fetched and rendered product, coupon, and discount data to keep the UI in sync."
    ]
  }
];

