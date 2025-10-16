<style scoped lang="scss">
.more-project-btn {
  user-select: none;
  width: 160px;
  height: 45px;
  border-radius: 40px;
  background: linear-gradient(135deg, #47caff, #bd34fe);
  margin: 0 auto;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(71, 202, 255, 0.35),
    0 2px 6px rgba(189, 52, 254, 0.18);
  transition: transform 180ms ease, box-shadow 220ms ease, filter 220ms ease;

  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 10px 18px rgba(71, 202, 255, 0.42),
      0 4px 10px rgba(189, 52, 254, 0.22);
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 4px 10px rgba(71, 202, 255, 0.3),
      0 2px 6px rgba(189, 52, 254, 0.16);
    filter: brightness(0.98);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.32),
      transparent
    );
    transform: skewX(-20deg);
    animation: shine 2.4s ease-in-out infinite;
    opacity: 0.8;
    pointer-events: none;
  }

  @keyframes shine {
    0% {
      left: -150%;
    }
    60% {
      left: 150%;
    }
    100% {
      left: 150%;
    }
  }

  .tip {
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 0.2px;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
      filter: none;
      box-shadow: 0 6px 14px rgba(71, 202, 255, 0.35),
        0 2px 6px rgba(189, 52, 254, 0.18);
    }

    &::after {
      animation: none;
      display: none;
    }
  }
}
</style>

<template>
  <div
    class="more-project-btn"
    @click="Router.open(`/community/projects`, false)"
  >
    <div class="tip">{{ lang == "zh" ? "更多项目" : "Find More" }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  lang: {
    type: String,
    default: "zh",
  },
});

import { Router } from "./utils/route";
</script>
