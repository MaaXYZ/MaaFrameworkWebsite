import DefaultTheme from "vitepress/theme";
import "./style.css";
import HomePage from "../../components/homepage/HomePage.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
  },
};
