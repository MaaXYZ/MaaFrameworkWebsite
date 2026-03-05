import { Stack } from "../types/Stack";
import icons from "../icons/icons";

const badges = {
  [Stack.Pipeline]: {
    icon: icons.Pipeline,
    label: Stack.Pipeline,
    bgColor: "#88726D",
  },
  [Stack.Python]: {
    icon: icons.Python,
    label: Stack.Python,
    bgColor: "#3870A0",
  },
  [Stack.Qt6]: {
    icon: icons.Qt,
    label: Stack.Qt6,
    bgColor: "#49C758",
  },
  [Stack.CSharp]: {
    icon: icons.CSharp,
    label: Stack.CSharp,
    bgColor: "#30932d",
  },
  [Stack.TS]: {
    icon: icons.TS,
    label: Stack.TS,
    bgColor: "#8b36db",
  },
  [Stack.Rust]: {
    icon: icons.Rust,
    label: Stack.Rust,
    bgColor: "#CE412B",
  },
  [Stack.Vue]: {
    icon: icons.Vue,
    label: Stack.Vue,
    bgColor: "#42B883",
  },
  [Stack.Go]: {
    icon: icons.Golang,
    label: Stack.Go,
    bgColor: "#00ADD8",
  },
};

export default badges;
