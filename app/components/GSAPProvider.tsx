"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAP(() => {
    // Global GSAP setup
  });

  return <>{children}</>;
}