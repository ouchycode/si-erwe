"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

import { cn } from "@/lib/utils";

export function PersonAvatar({
  src,
  alt,
  className,
  iconClassName,
  sizes = "128px",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  iconClassName?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        className
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <User className={cn("opacity-70", iconClassName)} strokeWidth={1.5} />
      )}
    </div>
  );
}
