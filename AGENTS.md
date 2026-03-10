# Repository Guide for Coding Agents

## Project Snapshot
- Framework: Next.js 16 App Router with React 19 and TypeScript.
- Build target: static export via `next.config.ts` (`output: "export"`).
- Styling: Tailwind CSS v4 plus shadcn/ui primitives and custom utilities in `src/app/globals.css`.
- Package manager: `npm` (`package-lock.json` is present).
- Source root: `src/` with `@/*` alias mapped to `src/*`.

## Rule Files
- No repository-level Cursor rules were found in `.cursor/rules/`.
- No `.cursorrules` file was found.
- No Copilot instructions file was found at `.github/copilot-instructions.md`.
- If any of those files are added later, treat them as higher-priority repo instructions and merge them into this guide.

## Working Directories
- App routes and layouts live in `src/app/`.
- Shared UI primitives live in `src/components/ui/`.
- Shared utilities live in `src/lib/`.
- Static assets belong in `public/`.
- Private stats dashboard lives in `dashboard/` as a separate Next.js app and deployment target.
- Avoid editing generated output in `.next/` or `out/`.

## Core Commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build production output: `npm run build`
- Start production server locally: `npm run start`
- Lint whole repo: `npm run lint`
- Type-check only: `npx tsc --noEmit`
- Dashboard install: `cd dashboard && npm install`
- Dashboard dev: `cd dashboard && npm run dev`
- Dashboard build: `cd dashboard && npm run build`
- Dashboard start: `cd dashboard && npm run start`
- Dashboard lint: `cd dashboard && npm run lint`

## Lint and Targeted Validation
- Lint a single file: `npx eslint src/app/page.tsx`
- Lint a directory: `npx eslint src/app src/components`
- Check a specific TypeScript file indirectly with project settings: `npx tsc --noEmit --pretty false`
- There is no dedicated formatter script; match existing formatting and let ESLint be the main automated check.

## Test Status
- There is currently no `test` script in `package.json`.
- No Jest, Vitest, Playwright, or Cypress config was found.
- There are no repository-level automated tests configured right now.
- Do not claim a feature is test-covered unless you add the test runner and tests yourself.

## Single-Test Guidance
- A single-test command does not exist yet because no test framework is configured.
- If you add Vitest later, prefer `npx vitest run path/to/test-file.test.ts`.
- If you add Jest later, prefer `npx jest path/to/test-file.test.ts`.
- If you add Playwright later, prefer `npx playwright test path/to/spec.ts`.
- When introducing a test runner, update this file with exact repo commands.

## Pre-PR Validation
- For UI or route changes, run `npm run lint` and `npm run build` before finishing.
- For `dashboard/` changes, also run `cd dashboard && npm run lint` and `cd dashboard && npm run build`.
- For TypeScript-heavy refactors, also run `npx tsc --noEmit`.
- If you add tests in the future, run the narrowest relevant test command plus the full test suite if practical.
- Call out any validation you could not run.

## Architecture Notes
- This is an App Router project, so prefer route files, layouts, and server-first patterns that fit Next.js.
- Keep static-export compatibility in mind; avoid server features that require a Node runtime unless the deployment model changes.
- `dashboard/` is intentionally separate from the static-export marketing site and can use server-side Node features such as route handlers and SQLite.
- Client components must opt in with `"use client"`.
- Shared visual building blocks are intentionally centralized in `src/components/ui/`.
- Use `@/` imports for internal modules instead of long relative paths.

## Import Conventions
- Follow the existing import grouping used in the repo.
- Group 1: framework or library imports (`react`, `next`, `lucide-react`, `class-variance-authority`).
- Group 2: internal `@/` imports.
- Group 3: local relative imports such as `./globals.css`.
- Keep a blank line between groups when the file already uses grouped imports.
- Prefer named imports unless a framework convention requires default export.
- Import types inline when the file already does so, for example `import { type VariantProps } from ...`.

## Formatting Conventions
- App code in `src/app/` currently uses double quotes and semicolons.
- Generated shadcn/ui files in `src/components/ui/` currently omit semicolons.
- Preserve the local style of the file you edit instead of forcing one global punctuation style.
- Prefer multiline wrapping for long JSX props, long class lists, and complex object literals.
- Do not add comments unless the logic is genuinely non-obvious.
- Keep files tidy and avoid large blocks of dead code.

## TypeScript Guidelines
- TypeScript is strict; keep code fully type-safe.
- Add explicit types when they improve clarity, especially for helpers, props, and exported values.
- Use `Readonly<{ ... }>` for immutable component props when consistent with the surrounding file.
- Reuse framework-provided types such as `Metadata` or `NextConfig` when available.
- Avoid `any`; use exact types, unions, generics, or `unknown` with narrowing.
- Keep `noEmit` compatibility; do not rely on transpile-only behavior.

## React and Next.js Patterns
- Prefer server components by default; add `"use client"` only when hooks, browser APIs, or client interactivity are required.
- Keep page modules focused on composition and data declaration.
- Hoist static arrays and constants to module scope when they do not depend on component state.
- Use semantic HTML and accessible controls.
- For navigation-style buttons, follow the existing pattern of `Button asChild` around anchors or links.
- Keep metadata close to routes when applicable.

## Component Conventions
- Use small, composable function components.
- Match the surrounding export style: route files use default exports, shared primitives usually use named exports.
- Shared class merging should go through `cn` from `src/lib/utils.ts`.
- For variant-heavy components, follow the existing `cva` pattern.
- Pass through native props with `React.ComponentProps<...>` when wrapping primitives.
- Preserve `data-slot` and similar structural attributes in UI primitives.

## Styling Guidelines
- Favor Tailwind utility classes and existing custom utilities over ad hoc CSS.
- Reuse design tokens from `src/app/globals.css` before introducing new raw color values.
- Prefer CSS variables and theme tokens for reusable styling decisions.
- Keep custom CSS in `src/app/globals.css` limited to tokens, utilities, and truly global behavior.
- Maintain the existing visual language: dark, warm-neutral palette with glass and mesh effects.
- Ensure UI changes work on mobile and desktop.

## Naming Conventions
- Components: PascalCase (`DownloadPage`, `CardHeader`).
- Functions and variables: camelCase (`resolveDownloadUrl`, `downloadUrl`).
- Constants that are module-level but not env vars still use camelCase in this repo.
- Use descriptive names for UI copy structures like `featureList` and `useCases`.
- Prefer stable keys such as `title` when mapping static arrays.
- File names should follow Next.js conventions for routes and lower-case names for utility modules.

## Error Handling
- Prefer `try/catch` around async browser or network flows that can realistically fail.
- Check `response.ok` explicitly before using fetched data.
- Use early returns to keep failure handling simple.
- Provide safe fallbacks when redirecting or loading remote metadata.
- Guard state updates in async client effects to avoid updating after unmount.
- Throw or surface specific errors when a failure mode is known; avoid silent failure.

## Data and Control Flow
- Prefer module-scope constants for static content and configuration.
- Keep helper functions near the code that uses them unless they are broadly reusable.
- Use small transformation helpers like `stripYaml` when parsing non-trivial strings.
- In client effects, define an inner async function and invoke it with `void` if intentionally unawaited.
- Prefer straightforward loops, maps, and guards over dense abstractions.

## Editing Guidance
- Make the smallest change that fully solves the problem.
- Respect user changes in unrelated files.
- Do not rewrite generated shadcn/ui files unless the task actually requires it.
- If you touch `src/components/ui/`, preserve the generated component style and API shape.
- If you add a new dependency or script, update this file.

## Things to Avoid
- Do not add server-only features that break static export without also updating deployment assumptions.
- Do not introduce a second className-merging helper.
- Do not switch between relative imports and `@/` imports inconsistently.
- Do not add broad formatting churn to unrelated files.
- Do not edit `.next/`, `out/`, or other generated artifacts.

## When Unsure
- Read neighboring files and copy the prevailing pattern.
- Prefer consistency with the local module over abstract style preferences.
- Run lint and build if the change could affect routing, typing, or styling.
- Leave a short note in your final message if the repo lacks automation for a check you would normally run.
