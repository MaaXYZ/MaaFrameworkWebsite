import { generateSidebar } from "vitepress-sidebar";
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

export function genSidebar(args: VitePressSidebarOptions = {}) {
  return generateSidebar({
    documentRootPath: "/docs",
    ...args,
  });
}

function processRewritesRecursion(routes, targetKV) {
  const rewrites = {};
  routes.forEach((route, index) => {
    let link = route.link as string;
    let text = route.text as string;
    // 递归
    if (route.items) {
      const rw = processRewritesRecursion(route.items, targetKV);
      Object.assign(rewrites, rw);
      return;
    }
    // 重写路径
    const splitLink = link.split("/");
    const kv = text.split("-");
    splitLink[splitLink.length - 1] = kv[0] + "-" + targetKV[kv[0]];
    const newLink = splitLink.join("/");
    rewrites[link + ".md"] = newLink + ".md";
    // 更改路径
    route.link = newLink;
  });
  return rewrites;
}

function processRoutes(routes) {
  routes.forEach((route) => {
    if (route["items"]) {
      processRoutes(route["items"]);
    }
    let texts = route["text"].split("-");
    if (texts.length > 1) {
      route["text"] = texts[1].trim();
    }
  });
}

function getFileNameKV(routes: Array<any>) {
  const kv = {};
  routes.forEach((route) => {
    if (route.items) {
      Object.assign(kv, getFileNameKV(route.items));
      return;
    }
    const splitText = route.text.split("-");
    kv[splitText[0]] = splitText[1];
  });
  return kv;
}

function getLocaleSidebars() {
  // 生成侧边栏
  let zn_routes = genSidebar({ scanStartPath: "/maafw" }) as Array<any>;
  let en_routes = genSidebar({ scanStartPath: "/en/maafw" }) as Array<any>;

  // 生成国际化路径重写
  const rewriteList = [zn_routes];
  const rewrites = {};
  rewriteList.forEach((item) => {
    const rw = processRewritesRecursion(item, getFileNameKV(en_routes));
    Object.assign(rewrites, rw);
  });

  // 更改路由名称
  processRoutes(zn_routes);
  processRoutes(en_routes);

  return {
    zh: zn_routes,
    en: en_routes,
    rewrites,
  };
}

export const sidebars = getLocaleSidebars();

export const zhSidebar = [
  {
    text: "应用开发",
    items: [
      { text: "快速开始", link: "/application/1.1-QuickStarted" },
      { text: "术语", link: "/application/1.2-ExplanationOfTerms" },
      { text: "回调协议", link: "/application/2.1-CallbackProtocol" },
      {
        text: "任务流水线（Pipeline）协议",
        link: "/application/3.1-PipelineProtocol",
      },
      {
        text: "Project Interface 协议",
        link: "/application/3.2-ProjectInterface",
      },
    ],
  },
  {
    text: "Binding接口",
    link: "/binding",
    items: [
      {
        text: "NodeJS",
        link: "/binding/NodeJS/J1.1-快速开始",
      },
    ],
  },
  {
    text: "框架开发",
    items: [
      { text: "构建指南", link: "/framework/4.1-BuildGuide" },
      {
        text: "标准化高级语言面向对象接口设计指南",
        link: "/framework/4.2-StandardizedInterfaceDesign",
      },
    ],
  },
];

export const enSidebar = [
  {
    text: "Application Dev",
    items: [
      { text: "Quick Start", link: "/en/application/1.1-QuickStarted" },
      { text: "Terms", link: "/en/application/1.2-ExplanationOfTerms" },
      {
        text: "Callback Protocol",
        link: "/en/application/2.1-CallbackProtocol",
      },
      {
        text: "Pipeline Protocol",
        link: "/en/application/3.1-PipelineProtocol",
      },
      {
        text: "Project Interface",
        link: "/en/application/3.2-ProjectInterface",
      },
    ],
  },
  {
    text: "Binding Interface",
    link: "/en/binding",
    items: [
      {
        text: "NodeJS",
        items: [
          { text: "Getting Started", link: "/en/binding/NodeJS/J1.1-快速开始" },
          {
            text: "Custom Recognition and Action",
            link: "/en/binding/NodeJS/J1.2-自定义识别_操作",
          },
          { text: "Packaging", link: "/en/binding/NodeJS/J1.3-打包" },
        ],
      },
    ],
  },
  {
    text: "Framework Dev",
    items: [
      { text: "How to Build", link: "/en/framework/4.1-BuildGuide" },
      {
        text: "Standardized High-Level Language Object-Oriented Interface Design",
        link: "/en/framework/4.2-StandardizedInterfaceDesign",
      },
    ],
  },
];
