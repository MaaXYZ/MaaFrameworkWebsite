# MaaFramework 网站

> [!TIP]
> 本仓库不包含文档文件。如果你希望编写/修正文档，请前往 [MaaFramework 主仓库](https://github.com/MaaXYZ/MaaFramework/tree/main/docs)

## 完善站点

### 开发

1. clone 此项目至本地

```shell
git clone https://github.com/MaaXYZ/MaaFrameworkWebsite
```

2. 装载依赖

```shell
cd ./MaaFrameworkWebsite
yarn
```

3. 启动调试

```shell
yarn dev
```

### 打包

```shell
yarn build
```

### 首页性能回归

构建后运行 `npm run check:homepage`。脚本启动本地静态服务和独立的无头浏览器，检查首页 SSR、代码高亮、按需加载、主题、轮播、页面往返清理、减少动态效果及移动端导航，并输出 5 秒静置的主线程耗时。

需要 Node.js 22+ 和 Chrome/Edge；非默认安装位置可通过 `BROWSER_PATH` 指定浏览器。可选的 `SCREENSHOT_DIR` 用于保存桌面、深色和移动端截图。测试结束后会关闭浏览器并删除临时配置目录。

## 鸣谢
- **[VitePress](https://vitepress.dev/)**
