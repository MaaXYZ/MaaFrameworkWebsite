<template>
  <section class="feature-showcase" :class="{ 'light-mode': isLightMode }">
    <div class="container">
      <h2 class="section-title">{{ content.title }}</h2>

      <div class="features-grid">
        <div
          v-for="(feature, index) in content.items"
          :key="index"
          class="feature-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon">
            <img v-if="iconMap[feature.icon]" class="icon-svg" :src="iconMap[feature.icon]" :alt="feature.icon" />
            <!-- Fallback for emoji -->
            <span v-else class="icon-emoji">{{ feature.icon }}</span>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <ul class="feature-highlights">
            <li v-for="(highlight, hIndex) in feature.highlights" :key="hIndex">
              <span class="highlight-dot"></span>
              {{ highlight }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Feature } from "../../locales/homepage/types";
import { iconMap } from "../../assets/icons/icons";

defineProps<{
  content: {
    title: string;
    items: Feature[];
  };
  isLightMode: boolean;
}>();
</script>

<style scoped lang="scss">
.feature-showcase {
  position: relative;
  padding: 120px 0 100px;
  background: transparent;
  overflow: visible;
  z-index: 1;
}

.container {
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 60px 0;
  padding: 20px;
  background: linear-gradient(120deg, #e0e7ff 0%, #47caff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;

  .feature-showcase.light-mode & {
    background: linear-gradient(120deg, #1e40af 0%, #0284c7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.feature-card {
  position: relative;
  padding: 40px 32px;
  background: rgba(26, 35, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(71, 202, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(189, 52, 254, 0.4),
      transparent 40%,
      transparent 60%,
      rgba(71, 202, 255, 0.4)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 24px 64px rgba(71, 202, 255, 0.3);
    border-color: rgba(71, 202, 255, 0.5);

    &::before {
      opacity: 1;
    }

    .feature-icon {
      transform: scale(1.15) rotate(8deg);

      .icon-emoji {
        animation: iconPulse 0.8s ease infinite;
      }
    }
  }

  // 日间模式
  .feature-showcase.light-mode & {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(71, 202, 255, 0.3);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

    &:hover {
      box-shadow: 0 24px 64px rgba(71, 202, 255, 0.25);
      border-color: rgba(71, 202, 255, 0.5);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconBounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes iconPulse {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
  50% {
    transform: scale(1.15);
    filter: drop-shadow(0 8px 16px rgba(71, 202, 255, 0.6));
  }
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 0 24px 0;
  background: linear-gradient(
    135deg,
    rgba(189, 52, 254, 0.2),
    rgba(71, 202, 255, 0.2)
  );
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .icon-emoji {
    font-size: 2.5rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  .icon-svg {
    width: 2.5rem;
    height: 2.5rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
}

.feature-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #e0e7ff;
  margin: 0 0 16px 0;

  .feature-showcase.light-mode & {
    color: #000000;
  }
}

.feature-description {
  font-size: 1rem;
  color: #b0bac9;
  line-height: 1.6;
  margin: 0 0 24px 0;

  .feature-showcase.light-mode & {
    color: #334155;
  }
}

.feature-highlights {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    font-size: 0.95rem;
    color: #8b95a8;

    .highlight-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: linear-gradient(135deg, #bd34fe, #47caff);
      flex-shrink: 0;
      box-shadow: 0 0 8px rgba(71, 202, 255, 0.6);
    }

    .feature-showcase.light-mode & {
      color: #475569;
    }
  }
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .feature-showcase {
    padding: 80px 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 48px;
  }

  .feature-card {
    padding: 32px 24px;
  }

  .feature-icon {
    width: 64px;
    height: 64px;

    .icon-emoji {
      font-size: 2rem;
    }
  }

  .feature-title {
    font-size: 1.5rem;
  }
}
</style>
