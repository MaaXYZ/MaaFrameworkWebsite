<template>
  <footer class="footer-section" :class="{ 'light-mode': isLightMode }">
    <div class="footer-divider"></div>

    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="footer-logo">
            <h3>{{ content.about.title }}</h3>
          </div>
          <p class="footer-description">{{ content.about.description }}</p>
          <div class="social-links">
            <a
              href="https://github.com/MaaXYZ/MaaFramework"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="GitHub"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div
          v-for="(column, index) in content.columns"
          :key="index"
          class="footer-column"
        >
          <h4 class="column-title">{{ column.title }}</h4>
          <ul class="column-links">
            <li v-for="(link, lIndex) in column.links" :key="lIndex">
              <a :href="link.link" class="footer-link">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">{{ content.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterColumn } from "../../locales/homepage/types";

defineProps<{
  content: {
    about: {
      title: string;
      description: string;
    };
    columns: FooterColumn[];
    copyright: string;
  };
  isLightMode: boolean;
}>();
</script>

<style scoped lang="scss">
.footer-section {
  position: relative;
  background: transparent;
  padding: 100px 0 40px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(71, 202, 255, 0.6) 50%,
      transparent 100%
    );
    box-shadow: 0 0 30px rgba(71, 202, 255, 0.4);
  }
}

.footer-divider {
  display: none;
}

.container {
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footer-about {
  .footer-logo {
    margin-bottom: 20px;

    h3 {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0;
      background: linear-gradient(120deg, #bd34fe, #47caff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .footer-description {
    font-size: 1rem;
    color: #b0bac9;
    line-height: 1.7;
    margin: 0 0 24px 0;

    .footer-section.light-mode & {
      color: #334155;
    }
  }
}

.social-links {
  display: flex;
  gap: 16px;

  .social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(71, 202, 255, 0.1);
    border-radius: 10px;
    color: #47caff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: rgba(71, 202, 255, 0.2);
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(71, 202, 255, 0.3);
    }

    svg {
      width: 20px;
      height: 20px;
    }

    // 日间模式
    .footer-section.light-mode & {
      background: rgba(0, 0, 0, 0.05);
      color: #000000;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

.footer-column {
  .column-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #e0e7ff;
    margin: 0 0 20px 0;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #bd34fe, #47caff);
    }

    .footer-section.light-mode & {
      color: #000000;
    }
  }

  .column-links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 12px;
    }
  }

  .footer-link {
    color: #8b95a8;
    text-decoration: none;
    font-size: 0.9375rem;
    transition: all 0.3s;
    display: inline-block;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: linear-gradient(90deg, #bd34fe, #47caff);
      transition: width 0.3s;
    }

    &:hover {
      color: #47caff;
      transform: translateX(4px);

      &::after {
        width: 100%;
      }
    }

    .footer-section.light-mode & {
      color: #64748b;

      &:hover {
        color: #2563eb;
      }
    }
  }
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid rgba(71, 202, 255, 0.1);

  .copyright {
    text-align: center;
    color: #6b7585;
    font-size: 0.875rem;
    margin: 0;

    .footer-section.light-mode & {
      color: #64748b;
    }
  }
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .footer-about {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 60px 0 30px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }

  .footer-about {
    grid-column: auto;
    text-align: center;

    .footer-logo h3 {
      font-size: 1.5rem;
    }
  }

  .social-links {
    justify-content: center;
  }

  .footer-column {
    text-align: center;

    .column-title::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .footer-bottom {
    padding-top: 30px;

    .copyright {
      font-size: 0.8125rem;
    }
  }
}
</style>
