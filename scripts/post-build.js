import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "src", ".vitepress", "dist");

// 递归处理所有 HTML 文件，为 cleanUrls 创建目录结构
function createCleanUrlStructure(dir) {
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      createCleanUrlStructure(fullPath);
    } else if (
      file.endsWith(".html") &&
      file !== "index.html" &&
      file !== "404.html" &&
      file !== "200.html"
    ) {
      // 例如: docs/1.1-QuickStarted.html -> docs/1.1-QuickStarted/index.html
      const nameWithoutExt = basename(file, ".html");
      const targetDir = join(dir, nameWithoutExt);

      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      const targetFile = join(targetDir, "index.html");
      copyFileSync(fullPath, targetFile);
      console.log(`✓ Created ${targetFile}`);
    }
  }
}

// 创建 SPA fallback
const indexHtml = join(distDir, "index.html");
const fallback200 = join(distDir, "200.html");
const fallback404 = join(distDir, "404.html");

if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, fallback200);
  console.log("✓ Created 200.html for SPA fallback");
}

if (existsSync(fallback404)) {
  // 404.html 指向 index.html 的内容以支持 SPA 路由
  copyFileSync(indexHtml, fallback404);
  console.log("✓ Updated 404.html for SPA fallback");
}

// 为 cleanUrls 创建目录结构
console.log("\nCreating clean URL directory structure...");
createCleanUrlStructure(distDir);
console.log("\n✓ Build post-processing complete!");
