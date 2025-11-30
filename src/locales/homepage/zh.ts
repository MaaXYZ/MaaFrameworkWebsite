import type { HomepageContent } from "./types";

export const zhContent: HomepageContent = {
  hero: {
    title: "MaaFramework",
    subtitle: "基于图像识别的自动化黑盒测试框架",
    description: "零编码基础 · 强大识别 · 灵活扩展",
    buttons: {
      primary: "快速开始",
      secondary: "查看 GitHub",
      tertiary: "观看演示",
    },
  },
  features: {
    title: "核心特性",
    items: [
      {
        icon: "🚀",
        title: "简单易用",
        description: "通过简单的 JSON 配置即可实现自动化流程",
        highlights: [
          "零编码基础要求",
          "JSON 低代码编程",
          "配套视频教程",
          "官方配套 MCP",
        ],
      },
      {
        icon: "🔍",
        title: "强大识别",
        description: "内置 OCR 文字识别和模板匹配",
        highlights: ["OCR 文字识别", "模板匹配", "特征检测", "深度学习"],
      },
      {
        icon: "🔧",
        title: "灵活扩展",
        description: "通过 Agent Server 支持自定义识别和动作模块",
        highlights: ["AgentServer 架构", "自定义识别/动作", "跨语言支持"],
      },
    ],
  },
  integrations: {
    title: "多种方案，满足不同需求",
    subtitle: "从零编码到完全自定义,灵活选择适合您的开发方式",
    items: [
      {
        id: "mpx",
        name: "MPE 零代码开发",
        scenario: "可视化编辑、复杂 JSON 梳理",
        advantages: [
          "使用流程图查看与编辑你的思路",
          "配套本地文件管理，无缝衔接其他工具",
          "兼容既有文件，快速入手项目",
        ],
        codeExample: {
          language: "image",
          image: "/mpe.png",
        },
        resources: [
          {
            label: "🐈‍⬛ 项目地址",
            link: "https://mpe.codax.site/docs/",
          },
          {
            label: "📖 文档",
            link: "https://mpe.codax.site/docs/",
          },
        ],
      },
      {
        id: "json",
        name: "纯 JSON 低代码",
        scenario: "快速入门、简单逻辑实现",
        advantages: [
          "零编码基础要求",
          "通过 JSON 配置实现自动化流程",
          "配套视频教程和项目模板",
        ],
        codeExample: {
          language: "json",
          code: `{
  "点击开始按钮": {
    "recognition": "OCR",
    "expected": "开始",
    "action": "Click",
    "next": ["点击确认图标"]
  },
  "点击确认图标": {
    "recognition": "TemplateMatch",
    "template": "确认.png",
    "action": "Click"
  }
}`,
        },
        resources: [
          {
            label: "🎞️ 视频教程",
            link: "https://www.bilibili.com/video/BV1yr421E7MW",
          },
          {
            label: "⭐ 项目模板",
            link: "https://github.com/MaaXYZ/MaaPracticeBoilerplate",
          },
        ],
      },
      {
        id: "hybrid",
        name: "JSON + 自定义扩展",
        recommended: true,
        scenario: "中等复杂度业务逻辑",
        advantages: [
          "保留 JSON 低代码优势",
          "通过 AgentServer 注册自定义任务模块",
          "无缝衔接项目模板",
        ],
        codeExample: {
          language: "python",
          code: `from maa.agent.agent_server import AgentServer

# 注册自定义识别器
@AgentServer.custom_recognition("MyReco")
class CustomReco:
    def analyze(ctx):
        return (10,10,100,100)

# 注册自定义动作
@AgentServer.custom_action("MyAct")
class CustomAction:
    def run(ctx):
        ctx.controller.post_click(100, 10).wait()
        ctx.override_next(["TaskA", "TaskB"])

AgentServer.start_up(sock_id)`,
        },
        resources: [
          {
            label: "📖 流水线协议",
            link: "/docs/3.1-PipelineProtocol",
          },
        ],
      },
      {
        id: "code",
        name: "全代码开发",
        scenario: "深度定制、复杂流程",
        advantages: ["完全控制执行流程", "高度灵活", "适合复杂业务逻辑"],
        codeExample: {
          language: "python",
          code: `def main():
    # 执行 JSON 预定义任务
    result = tasker.post_task("点击开始按钮").wait().get()
    
    if result.completed:
        # 执行代码级操作
        tasker.controller.post_click(100, 100)
    else:
        # 获取当前屏幕截图
        image = tasker.controller.cached_image
        # 注册自定义动作
        tasker.resource.register_custom_action("MyAction", MyAction())
        # 执行混合任务链
        tasker.post_task("点击确认图标").wait()`,
        },
        resources: [
          {
            label: "📖 集成文档",
            link: "/docs/2.1-Integration",
          },
        ],
      },
    ],
    comparison: {
      dimensions: ["配置复杂度", "开发效率", "灵活性", "学习曲线"],
    },
    labels: {
      recommended: "推荐",
      scenario: "适用场景",
      advantages: "核心优势",
      resources: "相关资源",
    },
  },
  testimonials: {
    title: "开发者评价",
    subtitle: "听听社区开发者对 MaaFramework 的真实反馈",
    items: [
      {
        name: "MistEO",
        role: "项目架构师",
        avatar: "M",
        content:
          "MaaFramework 大幅降低了我们自动化测试的开发成本，JSON 配置方式让非技术人员也能参与自动化流程的构建，团队协作效率大幅度提升！",
        project: "MAA",
      },
      {
        name: "Windsland52",
        role: "游戏脚本开发者",
        avatar: "默",
        content:
          "OCR 识别准确度很高，模板匹配也很稳定。相比其他框架，MaaFramework 的学习曲线更平缓，文档和社区支持也很完善。强烈推荐！",
        project: "M9A",
      },
      {
        name: "屑のFO",
        role: "UI开发者",
        avatar: "屑",
        content:
          "跨平台支持非常完善，Windows、Linux、macOS 都能无缝运行。代码质量高，API 设计合理，扩展性强。这是我见过最专业的自动化框架之一！",
        project: "MFAA",
      },
    ],
  },
  community: {
    title: "社区项目",
    subtitle: "查看由社区开发者构建的实际应用案例",
    viewMore: "查看更多项目",
  },
  cta: {
    title: "多说无益，即刻上手体验！",
    subtitle: "选择最适合您的方式开始使用 MaaFramework",
    cards: [
      {
        icon: "🌍",
        title: "社区项目",
        description: "参考实际应用案例",
        buttonText: "查看项目",
        link: "/community/projects",
      },
      {
        icon: "🚀",
        title: "新手入门",
        description: "跟随教程快速上手",
        buttonText: "开始学习",
        link: "/docs/1.1-QuickStarted",
      },
      {
        icon: "📦",
        title: "集成文档",
        description: "集成到您的项目",
        buttonText: "查看文档",
        link: "/docs/2.1-Integration",
      },
    ],
  },
  footer: {
    about: {
      title: "MaaFramework",
      description: "基于图像识别的自动化黑盒测试框架",
    },
    columns: [
      {
        title: "文档",
        links: [
          { label: "快速开始", link: "/docs/1.1-QuickStarted" },
          { label: "集成文档", link: "/docs/2.1-Integration" },
          { label: "任务流水线协议", link: "/docs/3.1-PipelineProtocol" },
          { label: "构建指南", link: "/docs/4.1-BuildGuide" },
        ],
      },
      {
        title: "社区",
        links: [
          {
            label: "GitHub 仓库",
            link: "https://github.com/MaaXYZ/MaaFramework",
          },
          { label: "社区项目", link: "/community/projects" },
          {
            label: "更新日志",
            link: "https://github.com/MaaXYZ/MaaFramework/releases",
          },
        ],
      },
      {
        title: "资源",
        links: [
          {
            label: "下载中心",
            link: "https://github.com/MaaXYZ/MaaFramework/releases",
          },
          {
            label: "视频教程",
            link: "https://www.bilibili.com/video/BV1yr421E7MW",
          },
          {
            label: "VSCode 插件",
            link: "https://marketplace.visualstudio.com/items?itemName=nekosu.maa-support",
          },
          {
            label: "调试工具",
            link: "https://github.com/MaaXYZ/MaaDebugger",
          },
        ],
      },
    ],
    copyright: "© 2025 MaaXYZ. All rights reserved.",
  },
};
