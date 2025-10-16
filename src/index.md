---
layout: home
title: MaaFramework 文档
description: 基于图像识别的自动化黑盒测试框架。简单易用、强大识别、灵活扩展，助力开发者轻松编写更好的黑盒测试程序。

hero:
  name: MaaFramework
  text: |
    基于图像识别的
    自动化黑盒测试框架
  tagline: 助力开发者轻松编写出更好的黑盒测试程序
  image:
    src: /maafw.png
    alt: Logo
    width: 260px
  actions:
    - theme: brand
      text: 快速开始
      link: /docs/1.1-QuickStarted
    - theme: alt
      text: 社区项目
      link: /community/projects
    - theme: alt
      text: GitHub
      link: https://github.com/MaaXYZ/MaaFramework

features:
  - title: 简单易用
    details: 通过简单的 JSON 配置即可实现自动化流程，无需编程基础，新手也能快速上手。
    icon: 🚀
  - title: 强大识别
    details: 内置 OCR 文字识别和模板匹配，支持多种识别方式，满足各种场景需求。
    icon: 🔍
  - title: 灵活扩展
    details: 通过 Agent Server 支持自定义识别和动作模块，无缝集成您的业务逻辑。
    icon: 🔧
---

<h2 class="maa-title">社区项目</h2>

<section class="maa-project-list">

  <script setup>
    import Project from "./components/Project.vue"
    import { projects } from "./assets/data/projects.ts"
  </script>

  <Project v-for="project in projects" :title="project.name" :desc="project.desc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>
