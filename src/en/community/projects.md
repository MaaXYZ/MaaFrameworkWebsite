---
layout: home
sidebar: false
prev: false
next: false
aside: false
---

<script setup>
  import { uis, plugins, toolGroups, apps } from "../../assets/data/projects";
</script>

<h1 class="maa-center" style="margin-top: 50px">Community Project</h1>

## Generic UI

<section class="maa-project-list">

  <Project v-for="project in uis" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>

## Extension Plugins

<section class="maa-project-list">

  <Project v-for="project in plugins" :key="project.name" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>

## Development Tool

<section v-for="group in toolGroups" :key="group.id">
  <h3 :id="group.id">{{ group.enName }}</h3>
  <div class="maa-project-list">
    <Project v-for="project in group.projects" :key="project.name" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />
  </div>
</section>

## Application

<section class="maa-project-list">

  <Project v-for="project in apps" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>
