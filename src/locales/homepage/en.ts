import type { HomepageContent } from "./types";
import avatars from "../../assets/avatars/avatars";

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
        icon: "rocket",
        title: "Easy to Use",
        description: "Simple JSON configuration for automation workflows",
        highlights: [
          "No coding skills required",
          "JSON low-code programming",
          "Video tutorials included",
          "Official MCP support",
        ],
      },
      {
        icon: "search",
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
        icon: "wrench",
        title: "Flexible Extension",
        description:
          "Support custom recognition and action modules through Agent Server",
        highlights: [
          "Multi-process architecture",
          "Custom recognition/actions",
          "Cross-language support",
        ],
      },
    ],
  },
  integrations: {
    title: "Multiple Solutions for Different Needs",
    subtitle:
      "From zero-code to fully customizable, choose the development approach that suits you",
    items: [
      {
        id: "mpx",
        name: "Zero-Code Dev",
        scenario: "Visual editing, complex JSON organization",
        advantages: [
          "View and edit your logic with flowcharts",
          "Built-in local file management, seamless integration with other tools",
          "Compatible with existing files, quick project onboarding",
        ],
        codeExample: {
          language: "image",
          image: "/mpe.png",
        },
        resources: [
          {
            label: "Start Now",
            link: "https://mpe.codax.site/stable/",
          },
          {
            icon: "book",
            label: "Introduction",
            link: "https://mpe.codax.site/docs/",
          },
        ],
      },
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
            icon: "video",
            label: "Video Tutorial",
            link: "https://www.bilibili.com/video/BV1yr421E7MW",
          },
          {
            icon: "star",
            label: "Project Template",
            link: "https://github.com/MaaXYZ/MaaPracticeBoilerplate",
          },
        ],
      },
      {
        id: "hybrid",
        name: "JSON + Custom",
        recommended: true,
        scenario: "Medium complexity business logic",
        advantages: [
          "Retain JSON low-code advantages",
          "Register custom task modules via independent process",
          "Seamless integration with project template",
        ],
        codeExample: {
          language: "python",
          code: `# ========== Pipeline ==========
{
  "ClickConfirmIcon": {
    "next": ["CustomProcessModule"]
  },
  "CustomProcessModule": {
    "recognition": "Custom",
    "custom_recognition": "MyReco",
    "action": "Custom",
    "custom_action": "MyAct"
  }
}

# ======= Custom (Agent) =======
from maa.agent.agent_server import AgentServer

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
        resources: [
          {
            icon: "book",
            label: "Quick Start",
            link: "/en/docs/1.1-QuickStarted",
          },
        ],
      },
      {
        id: "code",
        name: "Full Code Dev",
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
        resources: [
          {
            icon: "book",
            label: "Quick Start",
            link: "/en/docs/1.1-QuickStarted",
          },
        ],
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
    labels: {
      recommended: "Recommended",
      scenario: "Use Cases",
      advantages: "Core Advantages",
      resources: "Resources",
    },
  },
  testimonials: {
    title: "Developer Reviews",
    subtitle: "Hear what community developers say about MaaFramework",
    items: [
      {
        name: "MistEO",
        role: "Project Architect",
        avatar: avatars.MistEO,
        content:
          "MaaFramework significantly reduced our automation testing development costs. The JSON configuration approach allows non-technical staff to participate in building automation processes. Team collaboration efficiency has greatly improved!",
        project: "MAA",
      },
      {
        name: "Windsland52",
        role: "Game Script Developer",
        avatar: avatars.Windsland52,
        content:
          "OCR recognition accuracy is very high, and template matching is stable. Compared to other frameworks, MaaFramework has a gentler learning curve, and the documentation and community support are excellent. Highly recommended!",
        project: "M9A",
      },
      {
        name: "SweetSmellFox",
        role: "UI Developer",
        avatar: avatars.SweetSmellFox,
        content:
          "Cross-platform support is excellent - Windows, Linux, macOS all run seamlessly. High code quality, reasonable API design, and strong extensibility. This is one of the most professional automation frameworks I've seen!",
        project: "MFAA",
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
        icon: "globe",
        title: "Community Projects",
        description: "Explore real-world use cases",
        buttonText: "View Projects",
        link: "/en/community/projects",
      },
      {
        icon: "rocket",
        title: "Quick Start",
        description: "Follow tutorials to get started quickly",
        buttonText: "Start Learning",
        link: "/en/docs/1.1-QuickStarted",
      },
      {
        icon: "package",
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
            label: "Video Tutorials",
            link: "https://www.bilibili.com/video/BV1yr421E7MW",
          },
          {
            label: "VSCode Extension",
            link: "https://marketplace.visualstudio.com/items?itemName=nekosu.maa-support",
          },
          {
            label: "Debugger Tool",
            link: "https://github.com/MaaXYZ/MaaDebugger",
          },
        ],
      },
    ],
    copyright: "© 2025 MaaXYZ. All rights reserved.",
  },
};
