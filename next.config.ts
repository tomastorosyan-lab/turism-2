import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "extraguide.ru", pathname: "/**" },
      { protocol: "https", hostname: "avatars.mds.yandex.net", pathname: "/**" },
      { protocol: "https", hostname: "intourist.ru", pathname: "/**" },
      { protocol: "https", hostname: "moya-planeta.ru", pathname: "/**" },
    ],
  },
};

export default nextConfig;
