"use client";

import HorseHead from "@/assets/icons/horse-head.svg";

type Props = { className?: string; title?: string };

export default function HorseHeadIcon({ className, title }: Props) {
  return <HorseHead className={className} aria-label={title} role="img" />;
}