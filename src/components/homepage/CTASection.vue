<template>
  <section class="cta-section" :class="{ 'light-mode': isLightMode }">
    <div class="container">
      <h2 class="section-title">{{ content.title }}</h2>
      <p class="section-subtitle">{{ content.subtitle }}</p>

      <div class="cta-grid">
        <div
          v-for="(card, index) in content.cards"
          :key="index"
          class="cta-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card-icon">{{ card.icon }}</div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
          <a :href="card.link" class="card-button">
            {{ card.buttonText }}
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CTACard } from "../../locales/homepage/types";

defineProps<{
  content: {
    title: string;
    subtitle: string;
    cards: CTACard[];
  };
  isLightMode: boolean;
}>();
</script>

<style scoped lang="scss">
.cta-section {
  position: relative;
  padding: 100px 0 80px;
  background: transparent;
  overflow: visible;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 1000px;
    background: radial-gradient(
      circle,
      rgba(71, 202, 255, 0.08) 0%,
      transparent 70%
    );
    filter: blur(60px);
    animation: bgPulse 10s ease-in-out infinite;
    z-index: -1;
  }
}

@keyframes bgPulse {
  0%,
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 24px 0;
  padding: 20px;
  background: linear-gradient(120deg, #e0e7ff 0%, #bd34fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;

  .cta-section.light-mode & {
    background: linear-gradient(120deg, #1e40af 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.section-subtitle {
  font-size: 1.25rem;
  color: #b0bac9;
  text-align: center;
  margin: 0 0 56px 0;
  line-height: 1.6;

  .cta-section.light-mode & {
    color: #334155;
  }
}

.cta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.cta-card {
  position: relative;
  padding: 48px 32px;
  background: rgba(26, 35, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 2px solid transparent;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
  overflow: visible;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(
      135deg,
      rgba(189, 52, 254, 0.5),
      transparent 40%,
      transparent 60%,
      rgba(71, 202, 255, 0.5)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(71, 202, 255, 0.15) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: translateY(-16px) scale(1.05);
    border-color: rgba(71, 202, 255, 0.5);
    box-shadow: 0 28px 72px rgba(71, 202, 255, 0.35);

    &::before,
    &::after {
      opacity: 1;
    }

    .card-icon {
      transform: scale(1.3) rotate(15deg);
      filter: drop-shadow(0 12px 24px rgba(71, 202, 255, 0.5));
    }

    .card-button {
      background: linear-gradient(135deg, #bd34fe, #47caff);
      color: white;
      transform: translateY(-6px);
      box-shadow: 0 8px 24px rgba(189, 52, 254, 0.4);

      .button-arrow {
        transform: translateX(10px);
      }
    }
  }

  // 日间模式
  .cta-section.light-mode & {
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid rgba(71, 202, 255, 0.2);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

    &:hover {
      border-color: rgba(71, 202, 255, 0.5);
      box-shadow: 0 28px 72px rgba(71, 202, 255, 0.25);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-icon {
  font-size: 4rem;
  margin: 0 0 24px 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #e0e7ff;
  margin: 0 0 16px 0;

  .cta-section.light-mode & {
    color: #000000;
  }
}

.card-description {
  font-size: 1.0625rem;
  color: #b0bac9;
  line-height: 1.6;
  margin: 0 0 32px 0;

  .cta-section.light-mode & {
    color: #334155;
  }
}

.card-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  background: rgba(71, 202, 255, 0.1);
  border: 2px solid #47caff;
  border-radius: 12px;
  color: #47caff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;

  .button-arrow {
    font-size: 1.25rem;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .cta-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .cta-card:last-child {
    grid-column: 1 / -1;
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 80px 0;
  }

  .cta-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 48px;
  }

  .cta-card {
    padding: 40px 24px;

    &:last-child {
      grid-column: auto;
      max-width: 100%;
    }
  }

  .card-icon {
    font-size: 3rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
