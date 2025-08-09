// import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import taskLists from "markdown-it-task-lists";

import { locales } from "./locales";
import { sidebars } from "./sidebars";

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
      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex("href");
        if (hrefIndex >= 0) {
          let href = token.attrs![hrefIndex][1];
          if (
            !href.startsWith("http://") &&
            !href.startsWith("https://") &&
            !href.startsWith("//") &&
            !href.startsWith("#") &&
            !href.startsWith("/")
          ) {
            const parsedHref = parseParam(href);
            const target = sidebars.kv[parsedHref.seq];
            if (target) {
              href = href.replace(parsedHref.name, target).replace(".md", "");
            }
          }
          token.attrs![hrefIndex][1] = href;
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
