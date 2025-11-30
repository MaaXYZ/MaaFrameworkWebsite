<template>
  <section class="community-projects" :class="{ 'light-mode': isLightMode }">
    <div class="container">
      <h2 class="section-title">{{ content.title }}</h2>
      <p class="section-subtitle">{{ content.subtitle }}</p>

      <div class="projects-carousel">
        <div class="carousel-track" ref="carouselTrack">
          <div
            v-for="(project, index) in displayProjects"
            :key="`${project.link}-${index}`"
            class="project-slide"
          >
            <Project
              :title="project.name"
              :desc="lang === 'zh' ? project.desc : project.enDesc"
              :logo="project.logo"
              :stack="project.stack"
              :link="project.link"
              :is-light-mode="isLightMode"
            />
          </div>
        </div>
      </div>

      <div class="view-more">
        <div
          class="view-more-btn"
          @click="
            Router.open(
              lang === 'zh' ? '/community/projects' : '/en/community/projects',
              false
            )
          "
        >
          {{ content.viewMore }}
          <span class="btn-arrow">→</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Project from "../Project.vue";
import { getRandomProjects } from "../../assets/data/projects";
import { Router } from "../utils/route";

defineProps<{
  content: {
    title: string;
    subtitle: string;
    viewMore: string;
  };
  lang: "zh" | "en";
  isLightMode: boolean;
}>();

const carouselTrack = ref<HTMLElement | null>(null);
const randomProjects = ref(getRandomProjects(9));

const displayProjects = computed(() => {
  return [...randomProjects.value, ...randomProjects.value];
});

onMounted(() => {
  if (!carouselTrack.value) return;

  let scrollPosition = 0;
  const scrollSpeed = 0.2;
  let animationId: number;

  const scroll = () => {
    if (!carouselTrack.value) return;

    scrollPosition += scrollSpeed;
    const maxScroll = carouselTrack.value.scrollWidth / 2;

    if (scrollPosition >= maxScroll) {
      scrollPosition = 0;
    }

    carouselTrack.value.style.transform = `translateX(-${scrollPosition}px)`;
    animationId = requestAnimationFrame(scroll);
  };

  animationId = requestAnimationFrame(scroll);
});
</script>

<style scoped lang="scss">
.community-projects {
  position: relative;
  padding: 100px 0 80px;
  background: transparent;
  overflow: visible;
  z-index: 2;
}

.container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 24px 0;
  padding: 20px;
  background: linear-gradient(120deg, #e0e7ff 0%, #47caff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;

  .community-projects.light-mode & {
    background: linear-gradient(120deg, #1e40af 0%, #0284c7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.section-subtitle {
  font-size: 1.25rem;
  color: #b0bac9;
  text-align: center;
  margin: 0 0 48px 0;
  line-height: 1.6;

  .community-projects.light-mode & {
    color: #334155;
  }
}

.projects-carousel {
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  margin-bottom: 60px;
  position: relative;
  padding: 40px 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      90deg,
      rgba(10, 14, 26, 1) 0%,
      rgba(10, 14, 26, 0.95) 10%,
      rgba(10, 14, 26, 0.85) 20%,
      rgba(10, 14, 26, 0.7) 35%,
      rgba(10, 14, 26, 0.5) 50%,
      rgba(10, 14, 26, 0.3) 65%,
      rgba(10, 14, 26, 0.15) 80%,
      rgba(10, 14, 26, 0.05) 90%,
      transparent 100%
    );

    .community-projects.light-mode & {
      background: linear-gradient(
        90deg,
        rgba(248, 249, 250, 1) 0%,
        rgba(248, 249, 250, 0.95) 10%,
        rgba(248, 249, 250, 0.85) 20%,
        rgba(248, 249, 250, 0.7) 35%,
        rgba(248, 249, 250, 0.5) 50%,
        rgba(248, 249, 250, 0.3) 65%,
        rgba(248, 249, 250, 0.15) 80%,
        rgba(248, 249, 250, 0.05) 90%,
        transparent 100%
      );
    }
  }

  &::after {
    right: 0;
    background: linear-gradient(
      -90deg,
      rgba(10, 14, 26, 1) 0%,
      rgba(10, 14, 26, 0.95) 10%,
      rgba(10, 14, 26, 0.85) 20%,
      rgba(10, 14, 26, 0.7) 35%,
      rgba(10, 14, 26, 0.5) 50%,
      rgba(10, 14, 26, 0.3) 65%,
      rgba(10, 14, 26, 0.15) 80%,
      rgba(10, 14, 26, 0.05) 90%,
      transparent 100%
    );

    .community-projects.light-mode & {
      background: linear-gradient(
        -90deg,
        rgba(248, 249, 250, 1) 0%,
        rgba(248, 249, 250, 0.95) 10%,
        rgba(248, 249, 250, 0.85) 20%,
        rgba(248, 249, 250, 0.7) 35%,
        rgba(248, 249, 250, 0.5) 50%,
        rgba(248, 249, 250, 0.3) 65%,
        rgba(248, 249, 250, 0.15) 80%,
        rgba(248, 249, 250, 0.05) 90%,
        transparent 100%
      );
    }
  }
}

.carousel-track {
  display: flex;
  gap: 24px;
  will-change: transform;
}

.project-slide {
  flex-shrink: 0;
  width: 400px;
}

.view-more {
  display: flex;
  justify-content: center;
}

.view-more-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 48px;
  background: rgba(26, 35, 50, 0.6);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(71, 202, 255, 0.3);
  border-radius: 16px;
  color: #e0e7ff;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(71, 202, 255, 0.15),
      transparent
    );
    transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    transform: translateY(-2px);
    background: rgba(26, 35, 50, 0.8);
    border-color: rgba(71, 202, 255, 0.6);
    box-shadow: 0 8px 32px rgba(71, 202, 255, 0.25),
      0 0 0 1px rgba(71, 202, 255, 0.1) inset;

    &::before {
      left: 100%;
    }

    .btn-arrow {
      transform: translateX(6px);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(71, 202, 255, 0.2);
  }

  .btn-arrow {
    font-size: 1.5rem;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  // 日间模式
  .community-projects.light-mode & {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(71, 202, 255, 0.5);
    color: #334155;

    &:hover {
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(71, 202, 255, 0.7);
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .section-title {
    font-size: 2.5rem;
  }

  .project-slide {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .community-projects {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    padding: 0 20px;
  }

  .project-slide {
    width: 300px;
  }

  .projects-carousel {
    &::before,
    &::after {
      width: 80px;
    }
  }

  .view-more-btn {
    width: 90%;
    max-width: 350px;
    justify-content: center;
  }
}
</style>
