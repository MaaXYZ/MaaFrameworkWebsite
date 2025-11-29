import { generateSidebar } from "vitepress-sidebar";
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

export function genSidebar(args: VitePressSidebarOptions = {}) {
  return generateSidebar({
    documentRootPath: "/src",
    ...args,
  });
}

function processRewritesRecursion(routes, targetKV) {
  const rewrites = {};
  routes.forEach((route) => {
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
    if (route.link) {
      route.link = "/" + route.link;
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
  let zn_routes = genSidebar({ scanStartPath: "/docs" }) as Array<any>;
  let en_routes = genSidebar({ scanStartPath: "/en/docs" }) as Array<any>;

  // 生成国际化路径重写
  const rewriteList = [zn_routes];
  const rewrites = {};
  const kv = getFileNameKV(en_routes);
  rewriteList.forEach((item) => {
    const rw = processRewritesRecursion(item, kv);
    Object.assign(rewrites, rw);
  });

  // 更改路由名称
  processRoutes(zn_routes);
  processRoutes(en_routes);

  return {
    zh: zn_routes,
    en: en_routes,
    rewrites,
    kv,
  };
}

export const sidebars = getLocaleSidebars();
