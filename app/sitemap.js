import { apps } from "@/data/apps";

const baseUrl = "https://extremestudiosai.com";

export default function sitemap() {
  const staticPages = ["", "/profile", "/programs", "/programs/ai-engineer-basic", "/projects", "/privacy", "/terms", "/disclaimer"];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })),
    ...apps.map((app) => ({
      url: `${baseUrl}/projects/${app.slug}`,
      lastModified: new Date(),
    })),
  ];
}
