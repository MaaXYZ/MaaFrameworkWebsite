// import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import taskLists from "markdown-it-task-lists";

import { locales } from "./locales";
import { sidebars } from "./sidebars";

const ghPagesRouteBase = "MaaFrameworkDocsWebsiteVite";

export default withMermaid({
  title: "MaaFramework",
  description: "基于图像识别的自动化黑盒测试框架",
  lang: "zh-cn",
  head: [["link", { rel: "icon", href: `/maafw.png` }]],
  base: `/`,
  rewrites: sidebars.rewrites,
  locales,
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
      md.use(taskLists, { enabled: false });
    },
  },
});
