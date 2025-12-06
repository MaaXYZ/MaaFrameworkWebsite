import Pipeline from "./pipeline.png";
import Python from "./python.png";
import Share from "./share.png";
import Qt from "./qt.png";
import TS from "./typescript.png";
import CSharp from "./csharp.png";

import globeIcon from "./globe.svg";
import rocketIcon from "./rocket.svg";
import packageIcon from "./package.svg";
import searchIcon from "./search.svg";
import wrenchIcon from "./wrench.svg";

const icons = {
  Pipeline,
  Python,
  Share,
  Qt,
  TS,
  CSharp
};

export default icons;


const iconMap: Record<string, string> = {
  globe: globeIcon,
  rocket: rocketIcon,
  package: packageIcon,
  search: searchIcon,
  wrench: wrenchIcon,
};

export { iconMap };
