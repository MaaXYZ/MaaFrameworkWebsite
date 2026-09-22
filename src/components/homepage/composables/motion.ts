import { computed, inject, onMounted, onUnmounted, provide, ref, type InjectionKey, type Ref } from "vue";

const motionKey: InjectionKey<Ref<boolean>> = Symbol("homepage-motion");

/** One set of page/media listeners shared by all homepage animations. */
export function providePageMotion() {
  const enabled = ref(false);
  let cleanup = () => {};
  onMounted(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(pointer: coarse)");
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const capable = (navigator.hardwareConcurrency || 2) >= 4 && memory >= 4;
    const update = () => {
      enabled.value = capable && !document.hidden && !reduced.matches && !coarse.matches;
    };
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    coarse.addEventListener("change", update);
    update();
    cleanup = () => {
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  });
  onUnmounted(() => { cleanup(); });
  provide(motionKey, enabled);
  return enabled;
}

export function useSectionMotion(element: Ref<HTMLElement | null>) {
  const enabled = inject(motionKey, ref(false));
  const visible = ref(false);
  let observer: IntersectionObserver | undefined;
  onMounted(() => {
    if (!element.value) return;
    observer = new IntersectionObserver(([entry]) => {
      visible.value = entry.isIntersecting;
    });
    observer.observe(element.value);
  });
  onUnmounted(() => observer?.disconnect());
  return computed(() => enabled.value && visible.value);
}
