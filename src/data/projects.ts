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
    slug: "meiosis",
    title: "Meiosis Publications",
    date: "2023 - Present",
    tags: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    client: "Meiosis Publications",
    role: "Frontend Developer",
    description: "Rebuilt the storefront UI/UX from scratch for an educational platform making Mind Maps & Flashcards for JEE & NEET, serving thousands of daily visitors.",
    heroImage: "/meiosis-desktop.webp",
    gallery: [
      "/meiosis-desktop.webp",
      "/meiosis-mobile.webp",
      "/sphereSection/imgi_4_sebastian_coelho-yfood.jpg",
      "/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg"
    ],
    bullets: [
      "Rebuilt the storefront UI/UX from scratch for an educational platform serving 2,000+ daily visitors.",
      "Built reusable, filterable product sections and a fully mobile-first, responsive interface.",
      "Developed frontend for a reviews system (4.8/5 across 10,000+ reviews), lead popups, carousels, and a cart drawer.",
      "Implemented a custom cart-page WhatsApp share button."
    ]
  },
  {
    id: 2,
    slug: "houseofaerawat",
    title: "House of Aerawat",
    date: "2023",
    tags: ["React", "Next.js", "Tailwind CSS", "GSAP"],
    client: "House of Aerawat",
    role: "Web Developer & UI Designer",
    description: "Built the complete frontend for a premium brand, delivering a smooth, highly animated, and luxury-oriented storefront.",
    heroImage: "/houseofaerawat-desktop.webp",
    gallery: [
      "/houseofaerawat-desktop.webp",
      "/houseofaerawat-mobile.webp",
      "/bridge/imgi_17_bridge_up-Offground.jpg",
      "/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg"
    ],
    bullets: [
      "Built the complete frontend for a luxury brand, emphasizing a clean and premium visual language.",
      "Engineered scroll-triggered animations and a dynamic, scroll-aware navigation bar using GSAP.",
      "Optimized images and asset loading, achieving excellent Lighthouse performance scores.",
      "Integrated seamless product discovery and responsive typography for high-end aesthetics."
    ]
  },
  {
    id: 3,
    slug: "chaletestate",
    title: "Chalet Estate",
    date: "2023",
    tags: ["React", "JavaScript", "CSS3", "Framer Motion"],
    client: "Chalet Estate",
    role: "Frontend Developer",
    description: "Developed a modern property listing platform with interactive elements and high-quality image galleries.",
    heroImage: "/chaletestate-desktop.webp",
    gallery: [
      "/chaletestate-desktop.webp",
      "/chaletestate-mobile.webp",
      "/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg",
      "/knowledge/imgi_9_honorable_mention_awwwards-OffGROUND.png"
    ],
    bullets: [
      "Developed a modern property and real estate listing platform with robust interactive elements.",
      "Built immersive property image galleries and intuitive filtering mechanisms.",
      "Optimized for fast loading, SEO, and complete mobile responsiveness to attract more leads.",
      "Designed an elegant, trustworthy UI that reflects the premium nature of the real estate offerings."
    ]
  },
  {
    id: 4,
    slug: "technicalchowkidar",
    title: "Technical Chowkidar",
    date: "2023",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    client: "Technical Chowkidar",
    role: "Web Developer",
    description: "Designed and developed a robust corporate website for a technology and security firm.",
    heroImage: "/technicalchowkidar-desktop.webp",
    gallery: [
      "/technicalchowkidar-desktop.webp",
      "/technicalchowkidar-mobile.webp",
      "/sphereSection/imgi_4_sebastian_coelho-yfood.jpg",
      "/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg"
    ],
    bullets: [
      "Designed and developed a robust, highly-secure corporate website for a tech-focused firm.",
      "Integrated clear service breakdowns, secure contact forms, and lead generation funnels.",
      "Implemented a clean, modern aesthetic with high contrast for readability and trust.",
      "Achieved sub-second page load times through static site generation and asset optimization."
    ]
  },
  {
    id: 5,
    slug: "genesis-school",
    title: "Genesis School",
    date: "2022",
    tags: ["React", "HTML5", "CSS3", "Netlify"],
    client: "Genesis School",
    role: "Frontend Designer",
    description: "Created a welcoming, accessible, and informative website for an educational institution.",
    heroImage: "/genesis-school-desktop.webp",
    gallery: [
      "/genesis-school-desktop.webp",
      "/genesis-school-mobile.webp",
      "/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg",
      "/knowledge/imgi_10_german_web_awards-OffGROUND.png"
    ],
    bullets: [
      "Created a welcoming, accessible website tailored for parents and students of Genesis School.",
      "Built responsive photo galleries, clear admissions portals, and event showcases.",
      "Ensured maximum accessibility (WCAG compliance) and usability across all device types.",
      "Deployed on Netlify with automated CI/CD for rapid content updates by school staff."
    ]
  },
  {
    id: 6,
    slug: "thepmc",
    title: "The PMC",
    date: "2022",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    client: "The PMC",
    role: "Fullstack Developer",
    description: "Developed a professional corporate portfolio with optimized performance and clear service offerings.",
    heroImage: "/thepmc-desktop.webp",
    gallery: [
      "/thepmc-desktop.webp",
      "/thepmc-mobile.webp",
      "/bridge/imgi_17_bridge_up-Offground.jpg",
      "/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg"
    ],
    bullets: [
      "Developed a corporate portfolio with optimized performance and clear service offerings.",
      "Built interactive data visualizations and seamless lead generation flows.",
      "Focused on a professional, sleek design language to instill client confidence.",
      "Structured the frontend architecture for high scalability and easy content management."
    ]
  }
];
