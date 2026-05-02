import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
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
}: Props) {
  const trimmed = src?.trim() || "/tour-placeholder.svg";
  const useNative =
    /^https?:\/\//i.test(trimmed) || trimmed.startsWith("//") || trimmed.startsWith("data:");
  if (useNative) {
    /* next/image: хосты неизвестны заранее; оптимизация через API невозможна без remotePatterns. */
    // eslint-disable-next-line @next/next/no-img-element -- внешние URL из кабинета партнёра
    return <img src={trimmed} alt={alt} className={className} loading="lazy" decoding="async" />;
  }
  return (
    <Image src={trimmed} alt={alt} width={width} height={height} className={className} sizes={sizes} />
  );
}
