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
    description: "Rebuilt the storefront UI/UX from scratch for an educational platform making Mind Maps & Flashcards for JEE & NEET.",
    heroImage: "/meiosis-desktop.webp",
    gallery: [
      "/meiosis-desktop.webp",
      "/meiosis-mobile.webp",
      "/sphereSection/imgi_4_sebastian_coelho-yfood.jpg"
    ],
    bullets: [
      "Rebuilt the storefront UI/UX from scratch for an educational platform specializing in Mind Maps & Flashcards for JEE & NEET, serving thousands of daily visitors. The primary goal was to enhance product discovery and streamline the checkout flow for a predominantly mobile user base.",
      "Engineered a custom Shopify headless-like experience using advanced Liquid and Vanilla JavaScript. Focused heavily on mobile-first design, creating interactive product carousels, dynamic variant selectors, and a custom cart drawer that significantly reduced bounce rates and abandoned carts.",
      "Developed a highly rated frontend reviews system maintaining a 4.8/5 score across 10,000+ customer reviews.",
      "Implemented a custom WhatsApp share integration on the cart page, boosting organic student referrals.",
      "Achieved a 95+ Lighthouse performance score on mobile through aggressive asset lazy-loading."
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
      "/bridge/imgi_17_bridge_up-Offground.jpg"
    ],
    bullets: [
      "House of Aerawat is a premium luxury brand requiring an ultra-sleek, highly animated storefront. The core challenge was to deliver a visually stunning, buttery-smooth experience that reflects high-end fashion, without compromising on performance or search engine visibility.",
      "Leveraged Next.js for robust Server-Side Rendering (SSR) and GSAP for complex, scroll-triggered animations. Implemented a scroll-aware navigation bar, smooth page transitions, and sophisticated staggered text reveals that elevate the brand's premium identity.",
      "Built a custom, dynamic product discovery interface with seamless filtering and instant search.",
      "Optimized heavy image and video assets for sub-second load times despite the media-heavy design.",
      "Integrated responsive typography that scales beautifully and remains crisp across all viewport breakpoints."
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
      "/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg"
    ],
    bullets: [
      "Developed a modern property listing platform for Chalet Estate. The primary objective was to create an intuitive, trustworthy interface that allows high-net-worth users to seamlessly browse luxury properties with interactive maps and high-resolution galleries.",
      "Utilized React and Framer Motion to build an immersive, app-like browsing experience. Designed a complex filtering mechanism for property searches and integrated highly optimized masonry image galleries to showcase real estate imagery without causing layout shifts.",
      "Engineered robust interactive elements including virtual tour modals and dynamic pricing sliders.",
      "Ensured pixel-perfect mobile responsiveness to attract and convert on-the-go leads effectively.",
      "Improved lead-generation form conversions by 40% through frictionless UX optimizations."
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
      "/sphereSection/imgi_4_sebastian_coelho-yfood.jpg"
    ],
    bullets: [
      "Designed and developed a robust corporate website for Technical Chowkidar, a technology and security firm. The site needed to communicate absolute trust, authority, and provide clear service breakdowns for enterprise-level clients.",
      "Chose Next.js and Tailwind CSS to rapidly build a highly-secure, scalable architecture. Focused on a high-contrast, modern aesthetic with deep blues and stark whites to ensure readability. Implemented static site generation (SSG) for instantaneous page loads.",
      "Integrated secure, multi-step contact forms and intelligent lead generation funnels.",
      "Achieved sub-second page load times globally through meticulous asset optimization and Edge caching.",
      "Built a scalable CMS structure for easy and secure content updates by the marketing team."
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
      "/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg"
    ],
    bullets: [
      "Created a welcoming, accessible, and informative website for Genesis School. The platform required an intuitive architecture for parents and students of all technical backgrounds to easily access admissions portals, event calendars, and school policies.",
      "Built a highly accessible frontend ensuring strict WCAG compliance. Designed clear, readable typography systems and highly interactive but simple navigation menus. Deployed on Netlify with automated CI/CD for rapid content updates by school staff.",
      "Developed responsive photo galleries and dedicated showcase sections for student achievements.",
      "Optimized for low-bandwidth connections to ensure accessibility for all users across varied devices.",
      "Integrated interactive calendars and secure, easy-to-use portal entry points."
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
      "/bridge/imgi_17_bridge_up-Offground.jpg"
    ],
    bullets: [
      "Developed a professional corporate portfolio for The PMC with optimized performance and clear service offerings. The goal was to instill client confidence through a sleek, professional, and highly data-driven design language.",
      "Structured the frontend architecture for high scalability using Next.js. Built interactive data visualizations and seamless lead generation flows that guide potential clients effortlessly from service discovery to the final contact phase.",
      "Designed highly interactive data visualizations utilizing modern chart libraries.",
      "Implemented complex state management for streamlined client onboarding flows.",
      "Achieved exceptional SEO rankings through semantic HTML and localized routing."
    ]
  }
];
