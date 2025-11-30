import type { HomepageContent } from "./types";

export const enContent: HomepageContent = {
  hero: {
    title: "MaaFramework",
    subtitle:
      "An automation black-box testing framework based on image recognition",
    description: "Easy to Use · Powerful Recognition · Flexible Extension",
    buttons: {
      primary: "Quick Start",
      secondary: "View GitHub",
      tertiary: "Watch Demo",
    },
  },
  features: {
    title: "Core Features",
    items: [
      {
        icon: "🚀",
        title: "Easy to Use",
        description: "Simple JSON configuration for automation workflows",
        highlights: [
          "No coding skills required",
          "JSON low-code programming",
          "Video tutorials included",
        ],
      },
      {
        icon: "🔍",
        title: "Powerful Recognition",
        description: "Built-in OCR text recognition and template matching",
        highlights: [
          "OCR text recognition",
          "Template matching",
          "Feature detection",
          "Deep learning",
        ],
      },
      {
        icon: "🔧",
        title: "Flexible Extension",
        description:
          "Support custom recognition and action modules through Agent Server",
        highlights: [
          "AgentServer architecture",
          "Custom recognition/actions",
          "Cross-language support",
        ],
      },
    ],
  },
  integrations: {
    title: "Three Integration Solutions for Different Needs",
    subtitle:
      "From zero-code to fully customizable, choose the development approach that suits you",
    items: [
      {
        id: "json",
        name: "Pure JSON Low-Code",
        scenario: "Quick start, simple logic implementation",
        advantages: [
          "No coding skills required",
          "Automation through JSON configuration",
          "Video tutorials and project templates",
        ],
        codeExample: {
          language: "json",
          code: `{
  "ClickStartButton": {
    "recognition": "OCR",
    "expected": "Start",
    "action": "Click",
    "next": ["ClickConfirmIcon"]
  },
  "ClickConfirmIcon": {
    "recognition": "TemplateMatch",
    "template": "confirm.png",
    "action": "Click"
  }
}`,
        },
        resources: [
          {
            label: "🎞️ Video Tutorial",
            link: "https://www.bilibili.com/video/BV1yr421E7MW",
          },
          {
            label: "⭐ Project Template",
            link: "https://github.com/MaaXYZ/MaaPracticeBoilerplate",
          },
        ],
      },
      {
        id: "hybrid",
        name: "JSON + Custom Extension",
        recommended: true,
        scenario: "Medium complexity business logic",
        advantages: [
          "Retain JSON low-code advantages",
          "Register custom task modules via AgentServer",
          "Seamless integration with project template",
        ],
        codeExample: {
          language: "python",
          code: `from maa.agent.agent_server import AgentServer

# Register custom recognizer
@AgentServer.custom_recognition("MyReco")
class CustomReco:
    def analyze(ctx):
        return (10,10,100,100)

# Register custom action
@AgentServer.custom_action("MyAct")
class CustomAction:
    def run(ctx):
        ctx.controller.post_click(100, 10).wait()
        ctx.override_next(["TaskA", "TaskB"])

AgentServer.start_up(sock_id)`,
        },
      },
      {
        id: "code",
        name: "Full Code Development",
        scenario: "Deep customization, complex workflows",
        advantages: [
          "Complete control over execution flow",
          "Highly flexible",
          "Suitable for complex business logic",
        ],
        codeExample: {
          language: "python",
          code: `def main():
    # Execute predefined JSON task
    result = tasker.post_task("ClickStartButton").wait().get()
    
    if result.completed:
        # Execute code-level operations
        tasker.controller.post_click(100, 100)
    else:
        # Get current screenshot
        image = tasker.controller.cached_image
        # Register custom action
        tasker.resource.register_custom_action("MyAction", MyAction())
        # Execute hybrid task chain
        tasker.post_task("ClickConfirmIcon").wait()`,
        },
      },
    ],
    comparison: {
      dimensions: [
        "Configuration Complexity",
        "Development Efficiency",
        "Flexibility",
        "Learning Curve",
      ],
    },
  },
  testimonials: {
    title: "Developer Reviews",
    subtitle: "Hear what community developers say about MaaFramework",
    items: [
      {
        name: "Zhang Ming",
        role: "Automation Test Engineer",
        avatar: "Z",
        content:
          "MaaFramework significantly reduced our automation testing development costs. The JSON configuration approach allows non-technical staff to participate in building automation processes. Team collaboration efficiency increased by 3x!",
        project: "MAA",
      },
      {
        name: "Alex Chen",
        role: "Independent Developer",
        avatar: "A",
        content:
          "As an individual developer, I love the AgentServer architecture most. I can quickly implement custom logic with Python while retaining the convenience of JSON configuration. The development experience is excellent!",
        project: "MFAWPF",
      },
      {
        name: "Li Hua",
        role: "Game Script Developer",
        avatar: "L",
        content:
          "OCR recognition accuracy is very high, and template matching is stable. Compared to other frameworks, MaaFramework has a gentler learning curve, and the documentation and community support are excellent. Highly recommended!",
        project: "MBA",
      },
      {
        name: "Sarah Wang",
        role: "Product Manager",
        avatar: "S",
        content:
          "Even without programming background, I was able to get started quickly through video tutorials. Now I can build simple automation processes myself, greatly reducing communication costs with the development team.",
        project: "MaaPracticeBoilerplate",
      },
      {
        name: "Wang Qiang",
        role: "Full Stack Engineer",
        avatar: "W",
        content:
          "Cross-platform support is excellent - Windows, Linux, macOS all run seamlessly. High code quality, reasonable API design, and strong extensibility. This is one of the most professional automation frameworks I've seen.",
        project: "MaaY",
      },
      {
        name: "David Liu",
        role: "RPA Developer",
        avatar: "D",
        content:
          "After switching from traditional RPA tools to MaaFramework, development efficiency improved significantly. Especially the deep learning recognition feature makes handling complex scenarios much easier. Definitely worth trying!",
        project: "MaaFramework",
      },
    ],
  },
  community: {
    title: "Community Projects",
    subtitle: "Explore real-world applications built by community developers",
    viewMore: "View More Projects",
  },
  cta: {
    title: "Ready to Get Started?",
    subtitle: "Choose the best way to start using MaaFramework",
    cards: [
      {
        icon: "🚀",
        title: "Quick Start",
        description: "Follow tutorials to get started quickly",
        buttonText: "Start Learning",
        link: "/en/docs/1.1-QuickStarted",
      },
      {
        icon: "🌍",
        title: "Community Projects",
        description: "Explore real-world use cases",
        buttonText: "View Projects",
        link: "/en/community/projects",
      },
      {
        icon: "📦",
        title: "Integration Docs",
        description: "Integrate into your project",
        buttonText: "View Docs",
        link: "/en/docs/2.1-Integration",
      },
    ],
  },
  footer: {
    about: {
      title: "MaaFramework",
      description:
        "An automation black-box testing framework based on image recognition",
    },
    columns: [
      {
        title: "Documentation",
        links: [
          { label: "Quick Start", link: "/en/docs/1.1-QuickStarted" },
          { label: "Integration", link: "/en/docs/2.1-Integration" },
          { label: "Pipeline Protocol", link: "/en/docs/3.1-PipelineProtocol" },
          { label: "Build Guide", link: "/en/docs/4.1-BuildGuide" },
        ],
      },
      {
        title: "Community",
        links: [
          {
            label: "GitHub Repository",
            link: "https://github.com/MaaXYZ/MaaFramework",
          },
          { label: "Community Projects", link: "/en/community/projects" },
          {
            label: "Contributing Guide",
            link: "https://github.com/MaaXYZ/MaaFramework/blob/main/docs/en_us/3.2-IntegrationOverview.md",
          },
          {
            label: "Release Notes",
            link: "https://github.com/MaaXYZ/MaaFramework/releases",
          },
        ],
      },
      {
        title: "Resources",
        links: [
          {
            label: "Download Center",
            link: "https://github.com/MaaXYZ/MaaFramework/releases",
          },
          {
            label: "VSCode Extension",
            link: "https://marketplace.visualstudio.com/items?itemName=nekosu.maa-support",
          },
          {
            label: "Video Tutorials",
            link: "https://www.bilibili.com/video/BV1yr421E7MW",
          },
          {
            label: "Pipeline Debugger",
            link: "https://github.com/MaaXYZ/MaaDebugger",
          },
        ],
      },
    ],
    copyright: "© 2024 MaaXYZ. All rights reserved.",
  },
};
