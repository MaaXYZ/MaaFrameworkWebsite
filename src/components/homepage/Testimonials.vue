<template>
  <section class="testimonials" :class="{ 'light-mode': isLightMode }">
    <div class="container">
      <h2 class="section-title">{{ content.title }}</h2>
      <p class="section-subtitle">{{ content.subtitle }}</p>

      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in content.items"
          :key="index"
          class="testimonial-card"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="testimonial-header">
            <div class="avatar">
              <img
                v-if="isImagePath(testimonial.avatar)"
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="avatar-img"
              />
              <span v-else class="avatar-text">{{ testimonial.avatar }}</span>
            </div>
            <div class="author-info">
              <h4 class="author-name">{{ testimonial.name }}</h4>
              <p class="author-role">{{ testimonial.role }}</p>
            </div>
          </div>
          <div class="testimonial-content">
            <div class="quote-icon">"</div>
            <p class="testimonial-text">{{ testimonial.content }}</p>
          </div>
          <div class="testimonial-footer">
            <div class="rating">
              <img
                v-for="i in 5"
                :key="i"
                class="star"
                src="../../assets/icons/star.svg"
                alt="star"
              />
            </div>
            <span class="project-tag">{{ testimonial.project }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Testimonial } from "../../locales/homepage/types";

defineProps<{
  content: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  isLightMode: boolean;
}>();

// 判断是否为图片路径
const isImagePath = (value: string): boolean => {
  return (
    value.startsWith("/") ||
    value.startsWith("data:") ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value)
  );
};
</script>

<style scoped lang="scss">
.testimonials {
  position: relative;
  padding: 100px 0;
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
  margin: 0 0 16px 0;
  padding: 20px;
  background: linear-gradient(120deg, #e0e7ff 0%, #47caff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;

  .testimonials.light-mode & {
    background: linear-gradient(120deg, #1e40af 0%, #0284c7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.section-subtitle {
  font-size: 1.125rem;
  color: #b0bac9;
  text-align: center;
  margin: 0 0 60px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  .testimonials.light-mode & {
    color: #334155;
  }
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
}

.testimonial-card {
  position: relative;
  padding: 32px;
  background: rgba(26, 35, 50, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(71, 202, 255, 0.15);
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
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(189, 52, 254, 0.3),
      transparent 50%,
      rgba(71, 202, 255, 0.3)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(71, 202, 255, 0.4);
    box-shadow: 0 16px 40px rgba(71, 202, 255, 0.2);

    &::before {
      opacity: 1;
    }

    .avatar {
      transform: scale(1.1);
      box-shadow: 0 8px 24px rgba(189, 52, 254, 0.4);
    }
  }

  // 日间模式
  .testimonials.light-mode & {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(71, 202, 255, 0.25);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

    &:hover {
      box-shadow: 0 16px 40px rgba(71, 202, 255, 0.2);
      border-color: rgba(71, 202, 255, 0.4);
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

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #bd34fe, #47caff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0px 16px rgba(189, 52, 254, 0.3);
  overflow: hidden;

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e0e7ff;
  margin: 0 0 4px 0;

  .testimonials.light-mode & {
    color: #000000;
  }
}

.author-role {
  font-size: 0.9rem;
  color: #8b95a8;
  margin: 0;

  .testimonials.light-mode & {
    color: #64748b;
  }
}

.testimonial-content {
  position: relative;
  margin-bottom: 20px;

  .quote-icon {
    position: absolute;
    top: -10px;
    left: -10px;
    font-size: 4rem;
    font-family: Georgia, serif;
    color: rgba(71, 202, 255, 0.15);
    line-height: 1;
    pointer-events: none;
  }
}

.testimonial-text {
  position: relative;
  font-size: 1rem;
  color: #b0bac9;
  line-height: 1.7;
  margin: 0;
  padding-left: 8px;

  .testimonials.light-mode & {
    color: #334155;
  }
}

.testimonial-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(71, 202, 255, 0.1);
}

.rating {
  display: flex;
  gap: 4px;

  .star {
    width: 1rem;
    height: 1rem;
    filter: drop-shadow(0 2px 4px rgba(255, 200, 0, 0.3));
  }
}

.project-tag {
  font-size: 0.875rem;
  color: #47caff;
  background: rgba(71, 202, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid rgba(71, 202, 255, 0.3);
}

@media (max-width: 768px) {
  .testimonials {
    padding: 60px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .testimonial-card {
    padding: 24px;
  }
}
</style>
