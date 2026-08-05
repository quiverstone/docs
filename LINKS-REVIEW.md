# Links Requiring Review

Links identified during the docs-sc → Quiverstone consolidation that need manual verification or correction.

## Internal Links (likely broken / need new paths)

These links reference the old `docs.sentri.cloud` domain and internal paths that may not exist in the new site structure.

| File | Link | Issue |
|------|------|-------|
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `https://docs.quiverstone.io/consulting/pricing/control-tower-costs#aws-control-tower-deployment-costs` | Old internal anchor link — path doesn't exist in new site structure. Replace with a heading anchor or remove. |
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `https://docs.quiverstone.io/consulting/pricing/control-tower-costs#customizations-for-aws-control-tower-cfct-deployment-costs` | Same as above — old internal anchor. |
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `https://docs.quiverstone.io/consulting/pricing/control-tower-costs#example-use-cases-and-estimated-monthly-costs` | Same as above — old internal anchor. |
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `https://docs.quiverstone.io/consulting/pricing/control-tower-costs#1-two-account-setup:...` | Same as above — old internal anchor. |
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `https://docs.quiverstone.io/consulting/pricing/control-tower-costs#2-four-to-five-aws-accounts...` | Same as above — old internal anchor. |

## External Links (verify still valid)

These are third-party links that should be verified for accuracy.

| File | Link | Notes |
|------|------|-------|
| `professional-services/ai-automation/basic-tooling.mdx` | `https://cal.com/quiverstone/assistance` | Confirm this cal.com booking link has been created under the Quiverstone account. |
| `professional-services/consulting-blog.mdx` | `https://www.quiverstone.io/blog/category/Consulting` | Verify this blog category exists on the Quiverstone site. |
| `professional-services/code-repository.mdx` | `https://www.github.com/quiverstone/armory` | Verify this GitHub repo exists. |
| `professional-services/ai-automation/solutions.mdx` | `https://snippets.cacher.io/snippet/e0acc3127d5efed1e2e9` | Third-party snippet link — verify still accessible. |
| `professional-services/engagement/ad-hoc-hourly.mdx` | `http://Draw.io` | Bare domain link — should be `https://draw.io` or `https://app.diagrams.net`. |

## Malformed Links

These links have formatting issues from the original Mintlify export.

| File | Link | Issue |
|------|------|-------|
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `[above.AWS](http://above.AWS)` | Broken text — "above." was concatenated with "AWS" during export. Should be plain text "above. AWS reference documentation..." |
| `professional-services/management-governance/control-tower/aws-control-tower-price-estimations.mdx` | `[usage.AWS](http://usage.AWS)` | Same issue — "usage." concatenated with "AWS". Should be plain text. |

## Pages Removed from Navigation

The old docs-sc referenced these pages under Management & Governance that do **not** have corresponding files in the `professional-services/` directory. They were likely cross-references to the main Quiverstone product docs:

- `setup/accounts/new-aws-account`
- `setup/accounts/configure-aws-alternate-contacts`
- `setup/organizations/organization-configuration`
- `setup/organizations/untitled-page`

If these pages should be linked from the Consulting tab, add them back as cross-references to the existing product documentation paths (e.g., `setup/accounts/index`, `setup/organizations/index`).
