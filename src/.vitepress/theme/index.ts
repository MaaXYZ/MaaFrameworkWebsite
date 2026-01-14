import DefaultTheme from "vitepress/theme";
import "./style.css";
import HomePage from "../../components/homepage/HomePage.vue";
import Project from "../../components/Project.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
    app.component("Project", Project);
  },
};
