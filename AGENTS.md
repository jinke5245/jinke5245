# Project Instructions

This repository has two jobs:

1. It powers the `README.md` shown on the `jinke5245` GitHub profile.
2. It contains a personal web blog built with Astro.

Treat `README.md` as the public profile front door. Keep it concise, personal,
and intentional. Treat the Astro site as the longer-form home for posts, notes,
projects, and experiments.

## Collaboration Rules

### Required GitHub Workflow

Use the repository-local `github-workflow` skill before starting any task that
may change files, commits, branches, issues, or pull requests in this
repository. The skill is linked at `.agents/skills/github-workflow`.

Before editing files:

1. Create or identify a matching GitHub issue with an English semantic title.
2. Create and switch to an issue-number-prefixed branch using
   `<issue-number>-<semantic-title-slug>`.
3. Keep the change scoped to that issue.
4. Validate the change before handing work back.

When the user asks to commit, push, publish, or open/update a pull request:

1. Re-check the worktree and stage only scoped changes.
2. Commit with an English semantic commit message.
3. Push the branch and create or update a draft pull request linked to the
   issue.
4. Address CI and review feedback through the pull request.

If a matching issue, branch, and pull request already exist, reuse them after
verifying they match the current task.

Do not commit, push, or create/update pull requests unless the user asks for
that step or explicitly confirms it. All committed repository changes must go
through pull requests.

### Language And Naming

All issue titles, pull request titles, branch names, and commit messages must be
in English.

Issue titles and commit messages must use semantic format:

```text
<type>: <short imperative summary>
```

Example:

```text
chore: initialize Astro blog
```

Prefer focused types such as `feat`, `fix`, `docs`, `refactor`, `test`,
`chore`, `ci`, `build`, and `perf`.

### Worktree Safety

- Preserve unrelated user changes.
- Do not revert or delete files you did not create unless explicitly requested.
- Do not stage or commit unrelated changes unless explicitly requested.
- Do not commit directly on `main`.
- Do not create commits unless the user asks for a commit.

### Templates

Use the matching issue template whenever possible:

- `.github/ISSUE_TEMPLATE/content.yml` for profile README, posts, notes, and
  site copy.
- `.github/ISSUE_TEMPLATE/web-feature.yml` for Astro site features.
- `.github/ISSUE_TEMPLATE/web-bug.yml` for Astro site bugs.
- `.github/ISSUE_TEMPLATE/maintenance.yml` for setup, tooling, workflows,
  templates, and agent configuration.

For pull requests, first check the focused templates under
`.github/PULL_REQUEST_TEMPLATE/`. Use `.github/PULL_REQUEST_TEMPLATE.md` only as
the generic fallback.

## Repository Layout

- `README.md` is the GitHub profile README. Keep it readable on the profile
  page without relying on the web site.
- `src/pages/` contains Astro routes.
- `src/content/blog/` contains blog posts in Markdown or MDX.
- `src/layouts/` and `src/components/` contain shared Astro UI.
- `src/styles/global.css` contains global styling.
- `public/` contains static assets served as-is.
- `.agents/` contains agent workflow instructions and related local skills.

## Content And Site Guidelines

- Keep public copy clear, personal, and calm. Avoid filler, hype, and generic
  placeholder prose.
- Prefer small, deliberate changes to `README.md`; it is both documentation and
  a public profile surface.
- Use blog posts for longer explanations, references, and experiments.
- Preserve Astro content frontmatter and update metadata when posts change.
- Do not add credentials, private URLs, local-only paths, or unpublished
  personal details.

## Validation

Use `pnpm` for project commands.

Before handing work back, run the checks relevant to the change:

```bash
pnpm run check
```

For template-only changes, validate Markdown and YAML structure. For visual web
changes, also review the rendered Astro site locally.
