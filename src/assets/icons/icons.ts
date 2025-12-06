import Pipeline from "./pipeline.png";
import Python from "./python.png";
import Share from "./share.png";
import Qt from "./qt.png";
import TS from "./typescript.png";
import CSharp from "./csharp.png";

const icons = {
  Pipeline,
  Python,
  Share,
  Qt,
  TS,
  CSharp
};

export default icons;

// 根据文件名自动导入
const svgModules = import.meta.glob<string>("./*.svg", {
  eager: true,
  import: "default",
});

const iconMap: Record<string, string> = Object.fromEntries(
  Object.entries(svgModules).map(([path, module]) => {
    const name = path.replace(/^\.\/(.*)\.svg$/, "$1");
    return [name, module];
  })
);

export { iconMap };
