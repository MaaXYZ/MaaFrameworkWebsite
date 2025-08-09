import { zhNav, enNav } from "./navs";
import { sidebars } from "./sidebars";

export const locales = {
  root: {
    label: "简体中文",
    lang: "zh-cn",
    themeConfig: {
      nav: zhNav,
      sidebar: sidebars.zh,
    },
  },
  en: {
    label: "English",
    lang: "en-us",
    link: "/en/",
    themeConfig: {
      nav: enNav,
      sidebar: sidebars.en,
    },
  },
};
