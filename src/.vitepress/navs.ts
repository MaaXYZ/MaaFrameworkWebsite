export const zhNav = [
  { text: "主页", link: "/" },
  {
    text: "文档",
    activeMatch: "/docs/",
    link: "/docs/1.1-QuickStarted",
  },
  {
    text: "社区",
    activeMatch: "/community/",
    items: [
      { text: "社区项目", link: "/community/projects" },
      {
        text: "友情链接",
        items: [{ text: "MaaAssistantArknights", link: "https://maa.plus" }],
      },
    ],
  },
  {
    text: "问 AI 🤖",
    link: "https://deepwiki.com/MaaXYZ/MaaFramework",
  },
];

export const enNav = [
  { text: "Home", link: "/en" },
  {
    text: "Docs",
    activeMatch: "/en/docs/",
    link: "/en/docs/1.1-QuickStarted",
  },
  {
    text: "Community",
    activeMatch: "/en/community/",
    items: [
      {
        text: "Projects",
        link: "/en/community/projects",
      },
      {
        text: "Links",
        items: [{ text: "MaaAssistantArknights", link: "https://maa.plus" }],
      },
    ],
  },
  {
    text: "Ask AI 🤖",
    link: "https://deepwiki.com/MaaXYZ/MaaFramework",
  },
];
