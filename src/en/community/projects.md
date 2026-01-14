---
layout: home
sidebar: false
prev: false
next: false
aside: false
---

<script setup>
  import { uis, tools, apps } from "../../assets/data/projects";
</script>

<h1 class="maa-center" style="margin-top: 50px">Community Project</h1>

## Generic UI

<section class="maa-project-list">

  <Project v-for="project in uis" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>

## Development Tool

<section class="maa-project-list">

  <Project v-for="project in tools" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>

## Application

<section class="maa-project-list">

  <Project v-for="project in apps" :title="project.name" :desc="project.enDesc" :logo="project.logo" :stack="project.stack" :link="project.link" />

</section>
