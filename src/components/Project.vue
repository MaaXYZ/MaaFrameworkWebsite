<style scoped lang="scss">
.project {
  user-select: none;
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px) saturate(1.2);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.13),
    0 1.5px 8px 0 rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s cubic-bezier(0.4, 2, 0.6, 1),
    transform 0.15s cubic-bezier(0.4, 2, 0.6, 1), background 0.3s;
  background-image: linear-gradient(
    135deg,
    rgba(#47caff, 0.1) 50%,
    rgba(#bd34fe, 0.06) 100%
  );
  cursor: pointer;

  html.dark & {
    background: rgba(17, 24, 39, 0.7); // 深色背景
    background-image: linear-gradient(
      135deg,
      rgba(#47caff, 0.05) 50%,
      rgba(#bd34fe, 0.03) 100%
    );
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.3),
      0 1.5px 8px 0 rgba(0, 0, 0, 0.2);
  }

  &:hover {
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18),
      0 3px 16px 0 rgba(0, 0, 0, 0.12);
    transform: translateY(-4px) scale(1.012);
    background-image: linear-gradient(
      135deg,
      rgba(#47caff, 0.06) 50%,
      rgba(#bd34fe, 0.04) 100%
    );

    html.dark & {
      background-image: linear-gradient(
        135deg,
        rgba(#47caff, 0.03) 50%,
        rgba(#bd34fe, 0.02) 100%
      );
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4),
        0 3px 16px 0 rgba(0, 0, 0, 0.3);
    }

    .logo {
      img {
        transform: scale(1.13) rotate(-6deg);
      }
    }
  }

  &:active {
    transform: scale(0.98);
  }

  .alink {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .head {
    display: flex;

    .logo {
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.35s cubic-bezier(0.4, 2, 0.6, 1);

      img {
        width: 100%;
        object-fit: contain;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: transform 0.35s cubic-bezier(0.4, 2, 0.6, 1);
      }

      &:hover img {
        transform: scale(1.13) rotate(-6deg);
      }
    }

    .right {
      flex: 1;
      margin-left: 20px;

      .title {
        margin-top: 4px;
        max-width: 84%;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #222e3a;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        overflow-wrap: anywhere;
        word-break: break-word;
        hyphens: auto;

        html.dark & {
          color: #e0e7ff;
        }
      }

      .stack {
        display: flex;
        gap: 8px;
        margin-top: 2px;

        .stack-item {
          margin-top: 8px;
          height: 28px;
          padding: 2px 12px;
          border-radius: 50px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          opacity: 0.92;
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.4, 2, 0.6, 1),
            box-shadow 0.22s, opacity 0.22s;

          .icon {
            height: 18px;
            width: 18px;

            img {
              height: 100%;
            }
          }

          .label {
            margin: 0 6px;
            color: white;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 0.2px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          &:hover {
            opacity: 1;
            transform: scale(1.11) translateY(-2px);
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.22);
            filter: brightness(1.08) saturate(1.2);
          }
        }
      }
    }
  }

  .desc {
    font-size: 16px;
    margin-top: 14px;
    color: #3a4a5a;
    line-height: 1.7;
    letter-spacing: 0.1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    transition: color 0.2s;

    html.dark & {
      color: #b0bac9;
    }
  }

  .link {
    position: absolute;
    width: 22px;
    right: 24px;
    top: 26px;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.4, 2, 0.6, 1), filter 0.22s;

    img {
      width: 100%;
      transition: filter 0.22s;
    }

    &:hover {
      transform: rotate(-18deg) scale(1.18);
      filter: brightness(1.2) drop-shadow(0 2px 6px #7ed0ff88);
    }

    html.dark & {
      img {
        filter: brightness(0) invert(1);
      }
    }
  }
}

@media (max-width: 580px) {
  .project {
    .head {
      .logo {
        margin: 0 auto;
      }

      .right {
        display: none;
      }
    }

    .desc {
      display: none;
    }

    .link {
      display: none;
    }

    .phone {
      display: flow-root !important;

      .title {
        text-align: center;
        margin-top: 12px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #222e3a;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        overflow-wrap: anywhere;
        word-break: break-word;
        hyphens: auto;

        html.dark & {
          color: #e0e7ff; // 浅色文字
        }
      }

      .stack {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .stack-item {
          margin-top: 8px;
          height: 28px;
          padding: 2px 12px;
          border-radius: 50px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          opacity: 0.92;
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.4, 2, 0.6, 1),
            box-shadow 0.22s, opacity 0.22s;

          .icon {
            height: 18px;
            width: 18px;

            img {
              height: 100%;
            }
          }

          .label {
            margin: 0 6px;
            color: white;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 0.2px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="project" @click="Router.open(link, true)">
    <a class="alink" :href="link"></a>
    <div class="head">
      <div class="logo">
        <img :src="logo" />
      </div>
      <div class="right">
        <div class="title">{{ title }}</div>
        <div class="stack">
          <div
            v-for="item in stack"
            class="stack-item"
            :style="{ backgroundColor: badges[item].bgColor }"
          >
            <div class="icon">
              <img :src="badges[item].icon" />
            </div>
            <div class="label">{{ badges[item].label }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="desc">{{ desc }}</div>
    <div class="link">
      <img :src="icons.Share" />
    </div>
    <div class="phone" style="display: none">
      <div class="title">{{ title }}</div>
      <div class="stack">
        <div
          v-for="item in stack"
          class="stack-item"
          :style="{ backgroundColor: badges[item].bgColor }"
        >
          <div class="icon">
            <img :src="badges[item].icon" />
          </div>
          <div class="label">{{ badges[item].label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  stack: {
    type: Array as () => Stack[],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

import { Router } from "./utils/route";
import { Stack } from "../assets/types/Stack";
import badges from "../assets/data/badges";
import icons from "../assets/icons/icons";
</script>
