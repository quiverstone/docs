# Quiverstone Documentation

The public documentation site for [Quiverstone](https://www.quiverstone.io), a multi-account AWS management platform for MSPs, cloud consultants, and enterprises. Hosted by [Mintlify](https://mintlify.com) and published at [docs.quiverstone.io](https://docs.quiverstone.io).

## Contributing

- **Do not commit directly to `main`.** The `main` branch is auto-published, so all changes must go through a pull request and review.
- Page structure and navigation are defined in [`docs.json`](./docs.json). Adding a new `.mdx` file does not make it visible — you also need to register its path in `docs.json` under the appropriate navigation group.
- Write in [MDX](https://mdxjs.com/) with Mintlify's component set (`<Note>`, `<Warning>`, `<Steps>`, `<Card>`, etc.). See existing pages for conventions.

## Local development

Install the Mintlify CLI toolchain and run the preview server:

```bash
npm install
npx mint dev
```

The preview opens at http://localhost:3000 and hot-reloads on file changes.

### Useful commands

| Command | Purpose |
|---|---|
| `npx mint dev` | Run the Mintlify preview server. |
| `npx mint broken-links` | Check for broken internal links across all pages. |
| `npm run update-submodules` | Pull the latest commits for any git submodules referenced by the docs. |

## Repository layout

- `quiverstone.mdx` — landing page.
- `subscriptions/` — subscription tier overview, quickstarts, capability reference.
- `setup/` — the bulk of the product documentation:
  - `setup/organizations/` — AWS Organizations management and inventory role deployment.
  - `setup/accounts/` — standalone and inventoried Account management and access role deployment.
  - `setup/iam-roles/` — comprehensive IAM role reference (access, inventory, intermediate).
  - `setup/service-catalog/` — AWS Service Catalog portfolios for customer self-service.
  - `setup/customers/` — Customer CRM records.
  - `setup/teams/`, `setup/groups/`, `setup/roles/`, `setup/users/` — workspace collaboration model.
- `tools/` — tools and utilities (dashboards, template library).
- `api.mdx`, `integrations.mdx` — placeholders for the upcoming API and Integrations features.
- `assets/` — images, logos, stack-launch button artwork.
- `_reference/` — internal scratch/reference material, not published (ignored in `docs.json`).
- `.kiro/specs/` — internal product specs, not published.

## Content conventions

See [`CLAUDE.md`](./CLAUDE.md) for detailed guidance on how this repository is organized and how to add or modify content.
