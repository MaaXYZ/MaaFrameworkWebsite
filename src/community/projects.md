---
layout: home
sidebar: false
prev: false
next: false
aside: false
---

<script setup>
  import { uis, plugins, toolGroups, apps } from "../assets/data/projects";
</script>

<h1 class="maa-center" style="margin-top: 50px">社区项目</h1>

## 通用 UI

<section class="maa-project-list">

  <Project v-for="project in uis" :title="project.name" :desc="project.desc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>

## 扩展插件

<section class="maa-project-list">

  <Project v-for="project in plugins" :key="project.name" :title="project.name" :desc="project.desc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>

## 开发工具

<section v-for="group in toolGroups" :key="group.id">
  <h3 :id="group.id">{{ group.name }}</h3>
  <div class="maa-project-list">
    <Project v-for="project in group.projects" :key="project.name" :title="project.name" :desc="project.desc" :logo="project.logo" :stack="project.stack" :link="project.link" />
  </div>
</section>

## 应用程序

<section class="maa-project-list">

  <Project v-for="project in apps" :title="project.name" :desc="project.desc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>
