import { createHighlighter } from "shiki";
import examples from "./examples.json";

type HighlightedExamples = Record<"zh" | "en", Record<string, string>>;
export declare const data: HighlightedExamples;

// VitePress executes data loaders at build time (and on changes in dev).
// Only the generated HTML is shipped; no Shiki/Oniguruma runtime in the homepage.
export default {
  watch: ["./examples.json"],
  async load(): Promise<HighlightedExamples> {
    const highlighter = await createHighlighter({ themes: ["github-dark"], langs: ["json", "python"] });
    try {
      const result: HighlightedExamples = { zh: {}, en: {} };
      for (const lang of ["zh", "en"] as const) {
        for (const [id, example] of Object.entries(examples[lang])) {
          result[lang][id] = highlighter.codeToHtml(example.code, {
            lang: example.language, theme: "github-dark",
          });
        }
      }
      return result;
    } finally {
      highlighter.dispose();
    }
  },
};
