import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/parkjeayeon",
      Email: "mailto:wodus331@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.TagList(),
  ],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Recent Posts",
        limit: 10,
        showTags: true,
        filter: (f) => !f.slug?.endsWith("index"),
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Comments({
        provider: "giscus",
        options: {
          repo: "parkjeayeon/blog",
          repoId: "R_kgDOR5WQpQ",
          category: "Announcements",
          categoryId: "DIC_kwDOR5WQpc4C6BnR",
          mapping: "pathname",
          reactionsEnabled: true,
          inputPosition: "bottom",
          lightTheme: "light",
          darkTheme: "dark",
          lang: "ko",
        },
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.DesktopOnly(Component.ProfileImage()),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.DesktopOnly(Component.ProfileImage()),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(),
  ],
  right: [],
}
