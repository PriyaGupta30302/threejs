"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Dynamically import desktop and mobile components to avoid loading unnecessary JS
const ServicesSectionDesktop = dynamic(() => import("./ServicesSectionDesktop"), { ssr: false });
const ServicesSectionMobile = dynamic(() => import("./ServicesSectionMobile"), { ssr: false });

export default function ServicesSection() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading placeholder
  }

  return isMobile ? <ServicesSectionMobile /> : <ServicesSectionDesktop />;
}
