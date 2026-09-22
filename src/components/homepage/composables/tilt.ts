import { onMounted, onUnmounted, watch, type Ref } from "vue";

/** Cache the untransformed bounds on entry; coalesce pointer writes per frame. */
export function useTilt(enabled: Ref<boolean>) {
  let target: HTMLElement | null = null;
  let bounds: DOMRect | null = null;
  let frame = 0;
  let x = 0, y = 0;
  const leave = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (target) target.style.removeProperty("transform");
    target = null;
    bounds = null;
  };
  const enter = (event: PointerEvent) => {
    leave();
    if (!enabled.value || event.pointerType === "touch") return;
    target = event.currentTarget as HTMLElement;
    // The parent doesn't rotate, so reading it avoids transform feedback.
    bounds = target.parentElement!.getBoundingClientRect();
  };
  const move = (event: PointerEvent) => {
    if (!enabled.value || !target) return;
    bounds ??= target.parentElement!.getBoundingClientRect();
    x = event.clientX;
    y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!target || !bounds || !bounds.width || !bounds.height) return;
      const dx = Math.max(-1, Math.min(1, (x - bounds.left) / bounds.width * 2 - 1));
      const dy = Math.max(-1, Math.min(1, (y - bounds.top) / bounds.height * 2 - 1));
      target.style.transform = `perspective(1000px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
    });
  };
  watch(enabled, (value) => { if (!value) leave(); });
  const invalidate = () => { bounds = null; };
  onMounted(() => {
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
  });
  onUnmounted(() => {
    leave();
    window.removeEventListener("scroll", invalidate);
    window.removeEventListener("resize", invalidate);
  });
  return { enter, move, leave };
}
