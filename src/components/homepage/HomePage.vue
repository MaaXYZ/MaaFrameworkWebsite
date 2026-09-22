<template>
    <div class="homepage-container" :class="{ 'light-mode': isLightMode }" :data-motion="motionEnabled ? 'on' : 'off'">
        <!-- 全局背景效果 -->
        <div class="global-background">
            <div class="grid-overlay"></div>
            <div class="glow-effect glow-1"></div>
            <div class="glow-effect glow-2"></div>
            <div class="glow-effect glow-3"></div>
            <canvas ref="particlesCanvas" class="particles-canvas"></canvas>
        </div>

        <nav class="homepage-nav" :class="{ scrolled: isScrolled, 'light-mode': isLightMode }">
            <div class="nav-content">
                <a href="/" class="nav-logo">
                    <img src="/maafw.png" alt="MaaFramework Logo" class="logo-icon" fetchpriority="high"
                        loading="eager" />
                    <span class="logo-text">MaaFramework</span>
                </a>
                <!-- 桌面端导航链接 -->
                <div class="nav-links desktop-nav">
                    <!-- 主题切换按钮 -->
                    <button class="theme-toggle" @click="toggleTheme" :aria-label="isLightMode ? '切换到暗色模式' : '切换到亮色模式'
                        ">
                        <div class="toggle-track">
                            <div class="toggle-thumb" :class="{ active: !isLightMode }">
                                <svg v-if="isLightMode" class="icon" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
                                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" />
                                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <svg v-else class="icon" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <!-- 语言切换按钮 -->
                    <button class="lang-toggle" @click="toggleLanguage" :aria-label="lang === 'zh' ? 'Switch to English' : '切换到中文'
                        ">
                        <svg class="lang-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M893.44 919.04c-20.48 2.56-38.4-12.8-38.4-30.72v-148.48c0-38.4-25.6-38.4-35.84-38.4-25.6 0-43.52 17.92-46.08 43.52V883.2c0 20.48-17.92 38.4-40.96 38.4-20.48 0-35.84-17.92-38.4-38.4v-212.48c-2.56-20.48 12.8-35.84 33.28-38.4h5.12c15.36 0 28.16 7.68 35.84 20.48 17.92-12.8 40.96-20.48 64-20.48 61.44 0 99.84 38.4 99.84 102.4v148.48c0 10.24-2.56 20.48-10.24 28.16-7.68 2.56-17.92 7.68-28.16 7.68z m-268.8-10.24h-153.6c-48.64 0-71.68-20.48-71.68-69.12v-217.6c0-48.64 23.04-69.12 71.68-69.12h148.48c20.48 0 38.4 15.36 38.4 35.84 0 20.48-17.92 35.84-38.4 35.84h-138.24V691.2h120.32c17.92-2.56 35.84 12.8 38.4 30.72v5.12c0 17.92-12.8 35.84-33.28 35.84h-125.44V834.56h145.92c20.48 0 35.84 12.8 38.4 33.28v5.12c2.56 17.92-12.8 35.84-30.72 38.4-5.12-2.56-7.68-2.56-10.24-2.56zM299.52 478.72c-20.48 2.56-38.4-10.24-40.96-30.72v-97.28H158.72c-53.76 0-76.8-23.04-76.8-76.8V166.4c0-51.2 23.04-74.24 76.8-74.24H256V56.32c-2.56-20.48 12.8-35.84 33.28-38.4h7.68c35.84 0 40.96 20.48 40.96 38.4v35.84h99.84c53.76 0 76.8 23.04 76.8 74.24v107.52c0 51.2-23.04 76.8-76.8 76.8h-99.84v89.6c2.56 20.48-12.8 38.4-33.28 38.4h-5.12z m-128-309.76c-7.68 0-7.68 0-7.68 7.68v89.6c0 7.68 0 7.68 7.68 7.68H256V168.96H171.52z m166.4 104.96h87.04c7.68 0 7.68 0 7.68-7.68V176.64c0-7.68 0-7.68-7.68-7.68h-87.04v104.96zM512 1024C227.84 1024 0 793.6 0 509.44c0-40.96 5.12-79.36 15.36-117.76 5.12-20.48 28.16-35.84 48.64-30.72 23.04 5.12 35.84 28.16 30.72 48.64-56.32 230.4 87.04 463.36 317.44 519.68 33.28 7.68 66.56 12.8 99.84 12.8 23.04 0 40.96 17.92 40.96 40.96 0 23.04-17.92 40.96-40.96 40.96z m455.68-353.28c-23.04 0-40.96-17.92-40.96-40.96v-10.24C985.6 389.12 844.8 153.6 614.4 94.72c-33.28-7.68-69.12-12.8-104.96-12.8-23.04 0-40.96-17.92-40.96-40.96 2.56-23.04 20.48-40.96 43.52-40.96 284.16 0 512 230.4 512 514.56 0 40.96-5.12 84.48-15.36 125.44-5.12 17.92-20.48 30.72-40.96 30.72z m0 0"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <a :href="lang === 'zh'
                        ? '/docs/1.1-QuickStarted'
                        : '/en/docs/1.1-QuickStarted'
                        " class="nav-link">{{ lang === "zh" ? "文档" : "Docs" }}</a>
                    <a :href="lang === 'zh'
                        ? '/community/projects'
                        : '/en/community/projects'
                        " class="nav-link">{{ lang === "zh" ? "社区" : "Community" }}</a>
                    <a href="https://deepwiki.com/MaaXYZ/MaaFramework" target="_blank" rel="noopener noreferrer"
                        class="nav-link ai-link">{{ lang === "zh" ? "问 AI" : "Ask AI" }}</a>
                    <a href="https://hub.maafw.com/" target="_blank" rel="noopener noreferrer"
                        class="nav-link">MaaHub</a>
                    <a href="https://github.com/MaaXYZ/MaaFramework" target="_blank" rel="noopener noreferrer"
                        class="nav-link">GitHub</a>
                </div>
                <!-- 移动端汉堡菜单按钮 -->
                <button class="hamburger-btn" :class="{ active: isMobileMenuOpen }" @click="toggleMobileMenu"
                    aria-label="菜单">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </nav>

        <!-- 移动端菜单（独立于 nav） -->
        <div class="mobile-menu" :class="{ open: isMobileMenuOpen, 'light-mode': isLightMode }">
            <!-- 背景装饰 -->
            <div class="mobile-menu-bg">
                <div class="mobile-glow mobile-glow-1"></div>
                <div class="mobile-glow mobile-glow-2"></div>
                <div class="mobile-grid-overlay"></div>
            </div>
            <button class="mobile-close-btn" @click="closeMobileMenu" aria-label="关闭菜单">
                <span class="close-line"></span>
                <span class="close-line"></span>
            </button>
            <div class="mobile-menu-content">
                <div class="mobile-menu-logo">
                    <img src="/maafw.png" alt="MaaFramework" class="mobile-logo-img" />
                </div>
                <nav class="mobile-nav-links">
                    <a :href="lang === 'zh' ? '/docs/1.1-QuickStarted' : '/en/docs/1.1-QuickStarted'"
                        class="mobile-nav-link" @click="closeMobileMenu" :style="{ '--delay': '0.1s' }">
                        <span class="link-icon">📖</span>
                        <span class="link-text">{{ lang === "zh" ? "文档" : "Docs" }}</span>
                    </a>
                    <a :href="lang === 'zh' ? '/community/projects' : '/en/community/projects'" class="mobile-nav-link"
                        @click="closeMobileMenu" :style="{ '--delay': '0.15s' }">
                        <span class="link-icon">👥</span>
                        <span class="link-text">{{ lang === "zh" ? "社区" : "Community" }}</span>
                    </a>
                    <a href="https://deepwiki.com/MaaXYZ/MaaFramework" target="_blank" rel="noopener noreferrer"
                        class="mobile-nav-link" @click="closeMobileMenu" :style="{ '--delay': '0.2s' }">
                        <span class="link-icon">🤖</span>
                        <span class="link-text">{{ lang === "zh" ? "问 AI" : "Ask AI" }}</span>
                    </a>
                    <a href="https://hub.maafw.com/" target="_blank" rel="noopener noreferrer"
                        class="mobile-nav-link" @click="closeMobileMenu" :style="{ '--delay': '0.25s' }">
                        <span class="link-icon">🌐</span>
                        <span class="link-text">MaaHub</span>
                    </a>
                    <a href="https://github.com/MaaXYZ/MaaFramework" target="_blank" rel="noopener noreferrer"
                        class="mobile-nav-link" @click="closeMobileMenu" :style="{ '--delay': '0.3s' }">
                        <span class="link-icon">⭐</span>
                        <span class="link-text">GitHub</span>
                    </a>
                </nav>
                <div class="mobile-menu-divider"></div>
                <div class="mobile-menu-actions">
                    <button class="mobile-action-btn" @click="toggleTheme"
                        :aria-label="isLightMode ? '切换到暗色模式' : '切换到亮色模式'">
                        <div class="action-icon">
                            <svg v-if="isLightMode" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
                                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
                            </svg>
                            <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span class="action-label">{{ isLightMode ? (lang === 'zh' ? '暗色' : 'Dark') : (lang === 'zh' ?
                            '亮色' : 'Light') }}</span>
                    </button>
                    <button class="mobile-action-btn" @click="toggleLanguage"
                        :aria-label="lang === 'zh' ? 'Switch to English' : '切换到中文'">
                        <div class="action-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                                <path
                                    d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                                    stroke="currentColor" stroke-width="2" />
                            </svg>
                        </div>
                        <span class="action-label">{{ lang === 'zh' ? 'EN' : '中文' }}</span>
                    </button>
                </div>
            </div>
        </div>

        <HeroSection :content="content.hero" :lang="lang" :is-light-mode="isLightMode" />
        <FeatureShowcase :content="content.features" :is-light-mode="isLightMode" />
        <IntegrationComparison :lang="lang" :content="content.integrations" :is-light-mode="isLightMode" />
        <Testimonials :content="content.testimonials" :is-light-mode="isLightMode" />
        <CommunityProjects :content="content.community" :lang="lang" :is-light-mode="isLightMode" />
        <CTASection :content="content.cta" :is-light-mode="isLightMode" />
        <FooterSection :content="content.footer" :is-light-mode="isLightMode" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, defineAsyncComponent, hydrateOnVisible } from "vue";
import { useData } from "vitepress";
import { zhContent, enContent } from "../../locales/homepage";
import HeroSection from "./HeroSection.vue";
import { providePageMotion } from "./composables/motion";
import { useParticles } from "./composables/particles";

// SSR keeps all content readable. Below-fold interactions hydrate near the viewport.
const FeatureShowcase = defineAsyncComponent({ loader: () => import("./FeatureShowcase.vue"), hydrate: hydrateOnVisible({ rootMargin: "300px" }) });
const IntegrationComparison = defineAsyncComponent({ loader: () => import("./IntegrationComparison.vue"), hydrate: hydrateOnVisible({ rootMargin: "300px" }) });
const Testimonials = defineAsyncComponent({ loader: () => import("./Testimonials.vue"), hydrate: hydrateOnVisible({ rootMargin: "300px" }) });
const CommunityProjects = defineAsyncComponent({ loader: () => import("./CommunityProjects.vue"), hydrate: hydrateOnVisible({ rootMargin: "300px" }) });
const CTASection = defineAsyncComponent({ loader: () => import("./CTASection.vue"), hydrate: hydrateOnVisible({ rootMargin: "300px" }) });
const FooterSection = defineAsyncComponent({ loader: () => import("./FooterSection.vue"), hydrate: hydrateOnVisible({ rootMargin: "300px" }) });

const props = defineProps<{ lang: "zh" | "en" }>();
const content = computed(() => props.lang === "zh" ? zhContent : enContent);
// Reuse VitePress's SSR-safe theme state and its storage/system-theme synchronization.
const { isDark } = useData();
// The first client render must match SSR; otherwise Vue can retain the server's
// light-mode classes when a stored dark preference is already active.
const themeReady = ref(false);
const isLightMode = computed(() => !themeReady.value || !isDark.value);
const toggleTheme = () => { isDark.value = !isDark.value; };
const toggleLanguage = () => { window.location.href = props.lang === "zh" ? "/en/" : "/"; };
const isScrolled = ref(false);
const particlesCanvas = ref<HTMLCanvasElement | null>(null);
const isMobileMenuOpen = ref(false);
const motionEnabled = providePageMotion();
useParticles(particlesCanvas, motionEnabled, isLightMode);

let previousOverflow = "";
const closeMobileMenu = () => {
    if (!isMobileMenuOpen.value) return;
    isMobileMenuOpen.value = false;
    document.body.style.overflow = previousOverflow;
};
const toggleMobileMenu = () => {
    if (isMobileMenuOpen.value) closeMobileMenu();
    else {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        isMobileMenuOpen.value = true;
    }
};
let scrollFrame = 0;
const updateScroll = () => {
    isScrolled.value = window.scrollY > 50;
    scrollFrame = 0;
};
const handleScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
};
onMounted(() => {
    themeReady.value = true;
    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
});
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    cancelAnimationFrame(scrollFrame);
    closeMobileMenu();
});
</script>

<style scoped lang="scss">
// Static fallbacks remain visible in SSR, on touch devices and with reduced motion.
.homepage-container[data-motion="off"] :deep(*),
.homepage-container[data-motion="off"] :deep(*::before),
.homepage-container[data-motion="off"] :deep(*::after),
.homepage-container :deep([data-motion="off"] *),
.homepage-container :deep([data-motion="off"] *::before),
.homepage-container :deep([data-motion="off"] *::after) {
    animation-play-state: paused !important;
}
@media (prefers-reduced-motion: reduce) {
    .homepage-container :deep(*), .homepage-container :deep(*::before), .homepage-container :deep(*::after) {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
    }
}

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
        background-image: linear-gradient(rgba(71, 202, 255, 0.08) 1px,
                transparent 1px),
            linear-gradient(90deg,
                rgba(71, 202, 255, 0.08) 1px,
                transparent 1px);
        background-size: 50px 50px;
        opacity: 0.4;
        transition: background-image 0.3s ease, opacity 0.3s ease;
    }

    .glow-effect {
        position: absolute;
        filter: blur(120px);
        transition: background 0.3s ease;

        &.glow-1 {
            top: -20%;
            right: -10%;
            width: 60%;
            height: 60%;
            background: radial-gradient(circle,
                    rgba(189, 52, 254, 0.25) 0%,
                    transparent 70%);
        }

        &.glow-2 {
            top: 30%;
            left: -15%;
            width: 50%;
            height: 50%;
            background: radial-gradient(circle,
                    rgba(71, 202, 255, 0.2) 0%,
                    transparent 70%);
            animation-delay: -5s;
        }

        &.glow-3 {
            bottom: 20%;
            right: 10%;
            width: 45%;
            height: 45%;
            background: radial-gradient(circle,
                    rgba(0, 255, 136, 0.15) 0%,
                    transparent 70%);
            animation-delay: -10s;
        }
    }

    // 日间模式背景
    .homepage-container.light-mode & {
        .grid-overlay {
            background-image: linear-gradient(rgba(71, 202, 255, 0.12) 1px,
                    transparent 1px),
                linear-gradient(90deg,
                    rgba(71, 202, 255, 0.12) 1px,
                    transparent 1px);
            opacity: 0.3;
        }

        .glow-effect {
            &.glow-1 {
                background: radial-gradient(circle,
                        rgba(189, 52, 254, 0.15) 0%,
                        transparent 70%);
            }

            &.glow-2 {
                background: radial-gradient(circle,
                        rgba(71, 202, 255, 0.12) 0%,
                        transparent 70%);
            }

            &.glow-3 {
                background: radial-gradient(circle,
                        rgba(0, 255, 136, 0.1) 0%,
                        transparent 70%);
            }
        }
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
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
            0 2px 8px rgba(71, 202, 255, 0.1);
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
    gap: 24px;
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
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #bd34fe, #47caff);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        color: #47caff;
        transform: translateY(-2px);

        &::after {
            transform: scaleX(1);
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
            background: linear-gradient(135deg,
                    rgba(189, 52, 254, 0.1),
                    rgba(71, 202, 255, 0.1));
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
            transform: translateX(28px);
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

.lang-toggle {
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

    .lang-icon {
        width: 24px;
        height: 24px;
        color: #b0bac9;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    &:hover .lang-icon {
        color: #47caff;
        filter: drop-shadow(0 4px 8px rgba(71, 202, 255, 0.4));
    }

    .homepage-nav.light-mode & {
        .lang-icon {
            color: #1e293b;
        }

        &:hover .lang-icon {
            color: #2563eb;
            filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3));
        }
    }
}

// 汉堡菜单按钮
.hamburger-btn {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;

    .hamburger-line {
        width: 24px;
        height: 2px;
        background: #b0bac9;
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 3px 0;
    }

    &.active {
        .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-line:nth-child(2) {
            opacity: 0;
        }

        .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }

    &:hover .hamburger-line {
        background: #47caff;
    }

    .homepage-nav.light-mode & {
        .hamburger-line {
            background: #1e293b;
        }

        &:hover .hamburger-line {
            background: #2563eb;
        }
    }
}

// 移动端菜单
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0d1225 100%);
    z-index: 1002;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;

    &.open {
        opacity: 1;
        visibility: visible;

        .mobile-nav-link {
            opacity: 1;
            transform: translateY(0);
        }

        .mobile-menu-logo {
            opacity: 1;
            transform: scale(1);
        }

        .mobile-menu-actions {
            opacity: 1;
            transform: translateY(0);
        }

        .mobile-glow {
            opacity: 1;
        }
    }

    &.light-mode {
        background: linear-gradient(135deg, #f8f9fa 0%, #e8f4ff 50%, #f0f7ff 100%);

        .mobile-grid-overlay {
            background-image:
                linear-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(37, 99, 235, 0.08) 1px, transparent 1px);
        }

        .mobile-glow-1 {
            background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
        }

        .mobile-glow-2 {
            background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
        }

        .mobile-nav-link {
            color: #1e293b;
            border-color: rgba(37, 99, 235, 0.15);

            .link-icon {
                background: rgba(37, 99, 235, 0.1);
            }

            &:hover,
            &:active {
                background: rgba(37, 99, 235, 0.1);
                border-color: rgba(37, 99, 235, 0.3);
                color: #2563eb;
            }
        }

        .mobile-menu-divider {
            background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent);
        }

        .mobile-action-btn {
            background: rgba(37, 99, 235, 0.1);
            border-color: rgba(37, 99, 235, 0.2);
            color: #1e293b;

            &:hover {
                background: rgba(37, 99, 235, 0.15);
                border-color: rgba(37, 99, 235, 0.4);
            }
        }

        .mobile-close-btn {
            background: rgba(37, 99, 235, 0.1);
            border-color: rgba(37, 99, 235, 0.2);

            .close-line {
                background: #1e293b;
            }

            &:hover {
                background: rgba(37, 99, 235, 0.15);
                border-color: rgba(37, 99, 235, 0.4);

                .close-line {
                    background: #2563eb;
                }
            }
        }
    }
}

// 移动端菜单背景装饰
.mobile-menu-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
}

.mobile-grid-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(rgba(71, 202, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(71, 202, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.6;
}

.mobile-glow {
    position: absolute;
    filter: blur(80px);
    opacity: 0;
    transition: opacity 0.6s ease;

    &.mobile-glow-1 {
        top: -20%;
        right: -20%;
        width: 60%;
        height: 60%;
        background: radial-gradient(circle, rgba(189, 52, 254, 0.25) 0%, transparent 70%);
    }

    &.mobile-glow-2 {
        bottom: -10%;
        left: -20%;
        width: 50%;
        height: 50%;
        background: radial-gradient(circle, rgba(71, 202, 255, 0.2) 0%, transparent 70%);
    }
}

.mobile-menu-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 80px 24px 40px;
    gap: 20px;
    position: relative;
    z-index: 1;
}

.mobile-menu-logo {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 16px;

    .mobile-logo-img {
        width: 64px;
        height: 64px;
        filter: drop-shadow(0 0 20px rgba(71, 202, 255, 0.4));
    }
}

.mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 280px;
}

.mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #e0e7ff;
    text-decoration: none;
    padding: 16px 20px;
    border-radius: 16px;
    border: 1px solid rgba(71, 202, 255, 0.15);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(8px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(20px);
    transition-delay: var(--delay, 0s);

    .link-icon {
        font-size: 1.2rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(71, 202, 255, 0.1);
        border-radius: 12px;
        transition: all 0.3s ease;
    }

    .link-text {
        flex: 1;
    }

    &:hover,
    &:active {
        background: rgba(71, 202, 255, 0.1);
        border-color: rgba(71, 202, 255, 0.3);
        transform: translateY(0) scale(1.02);

        .link-icon {
            background: rgba(71, 202, 255, 0.2);
            transform: scale(1.1);
        }
    }
}

.mobile-menu-divider {
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71, 202, 255, 0.3), transparent);
    margin: 12px 0;
}

.mobile-menu-actions {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.mobile-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    background: rgba(71, 202, 255, 0.1);
    border: 1px solid rgba(71, 202, 255, 0.2);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #e0e7ff;

    .action-icon {
        width: 28px;
        height: 28px;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .action-label {
        font-size: 0.85rem;
        font-weight: 600;
    }

    &:hover {
        background: rgba(71, 202, 255, 0.15);
        border-color: rgba(71, 202, 255, 0.4);
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.95);
    }
}

// 移动端关闭按钮
.mobile-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(71, 202, 255, 0.2);
    border-radius: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    .close-line {
        position: absolute;
        width: 20px;
        height: 2px;
        background: #b0bac9;
        border-radius: 2px;
        transition: all 0.3s ease;

        &:first-child {
            transform: rotate(45deg);
        }

        &:last-child {
            transform: rotate(-45deg);
        }
    }

    &:hover {
        background: rgba(71, 202, 255, 0.1);
        border-color: rgba(71, 202, 255, 0.4);

        .close-line {
            background: #47caff;
        }
    }

    &:active {
        transform: scale(0.9);
    }
}

@media (max-width: 768px) {
    .desktop-nav {
        display: none;
    }

    .hamburger-btn {
        display: flex;
    }

    .nav-content {
        padding: 12px 0;
        width: 90%;
    }

    .nav-logo .logo-text {
        font-size: 1.1rem;
    }

    .nav-logo .logo-icon {
        width: 28px;
        height: 28px;
    }
}
</style>
