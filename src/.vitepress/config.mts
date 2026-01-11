import { withMermaid } from "vitepress-plugin-mermaid";
import taskLists from "markdown-it-task-lists";

import { locales } from "./locales";
import { sidebars } from "./sidebars";

export default withMermaid({
  title: "MaaFramework",
  description: "基于图像识别的自动化黑盒测试框架",
  lang: "zh-cn",
  head: [
    // 关键资源预加载
    ["link", { rel: "preload", href: `/maafw.png`, as: "image" }],
    ["link", { rel: "dns-prefetch", href: "https://fonts.googleapis.com" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
        crossorigin: "",
      },
    ],

    ["link", { rel: "icon", href: `/maafw.ico` }],
    ["meta", { name: "author", content: "MaaXYZ" }],
    ["meta", { name: "theme-color", content: "#1b73e8" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "MaaFramework" }],
    ["meta", { name: "robots", content: "index,follow" }],
    ["meta", { property: "og:image", content: "/maafw.png" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
  ],
  base: `/`,
  cleanUrls: true,
  lastUpdated: true,
  rewrites: sidebars.rewrites,
  sitemap: { hostname: "https://maafw.xyz" },
  locales,
  // Vite 构建优化配置
  vite: {
    build: {
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 启用 Rollup 构建优化
      rollupOptions: {
        output: {
          // 手动代码分割
          manualChunks: {
            "vue-runtime": ["vue"],
            "homepage-components": [
              "./src/components/homepage/FeatureShowcase.vue",
              "./src/components/homepage/IntegrationComparison.vue",
              "./src/components/homepage/Testimonials.vue",
              "./src/components/homepage/CommunityProjects.vue",
              "./src/components/homepage/CTASection.vue",
              "./src/components/homepage/FooterSection.vue",
            ],
          },
        },
      },
      // 压缩优化
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除 console
          drop_debugger: true,
        },
      },
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ["vue"],
    },
  },
  transformHead({ page, siteConfig }) {
    const hostname = "https://maafw.xyz";
    const siteBase = (siteConfig && (siteConfig as any).site?.base) || "/";
    const relativePath: string = (page as any).relativePath || "";
    let normalized = relativePath;
    if (normalized.endsWith("index.md")) {
      normalized = normalized.slice(0, -"index.md".length);
    }
    if (normalized.endsWith(".md")) {
      normalized = normalized.slice(0, -3);
    }
    let routePath = "/" + normalized.replace(/^\/+/, "");
    if (!routePath.endsWith(".html") && !routePath.endsWith("/")) {
      routePath += "/";
    }

    const baseNoSlash = siteBase.endsWith("/")
      ? siteBase.slice(0, -1)
      : siteBase;
    const canonical = hostname + baseNoSlash + routePath;

    // hreflang alternates between zh and en
    const isEn = routePath.startsWith("/en/") || routePath === "/en/";
    const zhPath = isEn ? routePath.replace(/^\/en\//, "/") : routePath;
    const enPath = isEn
      ? routePath
      : routePath.startsWith("/en/")
      ? routePath
      : "/en" + routePath;
    const zhUrl = hostname + baseNoSlash + zhPath;
    const enUrl = hostname + baseNoSlash + enPath;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "MaaFramework",
      url: hostname + baseNoSlash + "/",
      inLanguage: isEn ? "en-US" : "zh-CN",
    };

    const fm: any = (page as any).frontmatter || {};
    const pageTitle: string = fm.title || (page as any).title || "MaaFramework";
    const pageDescription: string =
      fm.description ||
      (page as any).description ||
      (isEn
        ? "An automation black-box testing framework based on image recognition"
        : "基于图像识别的自动化黑盒测试框架");

    const heroImg: string | undefined =
      fm?.hero?.image?.src || fm?.image || "/maafw.png";
    const absoluteOgImage = heroImg?.startsWith("http")
      ? heroImg
      : hostname + heroImg;

    const ogLocale = isEn ? "en_US" : "zh_CN";

    const segments = routePath
      .replace(/^\//, "")
      .replace(/\/$/, "")
      .split("/")
      .filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: isEn ? "Home" : "首页",
        item: hostname + baseNoSlash + "/",
      },
      ...segments.map((seg, index) => {
        const url =
          hostname +
          baseNoSlash +
          "/" +
          segments.slice(0, index + 1).join("/") +
          "/";
        const name = decodeURIComponent(seg).replace(/-/g, " ");
        return {
          "@type": "ListItem",
          position: index + 2,
          name,
          item: url,
        };
      }),
    ];
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    return [
      ["link", { rel: "canonical", href: canonical }],
      ["link", { rel: "alternate", href: zhUrl, hreflang: "zh-CN" }],
      ["link", { rel: "alternate", href: enUrl, hreflang: "en-US" }],
      ["link", { rel: "alternate", href: canonical, hreflang: "x-default" }],
      ["meta", { property: "og:url", content: canonical }],
      ["meta", { property: "og:title", content: pageTitle }],
      ["meta", { property: "og:description", content: pageDescription }],
      ["meta", { property: "og:image", content: absoluteOgImage }],
      ["meta", { property: "og:locale", content: ogLocale }],
      ["meta", { name: "description", content: pageDescription }],
      ["meta", { name: "twitter:title", content: pageTitle }],
      ["meta", { name: "twitter:description", content: pageDescription }],
      ["meta", { name: "twitter:image", content: absoluteOgImage }],
      ["script", { type: "application/ld+json" }, JSON.stringify(jsonLd)],
      ["script", { type: "application/ld+json" }, JSON.stringify(breadcrumbLd)],
    ];
  },
  themeConfig: {
    logo: "/maafw.png",
    search: {
      provider: "local",
    },
    outline: { level: [2, 3] },
    socialLinks: [
      { icon: "github", link: "https://github.com/MaaXYZ/MaaFramework" },
    ],
  },
  mermaid: {},
  markdown: {
    config: (md) => {
      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex("href");
        if (hrefIndex >= 0) {
          let href = token.attrs![hrefIndex][1];

          // 判断是否为外部链接
          const isExternal =
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("//");

          if (!isExternal && !href.startsWith("#") && !href.startsWith("/")) {
            // 检测向上跳转的相对路径
            if (href.startsWith("../")) {
              // 转换为 GitHub 仓库链接
              const githubBase =
                "https://github.com/MaaXYZ/MaaFramework/blob/main";
              // 移除开头的 ../ 路径
              const cleanPath = href.replace(/^(\.\.\/)+/, "");
              href = `${githubBase}/${cleanPath}`;
            } else {
              const parsedHref = parseParam(href);
              const target = sidebars.kv[parsedHref.seq];
              if (target) {
                href = href.replace(parsedHref.name, target).replace(".md", "");
              }
            }
          }

          token.attrs![hrefIndex][1] = href;

          // 外链标签
          const isFinalExternal =
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("//");
          if (isFinalExternal) {
            token.attrSet("target", "_blank");
            token.attrSet("rel", "noopener noreferrer");
          }
        }
        return self.renderToken(tokens, idx, options);
      };

      md.use(taskLists, { enabled: false });
    },
  },
});

function parseParam(href: string) {
  // 解析路径
  const fileNameWithSeq = href.split("/").pop();
  if (!fileNameWithSeq) {
    return { seq: "", name: "" };
  }

  // 拆分序号与文件名
  const index = fileNameWithSeq.indexOf("-");
  if (index === -1) {
    const nameCandidate = fileNameWithSeq;
    const nameWithoutMd = nameCandidate.toLowerCase().endsWith(".md")
      ? nameCandidate.slice(0, -3)
      : nameCandidate;
    return { seq: "", name: nameWithoutMd };
  }

  const seq = fileNameWithSeq.slice(0, index);
  const rest = fileNameWithSeq.slice(index + 1);

  // 处理锚点
  const hashIndex = rest.indexOf("#");
  let filenameEncoded,
    hash = "";
  if (hashIndex !== -1) {
    filenameEncoded = rest.slice(0, hashIndex);
    hash = rest.slice(hashIndex);
  } else {
    filenameEncoded = rest;
  }

  const nameWithoutMd = filenameEncoded.toLowerCase().endsWith(".md")
    ? filenameEncoded.slice(0, -3)
    : filenameEncoded;

  return { seq, name: nameWithoutMd, hash };
}
