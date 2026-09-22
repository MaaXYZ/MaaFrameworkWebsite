---
name: maafw-sync-community
description: 同步 MaaFrameworkWebsite 的社区项目列表。用户在 MaaFramework 网站上下文中说“同步社区项目”“更新社区项目列表”“同步社区项目图标”或要求根据 MaaXYZ/MaaFramework 的中英文 README 更新项目时使用；核对新增、变更和撤下项目，维护双语介绍、仓库链接、图标与技术栈，并验证构建。不用于其他网站的泛化社区管理或 MaaFramework 文档同步。
---

# 同步 MaaFramework 社区项目

将网站的共享项目数据与 MaaXYZ/MaaFramework 当前中英文 README 对齐，沿用现有组件和资源组织方式。用户只说“同步社区项目”时，默认完成资料更新、图标补齐和验证；不需要再次询问是否开始。

## 工作区与资料来源

使用本技能所在仓库的当前 MaaFrameworkWebsite 工作区，读取适用的 AGENTS.md 并检查 `git status --short`。本技能存放于仓库根目录的 `.agents/skills/maafw-sync-community/`，文中的网站文件路径均相对于仓库根目录。保留用户已有改动，不依赖特定机器的绝对路径。

每次都重新获取这两份资料，不使用上次的项目数量或缓存作为最新事实：

- 中文：https://github.com/MaaXYZ/MaaFramework/blob/main/README.md
- 英文：https://github.com/MaaXYZ/MaaFramework/blob/main/README_en.md
- 原始文件：https://raw.githubusercontent.com/MaaXYZ/MaaFramework/main/README.md
- 英文原始文件：https://raw.githubusercontent.com/MaaXYZ/MaaFramework/main/README_en.md

仅提取“社区项目 / Community Project”二级标题下的内容，到下一个二级标题为止。三级标题对应通用 UI、开发工具和应用程序。用标题定位，不能依赖固定章节序号、行号或项目总数。

优先读取完整 raw Markdown，避免网页截断、徽章和 GitHub 导航干扰。独立下载可并行，缓存放在临时目录。Python 在 Windows 上使用 UTF-8（如 `python -X utf8`），读写显式指定 UTF-8，避免中文和特殊字符因系统编码丢失。

## 网站数据位置

先确认这些路径仍适用，再编辑：

| 路径 | 用途 |
| --- | --- |
| `src/assets/data/projects.ts` | `uis`、`tools`、`apps` 数组，共用 `name`、`desc`、`enDesc`、`logo`、`stack`、`link` |
| `src/assets/logos/logos.ts` | 项目图标动态导入，默认图标为 `Logos.MaaFW` |
| `src/assets/logos/` | 本地项目图标 |
| `src/assets/types/Stack.ts` | 技术栈枚举 |
| `src/assets/data/badges.ts` | 技术栈的图标、文字和颜色 |
| `src/assets/icons/icons.ts`、`src/assets/icons/` | 技术栈图标导入与文件 |
| `src/community/projects.md`、`src/en/community/projects.md` | 中英文列表页，共享项目数组 |
| `src/components/homepage/CommunityProjects.vue` | 首页从共享数据随机取项目 |

通常只需维护数据和资源，首页与双语列表会一起更新；不要复制两套列表、改写随机展示逻辑或顺带重做 UI。

## 对照与更新原则

1. 按分类比较项目名称、仓库地址、中英文介绍和技术栈。结合名称与仓库身份识别更名、迁移，不能只按名称匹配后重复添加。输出简短的新增、变更、撤下概况。
2. 新增项目补齐双语介绍、链接、图标和技术栈，沿用上游分类与顺序。移除介绍中的 Markdown 链接/强调标记，保留可读文字；卡片将描述作为纯文本渲染。
3. 两份 README 不一致时，结合项目自身当前 README 核实，保留较新的有效身份信息和已有正确游戏译名。不要将过期英文名称、框架名或较差译名机械覆盖回来。此次遇到的例子是中文使用 MFW-CFA / PySide6，而英文仍写 MFW-PyQt6 / PyQt6；这是核实线索，不是永久例外名单。
4. 取两种语言中有效项目的并集。常规完整同步时，项目只有在两份上游列表都已撤下且完整读取成功后才移除；单语遗漏、网络错误或解析失败都不能作为下架依据。若用户仅要求新增或只更新图标，遵守该范围。
5. 技术栈根据上游语言/框架徽章和必要的仓库证据更新。不要把 license、activity、stars、mirrorc、website、npm 或 pypi 等发布/统计徽章误当作技术栈。无可靠依据时可以使用空数组，不要凭项目名字推测语言。
6. 遇到新技术栈，同步维护枚举、badge 配置、icon 导入和资源文件；颜色保持文字可读。现有标签可直接复用。不要引入多余依赖。

## 图标查找与落地

- 优先保留可用的已有专属图标；对新增项目、发生品牌变化或已有图标失效的项目，查看其仓库 README 的 `<img src>` 和 Markdown 图片。
- 选择项目 Logo，不使用徽章、赞助按钮、贡献者头像墙或软件截图充当图标。README 没有合适图标时，可有限检查仓库中明显的 logo/icon 资源；仍无合适资源则使用 `Logos.MaaFW`，无需反复寻找或要求用户提供。
- 相对图片路径相对于 README 所在目录解析。GitHub `blob` 图片链接转换为对应 raw 文件地址，保留正确分支和大小写。
- 获取项目默认分支 README 可使用 `https://raw.githubusercontent.com/{owner}/{repo}/HEAD/README.md`。若 GitHub API 返回 403 限流，改用 raw 文件或正常仓库网页；404 时核实默认分支、README 路径或仓库迁移。不能将读取失败直接认定为没有图标。
- 下载到 `src/assets/logos/`，使用合理文件名并在 `logos.ts` 中增加动态导入。无图标项目直接复用默认资源，不复制默认图片。
- 校验响应确为图片（文件签名、格式、尺寸），查看下载后的本地图片确认内容。避免将 HTML 错误页保存为 PNG，或仅改变后缀伪装格式。
- 新技术栈图标可取官方资源或 Simple Icons；CDN 受限时可读取其 GitHub raw SVG（如 `simple-icons/simple-icons/develop/icons/kotlin.svg`）。检查 SVG 内容有效，颜色与现有 badge 风格协调。

## 验证与交付

本任务通常无需新增持久化测试；进行一次有针对性的校验即可：

- 数据：项目无重复，分类和顺序合理，名称/仓库链接覆盖两份上游的有效项目；新增中英文介绍均非空。核对中文描述与对应上游，英文差异保留明确理由，不以两种语言逐字相同为要求。
- 引用：所有 `Logos.*` 对应真实可导入文件，所有 `Stack.*` 存在且有 badge，新增 SVG 能解析，图片确实可读。
- 差异：运行 `git diff --check`，查看 diff 和未跟踪资源，确保只包含本次授权的内容。下载缓存和临时验证脚本不进入提交。
- 构建：查看 `package.json` 后使用仓库现有依赖运行 `npm run build`（或项目约定的等效命令）。持续等待至明确退出状态，不能把后台进程启动成功当作构建成功。遇到失败先判断是否由本次修改引起，并在结果中说明尚未解决的问题；不为无关警告进行依赖升级。

最后简要报告新增项目、重要资料更新、专属/默认图标使用情况、撤下项目及验证结果。附必要的文件或上游来源链接。提交、推送、PR 和部署遵循当前用户授权，不由“同步社区项目”自动扩展出来。
