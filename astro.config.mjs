// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: netlify({
    edgeMiddleware: true,
  }),
  // output: "server",
  site: "https://kuaafm.org",

  integrations: [
    react(),
    icon(),
    mdx(),
    sitemap(),
    robotsTxt({
      sitemap: ["https://kuaafm.org/sitemap-0.xml"],
      host: "https://kuaafm.org",
      policy: [
        {
          userAgent: "Googlebot",
          allow: "/",
          disallow: ["/search"],
          crawlDelay: 2,
        },
        {
          userAgent: "OtherBot",
          allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
          disallow: ["/admin", "/login"],
          crawlDelay: 2,
        },
        {
          userAgent: "*",
          allow: "/",
          disallow: "/search",
          crawlDelay: 10,
          cleanParam: "ref /articles/",
        },
      ],
    }),
  ],
});
