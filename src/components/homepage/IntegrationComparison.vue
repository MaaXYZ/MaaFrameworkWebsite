<template>
  <section
    class="integration-comparison"
    :class="{ 'light-mode': isLightMode }"
  >
    <div class="container">
      <h2 class="section-title">{{ content.title }}</h2>
      <p class="section-subtitle">{{ content.subtitle }}</p>

      <div class="comparison-tabs">
        <button
          v-for="(item, index) in content.items"
          :key="item.id"
          :class="[
            'tab-button',
            { active: activeTab === index, recommended: item.recommended },
          ]"
          @click="activeTab = index"
        >
          <span class="tab-name">{{ item.name }}</span>
          <span v-if="item.recommended" class="tab-badge">{{
            content.labels.recommended
          }}</span>
        </button>
      </div>

      <div class="comparison-content">
        <div
          v-for="(item, index) in content.items"
          :key="item.id"
          v-show="activeTab === index"
          class="content-panel"
        >
          <div class="panel-grid">
            <div class="panel-left">
              <div class="info-section">
                <h3 class="info-title">{{ content.labels.scenario }}</h3>
                <p class="info-text">{{ item.scenario }}</p>
              </div>

              <div class="info-section">
                <h3 class="info-title">{{ content.labels.advantages }}</h3>
                <ul class="advantages-list">
                  <li
                    v-for="(advantage, aIndex) in item.advantages"
                    :key="aIndex"
                  >
                    <span class="advantage-icon">
                      <span class="check-mark">✓</span>
                    </span>
                    {{ advantage }}
                  </li>
                </ul>
              </div>

              <div v-if="item.resources" class="info-section">
                <h3 class="info-title">{{ content.labels.resources }}</h3>
                <div class="resources-links">
                  <a
                    v-for="(resource, rIndex) in item.resources"
                    :key="rIndex"
                    :href="resource.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="resource-link"
                  >
                    <div class="resource-item">
                      <img
                        v-if="resource.icon && emojis[resource.icon]"
                        :src="emojis[resource.icon]"
                        :alt="resource.icon"
                        class="resource-icon"
                      />
                      {{ resource.label }}
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div class="panel-right">
              <div
                v-if="item.codeExample.image"
                class="image-example"
                @mousemove="handleImageMouseMove"
                @mouseleave="handleImageMouseLeave"
              >
                <img :src="item.codeExample.image" :alt="item.name" />
              </div>
              <div
                v-else
                class="code-example"
                @mousemove="handleCodeMouseMove"
                @mouseleave="handleCodeMouseLeave"
              >
                <div class="code-header">
                  <span class="code-language">{{
                    item.codeExample.language
                  }}</span>
                  <div class="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div class="code-body" v-html="highlightedCode[item.id]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Integration } from "../../locales/homepage/types";
import { codeToHtml } from "shiki";
import { emojis } from "../../assets/emojis/emojis";

const activeTab = ref(1);
const highlightedCode = ref<{ [key: string]: string }>({});

const props = defineProps<{
  content: {
    title: string;
    subtitle: string;
    items: Integration[];
    comparison: {
      dimensions: string[];
    };
    labels: {
      recommended: string;
      scenario: string;
      advantages: string;
      resources: string;
    };
  };
  isLightMode: boolean;
}>();

const highlightCode = async () => {
  const highlighted: { [key: string]: string } = {};
  for (const item of props.content.items) {
    if (item.codeExample.code) {
      try {
        const html = await codeToHtml(item.codeExample.code, {
          lang: item.codeExample.language.toLowerCase(),
          theme: "github-dark",
        });
        highlighted[item.id] = html;
      } catch (error) {
        console.error(`Failed to highlight code for ${item.id}:`, error);
        highlighted[
          item.id
        ] = `<pre><code>${item.codeExample.code}</code></pre>`;
      }
    }
  }
  highlightedCode.value = highlighted;
};

onMounted(() => {
  highlightCode();
});

const handleImageMouseMove = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement;

  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const deltaX = (x - centerX) / centerX;
  const deltaY = (y - centerY) / centerY;

  const rotateX = -deltaY * 8;
  const rotateY = deltaX * 8;

  container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleImageMouseLeave = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement;

  container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
};

const handleCodeMouseMove = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement;

  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const deltaX = (x - centerX) / centerX;
  const deltaY = (y - centerY) / centerY;

  const rotateX = -deltaY * 8;
  const rotateY = deltaX * 8;

  container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleCodeMouseLeave = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement;

  container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
};
</script>

<style scoped lang="scss">
.integration-comparison {
  position: relative;
  padding: 100px 0 80px;
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
  margin: 0 0 24px 0;
  padding: 20px;
  background: linear-gradient(120deg, #e0e7ff 0%, #bd34fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;

  .integration-comparison.light-mode & {
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
  margin: 0 0 48px 0;
  line-height: 1.6;

  .integration-comparison.light-mode & {
    color: #334155;
  }
}

.comparison-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  justify-content: center;
  flex-wrap: wrap;
}

.tab-button {
  position: relative;
  padding: 16px 28px;
  background: rgba(26, 35, 50, 0.4);
  border: 2px solid rgba(71, 202, 255, 0.2);
  border-radius: 12px;
  color: #b0bac9;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  line-height: 1.5;
  text-align: center;
  contain: layout style paint;
  will-change: transform;

  &:hover {
    border-color: rgba(71, 202, 255, 0.5);
    background: rgba(26, 35, 50, 0.6);
    transform: translateY(-2px);
  }

  &.active {
    background: linear-gradient(
      135deg,
      rgba(189, 52, 254, 0.3),
      rgba(71, 202, 255, 0.3)
    );
    border-color: #47caff;
    color: #e0e7ff;
    box-shadow: 0 8px 24px rgba(71, 202, 255, 0.3);
  }

  &.recommended {
    .tab-badge {
      padding: 4px 12px;
      background: linear-gradient(135deg, #bd34fe, #47caff);
      border-radius: 20px;
      font-size: 0.75rem;
      color: white;
      font-weight: 700;
      animation: badgePulse 2s ease-in-out infinite;
    }
  }

  // 日间模式
  .integration-comparison.light-mode & {
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(71, 202, 255, 0.25);
    color: #475569;

    &:hover {
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(71, 202, 255, 0.4);
    }

    &.active {
      background: linear-gradient(
        135deg,
        rgba(189, 52, 254, 0.15),
        rgba(71, 202, 255, 0.15)
      );
      color: #0f172a;
      border-color: #47caff;
    }
  }
}

@keyframes badgePulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(189, 52, 254, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(189, 52, 254, 0);
  }
}

.comparison-content {
  position: relative;
  min-height: 500px;
}

.content-panel {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.5fr;
  gap: 48px;
}

.panel-left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-section {
  .info-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e0e7ff;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
      content: "";
      width: 4px;
      height: 24px;
      background: linear-gradient(180deg, #bd34fe, #47caff);
      border-radius: 2px;
    }

    .integration-comparison.light-mode & {
      color: #000000;
    }
  }

  .info-text {
    font-size: 1.125rem;
    color: #b0bac9;
    line-height: 1.8;
    margin: 0;

    .integration-comparison.light-mode & {
      color: #334155;
    }
  }
}

.advantages-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    font-size: 1.0625rem;
    color: #b0bac9;
    line-height: 1.6;

    .advantage-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #bd34fe, #47caff);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .check-mark {
        color: white;
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
      }
    }

    .integration-comparison.light-mode & {
      color: #334155;
    }
  }
}

.resources-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  .resource-link {
    padding: 10px 20px;
    background: rgba(71, 202, 255, 0.1);
    border: 1px solid rgba(71, 202, 255, 0.3);
    border-radius: 8px;
    color: #47caff;
    text-decoration: none;
    font-size: 0.9375rem;
    font-weight: 500;
    transition: all 0.3s;

    &:hover {
      background: rgba(71, 202, 255, 0.2);
      border-color: #47caff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(71, 202, 255, 0.3);
    }
  }
}

.panel-right {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(
      circle at center,
      rgba(71, 202, 255, 0.15) 0%,
      transparent 70%
    );
    filter: blur(30px);
    animation: glowPulse 5s ease-in-out infinite;
    z-index: -1;
  }
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

.image-example {
  width: 100%;
  max-height: 500px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(71, 202, 255, 0.3);
  position: relative;
  animation: codeGlow 5s ease-in-out infinite;
  border: 1px solid rgba(71, 202, 255, 0.3);
  background: rgba(10, 14, 26, 0.6);
  padding: 10px;

  // 3D 变换属性
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  will-change: transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 8px;
  }

  .integration-comparison.light-mode & {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(71, 202, 255, 0.4);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 0 40px rgba(71, 202, 255, 0.2);
  }
}

.code-example {
  background: rgba(10, 14, 26, 0.8);
  border: 1px solid rgba(71, 202, 255, 0.3);
  border-radius: 16px;
  overflow: hidden;
  max-height: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(71, 202, 255, 0.3),
    inset 0 0 40px rgba(71, 202, 255, 0.05);
  position: relative;
  animation: codeGlow 5s ease-in-out infinite;

  // 3D 变换属性
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  will-change: transform;

  .integration-comparison.light-mode & {
    background: rgba(10, 14, 26, 0.82);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(189, 52, 254, 0.1) 0%,
      transparent 50%,
      rgba(71, 202, 255, 0.1) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  .code-header {
    padding: 16px 24px;
    background: rgba(26, 35, 50, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(71, 202, 255, 0.2);
    position: relative;
    z-index: 2;

    .code-language {
      font-size: 0.875rem;
      color: #47caff;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .code-dots {
      display: flex;
      gap: 8px;

      span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #bd34fe;

        &:nth-child(2) {
          background: #47caff;
        }

        &:nth-child(3) {
          background: #00ff88;
        }
      }
    }
  }

  .code-body {
    padding: 24px;
    max-height: 450px;
    overflow-y: auto;
    position: relative;
    z-index: 2;

    :deep(pre) {
      margin: 0;
      font-family: "Fira Code", "Consolas", monospace;
      font-size: 0.9375rem;
      line-height: 1.7;
      background: transparent !important;
      padding: 0 !important;

      code {
        white-space: pre;
        background: transparent !important;
        font-family: "Fira Code", "Consolas", monospace;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(26, 35, 50, 0.4);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(71, 202, 255, 0.4);
      border-radius: 4px;

      &:hover {
        background: rgba(71, 202, 255, 0.6);
      }
    }
  }
}

@keyframes codeGlow {
  0%,
  100% {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(71, 202, 255, 0.3),
      inset 0 0 40px rgba(71, 202, 255, 0.05);
  }
  50% {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(189, 52, 254, 0.5),
      inset 0 0 60px rgba(189, 52, 254, 0.08);
  }
}

@media (max-width: 1024px) {
  .panel-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .integration-comparison {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .comparison-tabs {
    flex-direction: column;
  }

  .tab-button {
    width: 100%;
    justify-content: center;
    padding: 14px 20px;
    line-height: 1.5;
  }

  .code-example .code-body {
    padding: 16px;

    :deep(pre) {
      font-size: 0.8125rem;
    }
  }
}

.resource-item {
  display: flex;
  align-items: center;
  line-height: 1;
}

.resource-icon {
  width: 1em;
  height: 1em;
  margin-right: 4px;
  vertical-align: middle;
}

.resource-label {
  font-size: 14px;
  vertical-align: middle;
}
</style>
