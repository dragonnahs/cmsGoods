'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function ClientImage({
  src,
  alt,
  width,
  height,
  className,
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      className={className}
      height={height}
      onError={() => {
        setImgSrc('/customers/globe.svg');
      }}
    />
  );
}
