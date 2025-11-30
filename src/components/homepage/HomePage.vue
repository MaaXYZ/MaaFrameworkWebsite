<template>
  <div class="homepage-container" :class="{ 'light-mode': isLightMode }">
    <!-- 全局背景效果 -->
    <div class="global-background">
      <div class="grid-overlay"></div>
      <div class="glow-effect glow-1"></div>
      <div class="glow-effect glow-2"></div>
      <div class="glow-effect glow-3"></div>
      <canvas ref="particlesCanvas" class="particles-canvas"></canvas>
    </div>

    <nav
      class="homepage-nav"
      :class="{ scrolled: isScrolled, 'light-mode': isLightMode }"
    >
      <div class="nav-content">
        <a href="/" class="nav-logo">
          <img src="/maafw.png" alt="MaaFramework Logo" class="logo-icon" />
          <span class="logo-text">MaaFramework</span>
        </a>
        <div class="nav-links">
          <!-- 主题切换按钮 -->
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :aria-label="isLightMode ? '切换到暗色模式' : '切换到亮色模式'"
          >
            <div class="toggle-track">
              <div class="toggle-thumb" :class="{ active: !isLightMode }">
                <svg
                  v-if="isLightMode"
                  class="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="3"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="5.64"
                    y2="5.64"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="1"
                    y1="12"
                    x2="3"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="23"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="5.64"
                    x2="19.78"
                    y2="4.22"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  v-else
                  class="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>
          <a
            :href="
              lang === 'zh' ? '/docs/1.1-快速开始' : '/en/docs/1.1-QuickStarted'
            "
            class="nav-link"
            >{{ lang === "zh" ? "文档" : "Docs" }}</a
          >
          <a
            :href="
              lang === 'zh' ? '/community/projects' : '/en/community/projects'
            "
            class="nav-link"
            >{{ lang === "zh" ? "社区" : "Community" }}</a
          >
          <a
            href="https://github.com/MaaXYZ/MaaFramework"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
            >GitHub</a
          >
        </div>
      </div>
    </nav>
    <HeroSection
      :content="content.hero"
      :lang="lang"
      :is-light-mode="isLightMode"
    />
    <FeatureShowcase :content="content.features" :is-light-mode="isLightMode" />
    <IntegrationComparison
      :content="content.integrations"
      :is-light-mode="isLightMode"
    />
    <Testimonials
      :content="content.testimonials"
      :is-light-mode="isLightMode"
    />
    <CommunityProjects
      :content="content.community"
      :lang="lang"
      :is-light-mode="isLightMode"
    />
    <CTASection :content="content.cta" :is-light-mode="isLightMode" />
    <FooterSection :content="content.footer" :is-light-mode="isLightMode" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { zhContent, enContent } from "../../locales/homepage";
import type { HomepageContent } from "../../locales/homepage";
import HeroSection from "./HeroSection.vue";
import FeatureShowcase from "./FeatureShowcase.vue";
import IntegrationComparison from "./IntegrationComparison.vue";
import Testimonials from "./Testimonials.vue";
import CommunityProjects from "./CommunityProjects.vue";
import CTASection from "./CTASection.vue";
import FooterSection from "./FooterSection.vue";

const props = defineProps<{
  lang: "zh" | "en";
}>();

const content = computed<HomepageContent>(() => {
  return props.lang === "zh" ? zhContent : enContent;
});

const isScrolled = ref(false);
const particlesCanvas = ref<HTMLCanvasElement | null>(null);

// 初始化主题
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("vitepress-theme-appearance");
  if (savedTheme === "dark") return false;
  if (savedTheme === "light") return true;
  const hasLightClass = !document.documentElement.classList.contains("dark");
  return hasLightClass || savedTheme === null;
};

const isLightMode = ref(getInitialTheme());

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value;
  const theme = isLightMode.value ? "light" : "dark";
  localStorage.setItem("vitepress-theme-appearance", theme);
  if (isLightMode.value) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
};

// 监听 localStorage 变化
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === "vitepress-theme-appearance") {
    isLightMode.value = e.newValue === "light";
  }
};

// 检查当前主题状态
const checkTheme = () => {
  const htmlElement = document.documentElement;
  const hasLightClass = !htmlElement.classList.contains("dark");
  const savedTheme = localStorage.getItem("vitepress-theme-appearance");
  const shouldBeLightMode =
    savedTheme === "light" ||
    (savedTheme === "auto" && hasLightClass) ||
    hasLightClass;

  if (isLightMode.value !== shouldBeLightMode) {
    isLightMode.value = shouldBeLightMode;
  }
};

// 全局粒子背景动画
onMounted(() => {
  checkTheme();
  window.addEventListener("storage", handleStorageChange);
  const observer = new MutationObserver(() => {
    checkTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("scroll", handleScroll);

  if (!particlesCanvas.value) return;

  const canvas = particlesCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }

  const particles: Particle[] = [];
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.05,
    });
  }

  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY + window.scrollY;
  };

  window.addEventListener("mousemove", handleMouseMove);

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.x -= dx * force * 0.01;
        particle.y -= dy * force * 0.01;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      const particleColor = isLightMode.value
        ? `rgba(37, 99, 235, ${particle.opacity})`
        : `rgba(71, 202, 255, ${particle.opacity})`;
      ctx.fillStyle = particleColor;
      ctx.fill();

      particles.forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          const lineColor = isLightMode.value
            ? `rgba(37, 99, 235, ${0.05 * (1 - distance / 80)})`
            : `rgba(71, 202, 255, ${0.05 * (1 - distance / 80)})`;
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<style scoped lang="scss">
.homepage-container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  background: #0a0e1a;
  scroll-behavior: smooth;
  transition: background 0.3s ease;

  &.light-mode {
    background: #f8f9fa;
  }
}

// 全局背景效果
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  .particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .grid-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        rgba(71, 202, 255, 0.08) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(71, 202, 255, 0.08) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.4;
    animation: gridMove 30s linear infinite;
    transition: background-image 0.3s ease, opacity 0.3s ease;
  }

  .glow-effect {
    position: absolute;
    filter: blur(120px);
    animation: glowFloat 15s ease-in-out infinite;
    transition: background 0.3s ease;

    &.glow-1 {
      top: -20%;
      right: -10%;
      width: 60%;
      height: 60%;
      background: radial-gradient(
        circle,
        rgba(189, 52, 254, 0.25) 0%,
        transparent 70%
      );
    }

    &.glow-2 {
      top: 30%;
      left: -15%;
      width: 50%;
      height: 50%;
      background: radial-gradient(
        circle,
        rgba(71, 202, 255, 0.2) 0%,
        transparent 70%
      );
      animation-delay: -5s;
    }

    &.glow-3 {
      bottom: 20%;
      right: 10%;
      width: 45%;
      height: 45%;
      background: radial-gradient(
        circle,
        rgba(0, 255, 136, 0.15) 0%,
        transparent 70%
      );
      animation-delay: -10s;
    }
  }

  // 日间模式背景
  .homepage-container.light-mode & {
    .grid-overlay {
      background-image: linear-gradient(
          rgba(71, 202, 255, 0.12) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(71, 202, 255, 0.12) 1px, transparent 1px);
      opacity: 0.3;
    }

    .glow-effect {
      &.glow-1 {
        background: radial-gradient(
          circle,
          rgba(189, 52, 254, 0.15) 0%,
          transparent 70%
        );
      }

      &.glow-2 {
        background: radial-gradient(
          circle,
          rgba(71, 202, 255, 0.12) 0%,
          transparent 70%
        );
      }

      &.glow-3 {
        background: radial-gradient(
          circle,
          rgba(0, 255, 136, 0.1) 0%,
          transparent 70%
        );
      }
    }
  }
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

@keyframes glowFloat {
  0%,
  100% {
    opacity: 0.6;
    transform: translate(0, 0) scale(1);
  }
  33% {
    opacity: 0.8;
    transform: translate(20px, -30px) scale(1.1);
  }
  66% {
    opacity: 0.7;
    transform: translate(-20px, 20px) scale(0.95);
  }
}

.homepage-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 14, 26, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(71, 202, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &.scrolled {
    background: rgba(10, 14, 26, 0.95);
    border-bottom-color: rgba(71, 202, 255, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(71, 202, 255, 0.1);
    backdrop-filter: blur(20px);
  }

  &:hover {
    background: rgba(10, 14, 26, 0.95);
    border-bottom-color: rgba(71, 202, 255, 0.3);
  }

  // 日间模式
  &.light-mode {
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(71, 202, 255, 0.25);

    &.scrolled {
      background: rgba(255, 255, 255, 0.98);
      border-bottom-color: rgba(71, 202, 255, 0.4);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
        0 2px 8px rgba(71, 202, 255, 0.1);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.98);
      border-bottom-color: rgba(71, 202, 255, 0.45);
    }
  }
}

.nav-content {
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  transition: padding 0.3s ease;
}

.homepage-nav.scrolled .nav-content {
  padding: 16px 0;
}

.nav-logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;

  .logo-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: drop-shadow(0 0 8px rgba(71, 202, 255, 0.3));
    transition: all 0.3s;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(120deg, #bd34fe, #47caff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: all 0.3s;

    &:hover {
      filter: brightness(1.2);
    }
  }

  &:hover .logo-icon {
    filter: drop-shadow(0 0 16px rgba(71, 202, 255, 0.6));
    transform: scale(1.05);
  }
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: #b0bac9;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px 0;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #bd34fe, #47caff);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #47caff;
    transform: translateY(-2px);

    &::after {
      width: 100%;
    }
  }

  // 日间模式
  .homepage-nav.light-mode & {
    color: #1e293b;
    font-weight: 500;

    &:hover {
      color: #2563eb;
    }
  }
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  .toggle-track {
    position: relative;
    width: 56px;
    height: 28px;
    background: rgba(71, 202, 255, 0.2);
    border: 2px solid rgba(71, 202, 255, 0.4);
    border-radius: 14px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(189, 52, 254, 0.1),
        rgba(71, 202, 255, 0.1)
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .homepage-nav.light-mode & {
      background: rgba(255, 193, 7, 0.2);
      border-color: rgba(255, 193, 7, 0.5);

      &::before {
        opacity: 1;
      }
    }
  }

  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);

    .icon {
      width: 14px;
      height: 14px;
      color: #fff;
      transition: transform 0.3s ease;
    }

    &.active {
      left: 30px;
      background: linear-gradient(135deg, #1e293b, #334155);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }
  }

  &:hover .toggle-track {
    border-color: rgba(71, 202, 255, 0.6);
    box-shadow: 0 0 12px rgba(71, 202, 255, 0.3);

    .homepage-nav.light-mode & {
      border-color: rgba(255, 193, 7, 0.7);
      box-shadow: 0 0 12px rgba(255, 193, 7, 0.3);
    }
  }
}

@media (max-width: 768px) {
  .nav-content {
    padding: 16px 0;
  }

  .nav-logo .logo-text {
    font-size: 1.25rem;
  }

  .nav-logo .logo-icon {
    width: 32px;
    height: 32px;
  }

  .nav-links {
    gap: 20px;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}
</style>
