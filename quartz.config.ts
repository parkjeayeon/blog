import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "📝 Ref's Blog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "viakiro.com",
    ignorePatterns: ["private", "templates", ".obsidian", "drafts", "docs"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans KR",
        body: "Noto Sans KR",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#FAFAFA",
          lightgray: "#F2F3F5",
          gray: "#999999",
          darkgray: "#2E2E2E",
          dark: "#1A1A1A",
          secondary: "#7852FF",
          tertiary: "#6435E9",
          highlight: "rgba(120, 82, 255, 0.1)",
          textHighlight: "#ffeb3b88",
        },
        darkMode: {
          light: "#1c1b26",
          lightgray: "#242333",
          gray: "#666666",
          darkgray: "#DCDDDE",
          dark: "#FFFFFF",
          secondary: "#7852FF",
          tertiary: "#9B7DFF",
          highlight: "rgba(120, 82, 255, 0.15)",
          textHighlight: "#ffeb3b55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Disabled: Pretendard is not on Google Fonts, so OG image font fetch fails
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
