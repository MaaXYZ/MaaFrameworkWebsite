import { defineAsyncComponent } from "vue";

export default defineAsyncComponent(() => import("@maafw/mermaid-renderer"));
