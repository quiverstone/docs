# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is the public documentation site for **Quiverstone**, a multi-account AWS management platform for MSPs, cloud consultants, and enterprises. It is a Mintlify-based docs site, published at **docs.quiverstone.io**. The `main` branch is auto-published, so all changes must go through a pull request — never commit directly to `main`.

## Commands

- `npx mint dev` — run the Mintlify docs preview locally.
- `npx mint broken-links` — check for broken internal links.
- `npm install` — install the Mintlify toolchain.
- `npm run update-submodules` — pull the latest commits for any git submodules (e.g. the `roles/` content excluded by `docs.json`'s ignore list).

There is no test suite, build step, or linter wired into `package.json`. Content is validated via the Mintlify dev server, the broken-links checker, and the PR review process.

## Architecture

Site configuration lives entirely in **`docs.json`** (Mintlify schema). Understanding that file is essential — it defines:

- **Tabs**: `Home`, `API Reference`, `Integrations`.
- **Home navigation groups**:
  - `Get Started` — the `quiverstone.mdx` landing page.
  - `Subscriptions` — tier overview, Consultant quickstart, and the canonical capability reference. This is the gating layer that explains how features are unlocked by subscription tier.
  - `Workspace` — user/team/group/role model. This is the collaboration layer (who sees what, who can do what). Covers `setup/users`, `setup/teams`, `setup/groups`, `setup/roles`.
  - `AWS Setup` — the AWS-side product documentation: Organizations, Accounts, IAM Roles (access/inventory/intermediate), Service Catalog, Customers.
  - `Tools & Utilities` — dashboards and template library (currently in-development stubs).
- **`ignore`** — excludes `_reference/`, `.trunk/`, and submodule-managed `roles/` content from being treated as docs pages.

Adding a new `.mdx` file does **not** make it visible. You must also register its path (without `.mdx` extension) in the appropriate `pages` array in `docs.json`.

## Content layout

- `quiverstone.mdx` — landing page.
- `subscriptions/` — tier overview (`index`), Consultant quickstart, capability reference.
- `setup/users/`, `setup/teams/`, `setup/groups/`, `setup/roles/` — the workspace collaboration model. These pages explain how the `ACCESS` vs `SETTINGS` team split works, how Groups share resources on Pro/Enterprise, and who can do what at each tier.
- `setup/organizations/` — AWS Organizations management (`index`) and inventory role deployment quickstart (`inventory`).
- `setup/accounts/` — Account management (`index`) and access role deployment quickstart (`access`).
- `setup/iam-roles/` — comprehensive AWS IAM role reference. `index` is the role-type chooser; `access`, `inventory`, and `intermediate` are the deep references for each role family.
- `setup/service-catalog/` — AWS Service Catalog portfolio deployment for customer self-service.
- `setup/customers/` — CRM-style Customer records.
- `tools/` — tools and utilities (dashboards, template library).
- `api.mdx`, `integrations.mdx` — placeholders for the upcoming API and Integrations features (not yet available).
- `assets/` — images, logos, stack-launch button artwork. Favicon lives at repo root.
- `_reference/` — internal scratch/reference material, not published (ignored in `docs.json`).
- `.kiro/specs/` — internal specs, not published.

## The two-tier documentation pattern

The AWS-setup content is deliberately split into **task-focused quickstarts** and **comprehensive references**, and they cross-link:

- **Quickstarts** (`setup/organizations/inventory.mdx`, `setup/accounts/access.mdx`) walk through a real deployment using `<Steps>`/`<Step>`, one-click Launch Stack buttons, and only essential parameters. They link out to the reference pages for full detail.
- **References** (`setup/iam-roles/access.mdx`, `setup/iam-roles/inventory.mdx`, `setup/iam-roles/intermediate.mdx`) are the encyclopedic versions: every template's parameters/outputs/permissions, decision matrices, deployment scenarios, troubleshooting, validation CLI snippets, and security checklists.

When editing one, consider whether the other needs to be updated to match. There is intentional duplication between quickstarts and references — keep them in sync.

## Authoring conventions

- Pages are **MDX** with YAML frontmatter. Use quoted strings: `title: "Manage Organizations"`, `description: "…"`. Both fields should be present.
- Mintlify components in use: `<Note>`, `<Warning>`, `<Steps>`/`<Step>`, `<CardGroup>`/`<Card>`. Markdownlint will warn about inline HTML on every file that uses these — that is expected and should be ignored.
- **Launch Stack buttons**: `[![Launch Stack](/assets/stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=…&stackName=…)`. StackSet variants use `/assets/stackset.png`.
- **CloudFormation parameters** are documented as bold name + `(pParamName)` in backticks + default/required annotation + bullet sub-notes. See `setup/iam-roles/access.mdx` for the canonical pattern.
- The Quiverstone production account ID `684035162433` is the principal to trust in all direct-access setups. `pQuiverstoneProductionAccountId` is always marked **DO NOT MODIFY**.
- **Page paths** in `docs.json` are relative to the repo root and omit the `.mdx` extension (e.g. `setup/iam-roles/access`).
- Do not commit directly to `main` — always open a PR.

## Key cross-cutting concepts to keep consistent

Several concepts appear across many pages. If you edit one, scan the others for consistency:

- **Tier gating.** The tier → team type → team role permission model is described in `subscriptions/index.mdx` and detailed exhaustively in `subscriptions/capabilities.mdx`. Other pages should link to those rather than re-explaining the matrix.
- **`ACCESS` vs `SETTINGS` teams.** Canonical explanation lives in `setup/teams/index.mdx`.
- **Groups as the Pro/Enterprise sharing mechanism.** Canonical explanation in `setup/groups/index.mdx`.
- **IAM role deployment patterns (direct / chained / browser).** Canonical explanation in `setup/iam-roles/index.mdx` and the three reference pages.
