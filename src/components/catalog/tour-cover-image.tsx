import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  /** LCP на странице тура — только для первого экрана. */
  priority?: boolean;
};

/**
 * next/image требует remotePatterns для каждого хоста; URL из кабинета партнёра произвольные —
 * для http(s), data: и protocol-relative используем нативный img.
 */
export function TourCoverImage({
  src,
  alt,
  className = "",
  width = 640,
  height = 480,
  sizes,
  priority = false,
}: Props) {
  const trimmed = src?.trim() || "/tour-placeholder.svg";
  const useNative =
    /^https?:\/\//i.test(trimmed) || trimmed.startsWith("//") || trimmed.startsWith("data:");
  if (useNative) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- произвольные внешние URL (нет remotePatterns)
      <img
        src={trimmed}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }
  return (
    <Image
      src={trimmed}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
