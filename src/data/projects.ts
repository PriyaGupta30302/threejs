export interface Metric {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  text: string;
}

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
  // Case-study storytelling
  category: string;
  tagline: string;
  note: string; // handwritten margin note
  pitch: string;
  brief: string;
  built: Feature[];
  impact: string;
  metrics: Metric[];
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
    category: "E-commerce · EdTech",
    tagline: "A shop students actually enjoy using.",
    note: "my favourite bit: the WhatsApp share on the cart page",
    pitch: "Meiosis sells mind maps and flashcards to JEE & NEET students, mostly on their phones. I rebuilt the whole storefront so finding a product and paying for it takes just a few taps.",
    brief: "Meiosis Publications makes Mind Maps and Flashcards for JEE & NEET students. Most of them shop on their phones, usually between classes. I rebuilt the storefront from scratch so people could find what they need quickly and check out without any fuss.",
    built: [
      {
        title: "A storefront made for thumbs",
        text: "Product carousels and variant pickers, written in plain Liquid and vanilla JavaScript so the pages stay light."
      },
      {
        title: "A cart drawer that keeps the flow",
        text: "A custom cart drawer that keeps people moving toward checkout. It noticeably cut bounce rates and abandoned carts."
      },
      {
        title: "Reviews, plus a WhatsApp nudge",
        text: "I built the reviews system, which holds a 4.8/5 rating across 10,000+ reviews, and added a WhatsApp share button on the cart page. Students started recommending the shop to each other."
      }
    ],
    impact: "The site now scores 95+ on mobile Lighthouse, because I was strict about lazy-loading every asset I could.",
    metrics: [
      { value: "4.8/5", label: "Average customer rating" },
      { value: "10,000+", label: "Customer reviews" },
      { value: "95+", label: "Mobile Lighthouse score" }
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
    category: "Luxury · Fashion",
    tagline: "Luxury, but make it smooth.",
    note: "ask me about the staggered text reveals",
    pitch: "House of Aerawat is a premium brand, so the site had to feel like one. I built a richly animated storefront with Next.js and GSAP that still loads in under a second.",
    brief: "House of Aerawat is a premium luxury brand. The storefront needed to look and move like high fashion, with lots of imagery and animation, without feeling slow or disappearing from search results.",
    built: [
      {
        title: "Motion with a purpose",
        text: "GSAP scroll animations, staggered text reveals and smooth page transitions give the site its premium feel."
      },
      {
        title: "Server-rendered with Next.js",
        text: "SSR keeps the first paint quick and the pages easy for search engines to read. The nav bar reacts as you scroll."
      },
      {
        title: "Finding things fast",
        text: "Product discovery with smooth filtering and instant search."
      }
    ],
    impact: "Heavy images and video still load in under a second, and the typography scales cleanly at every screen size.",
    metrics: [
      { value: "<1s", label: "Load time on media-heavy pages" },
      { value: "SSR", label: "Search-friendly from the first byte" },
      { value: "GSAP", label: "Scroll-driven motion throughout" }
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
    category: "Real Estate · Luxury",
    tagline: "Browse luxury homes like you're already inside.",
    note: "the pricing slider is fun to play with",
    pitch: "Chalet Estate sells luxury properties to people who expect things to just work. I built the listing platform in React with virtual tours and smart filters, and improved lead-form conversions by 40%.",
    brief: "Chalet Estate's buyers are high-net-worth and expect polish and trust. The goal was a place where they could explore luxury properties with interactive maps and sharp galleries, and feel comfortable getting in touch.",
    built: [
      {
        title: "It feels like an app",
        text: "React and Framer Motion for smooth transitions, plus virtual tour modals so buyers can step inside before they visit."
      },
      {
        title: "Filters that make sense",
        text: "Property search with a flexible filtering system and dynamic pricing sliders."
      },
      {
        title: "Galleries that don't jump",
        text: "Optimised masonry galleries, so photos load without the page shifting around."
      }
    ],
    impact: "Cleaner forms and a pixel-perfect mobile layout turned more visitors on the go into real leads.",
    metrics: [
      { value: "40%", label: "Lift in lead-form conversions" },
      { value: "0", label: "Layout shift in image galleries" },
      { value: "Virtual", label: "Tour modals built in" }
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
    category: "Corporate · Security",
    tagline: "A security company's website that earns trust fast.",
    note: "deep blues, stark whites, nothing fancy on purpose",
    pitch: "Technical Chowkidar is a technology and security firm, so the site had to look trustworthy at first glance. I built it with Next.js and static generation, and pages load in under a second worldwide.",
    brief: "Technical Chowkidar is a technology and security firm. Its site had to show authority, break the services down clearly for enterprise clients, and feel as secure as the work they do.",
    built: [
      {
        title: "Clear, high-contrast design",
        text: "Deep blues and stark whites keep every service easy to read."
      },
      {
        title: "Fast everywhere",
        text: "Static site generation, optimised assets and edge caching bring page loads under a second around the world."
      },
      {
        title: "Forms that qualify leads",
        text: "Secure multi-step contact forms and lead funnels, plus a CMS structure the marketing team can update safely."
      }
    ],
    impact: "Pages load instantly, the brand looks credible to enterprise buyers, and the marketing team can update content on its own.",
    metrics: [
      { value: "<1s", label: "Page loads, globally" },
      { value: "SSG", label: "Pre-rendered for instant delivery" },
      { value: "Multi-step", label: "Secure lead-generation forms" }
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
    category: "Education · Accessibility",
    tagline: "A school website everyone can actually use.",
    note: "built for slow connections too",
    pitch: "Parents, students and teachers all use the Genesis School site, and they're not all comfortable with technology. I built it to be WCAG-compliant, light on bandwidth and simple to get around.",
    brief: "Parents, students and staff come to a school site with very different comfort levels. Genesis School needed admissions, event calendars and policies to be easy to find for everyone, on any device and any connection.",
    built: [
      {
        title: "Accessibility first",
        text: "Strict WCAG compliance, readable typography and simple navigation."
      },
      {
        title: "Works on slow connections",
        text: "Optimised for low bandwidth, so it stays usable on all kinds of devices."
      },
      {
        title: "Easy for staff to update",
        text: "Deployed on Netlify with automated CI/CD, so content changes go live quickly. It also has interactive calendars, portal entry points and galleries for student achievements."
      }
    ],
    impact: "A welcoming site where families find admissions, events and policies without needing any help.",
    metrics: [
      { value: "WCAG", label: "Strict accessibility compliance" },
      { value: "CI/CD", label: "Automated deploys on Netlify" },
      { value: "Low-bandwidth", label: "Optimised for every connection" }
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
    category: "Corporate · Data",
    tagline: "A corporate site that shows its work.",
    note: "the onboarding flow has more state than it looks",
    pitch: "The PMC wanted a site that builds confidence at first sight. I built it with Next.js, with interactive charts, a smooth onboarding flow and the SEO to get found.",
    brief: "The PMC needed a corporate presence that builds confidence quickly. It had to look professional, back its claims with data and make it obvious what the company offers.",
    built: [
      {
        title: "Charts you can explore",
        text: "Interactive data visualisations built with modern chart libraries."
      },
      {
        title: "Onboarding that guides",
        text: "Complex state management behind a streamlined client onboarding flow, with lead flows that lead from service discovery to contact."
      },
      {
        title: "Easy to find",
        text: "Semantic HTML and localised routing for strong SEO rankings."
      }
    ],
    impact: "A fast, credible, search-friendly site that turns interested visitors into conversations.",
    metrics: [
      { value: "SEO", label: "Strong rankings via semantic HTML" },
      { value: "Live", label: "Interactive data visualisations" },
      { value: "Next.js", label: "Architecture built to scale" }
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
