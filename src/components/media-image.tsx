"use client";

import Image from "next/image";
import { useState } from "react";
import { useContent } from "@/components/demo-content";
import { InkStudy } from "@/components/heritage-sketch";

export default function MediaImage({
  id,
  sizes = "(max-width: 700px) 90vw, 45vw",
  eager = false,
  className = "",
}: {
  id: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const { media } = useContent();
  const item = media.find((image) => image.id === id);
  const [failed, setFailed] = useState("");
  if (!item || failed === item.src) {
    return (
      <div className="image-fallback">
        <InkStudy kind="tea" />
        <span>Another little moment, soon.</span>
      </div>
    );
  }
  return (
    <Image
      className={className}
      src={item.src}
      alt={item.alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      unoptimized={item.src.startsWith("data:")}
      style={{ objectPosition: item.focalPoint }}
      onError={() => setFailed(item.src)}
    />
  );
}
