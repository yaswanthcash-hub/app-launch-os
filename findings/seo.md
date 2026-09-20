# SEO Research Digest

**Verification date:** 2026-09-20
**Status:** Verified against primary sources; recommendations labeled below.

## Overview

This digest covers open-source repository discoverability: README SEO, llms.txt, social cards, and documentation engine strategy described in IMPLEMENTATION_PLAN.md section 7 and Phase 5 (M12-seo).

## Methodology

Sources were checked on 2026-09-20 against GitHub's official documentation, the llms.txt specification, and Docusaurus documentation. Claims tied to a specific platform's published guidance are labeled **[Platform Verified]**. General SEO best practices supported by published measurement are labeled **[Verified]**. Actionable guidance is labeled **[Recommendation]**.

## 1. README SEO

- **[Platform Verified]** GitHub renders README.md on the repository home page and surfaces it in search results. A clear title, badges, a table of contents, and descriptive body text improve discoverability and click-through.
- **[Recommendation]** Write the README for a developer audience first: state the problem, show a quickstart, and list modules. Include badges for license, build status, and version.

## 2. llms.txt

- **[Verified]** The llms.txt specification (introduced 2024) provides a standard way for websites to expose large-language-model-friendly text to crawlers that honor the file.
- **[Recommendation]** Publish an llms.txt file at the repository root or docs site root. It should list the canonical markdown URLs and a short project summary so AI crawlers can index accurate, current content.

## 3. Documentation Engine

- **[Platform Verified]** Docusaurus is Meta's open-source documentation framework. It supports MDX, built-in search, internationalization, and plugins for OpenGraph and sitemaps.
- **[Recommendation]** Use Docusaurus for the project documentation site. Configure OpenGraph meta tags and a sitemap so social shares and search engines render the correct preview content.

## 4. Social Cards

- **[Platform Verified]** GitHub and other platforms generate preview cards from OpenGraph meta tags (og:title, og:description, og:image). Repositories with a configured preview image see higher click-through from search and sharing.
- **[Recommendation]** Generate branded social-card images for the repository and major docs pages.

## 5. Freshness Signals

- **[Verified]** Search and AI crawlers favor repositories with recent, date-stamped content. Stale documentation reduces both search ranking and community trust.
- **[Recommendation]** Date-stamp every findings and policy file. Run the freshness-lint CI workflow (see IMPLEMENTATION_PLAN.md section 10) to flag docs older than 90 days.

## Pitfalls

- Publishing documentation that contradicts the current code or store policies.
- Forgetting to regenerate social cards after a rebrand.
- Neglecting the llms.txt file, which leaves AI crawlers without a canonical text source.

## Source Links

- GitHub README documentation: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository (verified 2026-09-20)
- llms.txt specification: https://llmstxt.org (verified 2026-09-20)
- Docusaurus: https://docusaurus.io (verified 2026-09-20)

## Caveats

SEO outcomes depend on search-engine algorithms that change over time. Treat this digest as a starting baseline and re-verify against current platform documentation.