import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Untitled",
    description: "No description provided",
  },
  components: {
    callout: {
      note: "Note",
      abstract: "Abstract",
      info: "Info",
      todo: "Todo",
      tip: "Tip",
      success: "Success",
      question: "Question",
      warning: "Warning",
      failure: "Failure",
      danger: "Danger",
      bug: "Bug",
      example: "Example",
      quote: "Quote",
    },
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "No backlinks found.",
    },
    themeToggle: {
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    readerMode: {
      title: "Reader mode",
    },
    explorer: {
      title: "Contents",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "Graph View",
    },
    recentNotes: {
      title: "Recent Posts",
      seeRemainingMore: ({ remaining }) => `See ${remaining} more →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclude of ${targetSlug}`,
      linkToOriginal: "Link to original",
    },
    search: {
      title: "Search",
      searchBarPlaceholder: "Search notes...",
    },
    tableOfContents: {
      title: "Table of Contents",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min read`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Recent Posts",
      lastFewNotes: ({ count }) => `Last ${count} notes`,
    },
    error: {
      title: "Not Found",
      notFound: "This page does not exist or is set to private.",
      home: "Return to home",
    },
    folderContent: {
      folder: "Folder",
      itemsUnderFolder: ({ count }) => `${count} item(s)`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag Index",
      itemsUnderTag: ({ count }) => `${count} item(s)`,
      showingFirst: ({ count }) => `Showing first ${count} tags`,
      totalTags: ({ count }) => `Found ${count} total tags.`,
    },
  },
} as const satisfies Translation
