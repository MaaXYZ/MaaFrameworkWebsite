import MistEO from "./MistEO.jpg";
import SweetSmellFox from "./SweetSmellFox.jpg";
import Windsland52 from "./Windsland52.jpg";

const avatars = {
  MistEO,
  SweetSmellFox,
  Windsland52,
};

export default avatars;

export type AvatarName = keyof typeof avatars;

export const avatarLoaders = {
  MistEO: () => import("./MistEO.jpg"),
  SweetSmellFox: () => import("./SweetSmellFox.jpg"),
  Windsland52: () => import("./Windsland52.jpg"),
};
