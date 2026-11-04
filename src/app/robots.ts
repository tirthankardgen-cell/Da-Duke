import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  // The entire deployment is a concept demo until approved business content is supplied.
  return { rules: { userAgent: "*", disallow: "/" } };
}
