---
layout: home
title: MaaFramework Documentation
description: An automation black-box testing framework based on image recognition. Simple, powerful, and extensible for developers to build better test programs.

hero:
  name: MaaFramework
  text: An automation black-box testing framework based on image recognition
  tagline: Empowering developers to easily write better black-box test programs.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/docs/1.1-QuickStarted
    - theme: alt
      text: Community Project
      link: /en/community/projects
    - theme: alt
      text: GitHub
      link: https://github.com/MaaXYZ/MaaFramework
  image:
    src: /maafw.png
    alt: Logo
features:
  - title: Easy to Use
    details: Simple JSON configuration for automation workflows, no coding skills required. Perfect for beginners to get started quickly.
    icon: 🚀
  - title: Powerful Recognition
    details: Built-in OCR text recognition and template matching, supporting multiple recognition methods for various scenarios.
    icon: 🔍
  - title: Flexible Extension
    details: Support custom recognition and action modules through Agent Server, seamlessly integrate your own business logic.
    icon: 🔧
---

<script setup>
  import { ref, onMounted } from 'vue'
  import Project from "../components/Project.vue"
  import MoreProjectButton from "../components/MoreProjectButton.vue"
  import { projects, getRandomProjects } from "../assets/data/projects.ts"

  const items = ref(projects.slice(0, 6))
  onMounted(() => {
    items.value = getRandomProjects(6)
  })
</script>

<h2 class="maa-title">Community Project</h2>

<section class="maa-project-list">
  <Project v-for="project in items" :key="project.link" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />
</section>

<MoreProjectButton :lang="'en'" />
