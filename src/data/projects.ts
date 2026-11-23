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
    tagline: "A storefront students actually enjoy buying from.",
    pitch: "Rebuilt from scratch for thousands of daily JEE & NEET aspirants, fast on any phone and rated 4.8/5 by its customers.",
    brief: "Meiosis Publications sells Mind Maps and Flashcards to JEE & NEET students, a mostly-mobile audience that browses between classes and wants to check out in a few taps. The brief: rebuild the storefront UI/UX from the ground up so discovering the right product feels effortless and buying it feels even easier.",
    built: [
      {
        title: "A truly mobile-first storefront",
        text: "Interactive product carousels and dynamic variant selectors, hand-built with Liquid and vanilla JavaScript so nothing heavy gets between a student and the product."
      },
      {
        title: "A cart that keeps the momentum",
        text: "A custom cart drawer that keeps shoppers in flow, which helped bring down bounce rates and abandoned carts."
      },
      {
        title: "Social proof that earns trust",
        text: "A frontend reviews system holding a 4.8/5 rating across 10,000+ reviews, plus a WhatsApp share on the cart page that turns happy students into organic referrals."
      }
    ],
    impact: "Easier discovery, a smoother checkout and a mobile experience that scores 95+ on Lighthouse, thanks to aggressive asset lazy-loading.",
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
    tagline: "Luxury should feel effortless, even in a browser.",
    pitch: "A buttery-smooth, scroll-choreographed storefront for a premium brand, built to feel as refined as the product itself.",
    brief: "House of Aerawat is a premium luxury brand, so its storefront had to look and move like high fashion: rich in imagery, generous with animation, and still fast enough that nobody ever waits. It also had to stay fully visible to search engines. Beauty and performance, with no trade-off.",
    built: [
      {
        title: "Scroll-choreographed motion",
        text: "Complex GSAP scroll-triggered animations, staggered text reveals and smooth page transitions that give the brand its premium feel."
      },
      {
        title: "Server-rendered for speed and search",
        text: "Built on Next.js with SSR, plus a scroll-aware navigation bar, so the site is quick on first paint and easy for search engines to read."
      },
      {
        title: "Discovery that keeps up",
        text: "A dynamic product discovery interface with seamless filtering and instant search, so shoppers find the piece they want without friction."
      }
    ],
    impact: "Image- and video-heavy pages load in under a second, and responsive typography stays crisp at every viewport size.",
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
    pitch: "An app-like property experience with virtual tours, smart filters and a 40% lift in lead-form conversions.",
    brief: "Chalet Estate's clients are high-net-worth buyers who expect trust, polish and zero friction. The goal was an interface that lets them explore luxury properties through interactive maps and high-resolution galleries, and feel confident enough to get in touch.",
    built: [
      {
        title: "An immersive, app-like feel",
        text: "React and Framer Motion power fluid transitions, plus virtual tour modals that let buyers step into a property before they ever visit."
      },
      {
        title: "Search that bends to the buyer",
        text: "A complex filtering mechanism and dynamic pricing sliders that make narrowing down a property portfolio feel natural."
      },
      {
        title: "Galleries without the jump",
        text: "Highly optimised masonry galleries that showcase real estate photography without a single layout shift."
      }
    ],
    impact: "Frictionless UX and pixel-perfect mobile layouts turned more on-the-go visitors into real leads.",
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
    tagline: "Trust, communicated in the first second.",
    pitch: "A high-contrast, statically generated site that loads instantly and speaks with authority to enterprise buyers.",
    brief: "Technical Chowkidar is a technology and security firm, and its website had to radiate trust and authority from the first glance. Enterprise clients needed clear service breakdowns, and the whole thing needed to feel as secure as the work the company does.",
    built: [
      {
        title: "Clarity by design",
        text: "A high-contrast, modern look built on deep blues and stark whites keeps every service easy to read and every message unmistakable."
      },
      {
        title: "Fast by default",
        text: "Next.js static site generation with asset optimisation and edge caching delivers sub-second page loads around the world."
      },
      {
        title: "Lead funnels that qualify",
        text: "Secure multi-step contact forms and intelligent lead funnels, backed by a scalable CMS structure so the marketing team can update content safely."
      }
    ],
    impact: "Instant page loads, a credible enterprise presence and a content workflow the marketing team can run on its own.",
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
    tagline: "A school website that everyone can use.",
    pitch: "Accessible by design: WCAG-compliant, light on bandwidth, and effortless for parents, students and staff alike.",
    brief: "Parents, students and staff come to a school website with very different comfort levels around technology. Genesis School needed admissions portals, event calendars and policies to be one clear click away for all of them, on any device and any connection.",
    built: [
      {
        title: "Accessibility first",
        text: "Strict WCAG compliance, a clear and readable typography system, and simple, interactive navigation that works for every kind of visitor."
      },
      {
        title: "Light on any connection",
        text: "Optimised for low-bandwidth connections so the site stays usable across varied devices and networks."
      },
      {
        title: "Easy for staff to keep fresh",
        text: "Netlify with automated CI/CD means content updates go live fast, alongside interactive calendars, portal entry points and photo galleries celebrating student achievements."
      }
    ],
    impact: "A welcoming, inclusive site where families find admissions, events and policies without needing help.",
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
    tagline: "Professional confidence, backed by data.",
    pitch: "A scalable Next.js site with interactive charts and onboarding flows that guide visitors from curiosity to contact.",
    brief: "The PMC needed a corporate presence that builds client confidence at first sight: sleek, professional, data-driven and crystal clear about what the company offers. Every page had to nudge a visitor one step closer to getting in touch.",
    built: [
      {
        title: "Data you can explore",
        text: "Highly interactive data visualisations built with modern chart libraries, so claims are backed by numbers visitors can play with."
      },
      {
        title: "Flows that guide",
        text: "Complex state management behind streamlined client onboarding, and lead-generation flows that lead visitors from service discovery to the final contact step."
      },
      {
        title: "Found by the right people",
        text: "Semantic HTML and localised routing deliver strong SEO rankings on top of a frontend architecture designed to scale."
      }
    ],
    impact: "A credible, fast and search-friendly portfolio that turns interested visitors into conversations.",
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
