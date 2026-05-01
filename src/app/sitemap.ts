import type { MetadataRoute } from "next";
import { blogPosts, resorts } from "@/lib/data";

const base = "https://abkhaziatrip.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tury-abkhazia",
    "/oteli-abkhazia",
    "/zayavka",
    "/blog",
    "/lichnyy-kabinet",
    "/oferta",
    "/privacy",
    "/refunds",
    "/tury-abkhazia/iz-moskva",
    "/tury-abkhazia/iz-spb",
    "/tury-abkhazia/iz-kazan",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const resortRoutes = resorts.map((resort) => ({
    url: `${base}/kurorty/${resort.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...resortRoutes, ...blogRoutes];
}
