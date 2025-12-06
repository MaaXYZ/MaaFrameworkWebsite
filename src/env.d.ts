/// <reference types="vitepress/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 静态资源类型声明
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.ico";
declare module "*.svg";
declare module "*.gif";
declare module "*.webp";
