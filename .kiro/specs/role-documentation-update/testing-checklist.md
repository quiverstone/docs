# IAM Roles Documentation Testing Checklist

This checklist provides a comprehensive guide for manually testing the IAM roles documentation in Mintlify preview and production environments.

## Prerequisites

- [ ] Mintlify CLI installed (`npm install` completed)
- [ ] Access to Mintlify preview environment
- [ ] Multiple browsers available for testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device or browser dev tools for responsive testing
- [ ] AWS account access for testing CloudFormation launch buttons (optional)

## 1. Mintlify Preview Testing

### Start Preview Server

```bash
npx mintlify dev
```

Expected: Server starts on http://localhost:3000

### Navigation Structure

- [ ] IAM Roles section appears in sidebar under "Setup"
- [ ] IAM Roles section contains:
  - [ ] IAM Roles Overview (index)
  - [ ] Access Roles Quick-Start
  - [ ] Inventory Roles Quick-Start
  - [ ] Reference subsection with 3 pages
- [ ] All pages are accessible from navigation
- [ ] Breadcrumb navigation works correctly

### Page Rendering

#### Index Page (setup/iam-roles/index.mdx)

- [ ] Page title displays: "IAM Roles Overview"
- [ ] Frontmatter description appears in metadata
- [ ] All sections render correctly:
  - [ ] Role Types section
  - [ ] Choosing the Right Roles section
  - [ ] Quick-Start Guides section
  - [ ] Security Features section
  - [ ] Next Steps section
- [ ] CardGroup component renders with 2 cards
- [ ] Card icons display correctly (key, list)
- [ ] Card links work when clicked
- [ ] Note component renders with proper styling
- [ ] All internal links are clickable and work

#### Access Roles Quick-Start (setup/iam-roles/access-roles.mdx)

- [ ] Page title displays: "Access Roles Quick-Start"
- [ ] Steps component renders correctly for Direct Access
- [ ] Steps component renders correctly for Chained Access
- [ ] All Step titles are visible and formatted
- [ ] CloudFormation launch buttons display correctly
- [ ] Launch button images load (/assets/stack.png)
- [ ] Note components render with proper styling
- [ ] Warning component renders with proper styling
- [ ] Code blocks render with proper formatting
- [ ] All internal links work (to reference documentation)

#### Inventory Roles Quick-Start (setup/iam-roles/inventory-roles.mdx)

- [ ] Page title displays: "Inventory Roles Quick-Start"
- [ ] Steps component renders correctly for Direct Inventory
- [ ] Steps component renders correctly for Chained Inventory
- [ ] All Step titles are visible and formatted
- [ ] CloudFormation launch buttons display correctly
- [ ] Note components render with proper styling
- [ ] Warning component renders with proper styling
- [ ] All internal links work (to reference documentation)

#### Access Roles Reference (setup/iam-roles/reference/access-reference.mdx)

- [ ] Page title displays: "Access Roles Reference"
- [ ] All 6 template sections render correctly
- [ ] CloudFormation launch buttons display for all templates
- [ ] Parameter tables/lists are formatted correctly
- [ ] Access Method Comparison section renders
- [ ] Deployment Type Comparison section renders
- [ ] Configuration Guidance section renders
- [ ] All permission levels documented
- [ ] Deployment scenarios section renders
- [ ] Troubleshooting section renders
- [ ] All internal links work

#### Inventory Roles Reference (setup/iam-roles/reference/inventory-reference.mdx)

- [ ] Page title displays: "Inventory Roles Reference"
- [ ] All 3 template sections render correctly
- [ ] CloudFormation launch buttons display for all templates
- [ ] Account Type Comparison section renders
- [ ] Access Method Comparison section renders
- [ ] Permissions section renders
- [ ] Deployment scenarios section renders
- [ ] Troubleshooting section renders
- [ ] All internal links work

#### Intermediate Roles Reference (setup/iam-roles/reference/intermediate-reference.mdx)

- [ ] Page title displays: "Intermediate Roles Reference"
- [ ] Overview section renders with architecture diagram
- [ ] Template section renders correctly
- [ ] CloudFormation launch button displays
- [ ] Assume Role Scope Options section renders (3 options)
- [ ] Trust Relationship Configuration section renders
- [ ] Deployment scenarios section renders
- [ ] Integration section renders
- [ ] Security considerations section renders
- [ ] Troubleshooting section renders
- [ ] Warning component renders correctly
- [ ] All internal links work

### Updated Pages

#### Accounts Index (setup/accounts/index.mdx)

- [ ] Page renders correctly
- [ ] New Note section about IAM roles appears
- [ ] Link to IAM roles documentation works
- [ ] All existing content preserved
- [ ] No broken links or formatting issues

#### Organization Inventory (setup/organizations/inventory.mdx)

- [ ] Page renders correctly
- [ ] New Note section about inventory roles appears
- [ ] Link to inventory roles documentation works
- [ ] Updated S3 URLs work correctly
- [ ] All existing content preserved
- [ ] No broken links or formatting issues

## 2. Internal Navigation Testing

### Link Testing

- [ ] Click "Deploy Access Roles →" from index page
- [ ] Click "Deploy Inventory Roles →" from index page
- [ ] Click reference links from access-roles quick-start
- [ ] Click reference links from inventory-roles quick-start
- [ ] Click intermediate reference links from chained sections
- [ ] Click back to quick-start links from reference pages
- [ ] All links navigate to correct pages
- [ ] No 404 errors encountered

### Breadcrumb Navigation

- [ ] Breadcrumbs display correctly on all pages
- [ ] Breadcrumb links work correctly
- [ ] Breadcrumb hierarchy is accurate

### Search Functionality

- [ ] Search for "access roles" returns relevant results
- [ ] Search for "inventory roles" returns relevant results
- [ ] Search for "intermediate roles" returns relevant results
- [ ] Search for "CloudFormation" returns relevant results
- [ ] Search results link to correct pages

## 3. CloudFormation Launch Button Testing

### Button Display

- [ ] All launch buttons display the stack image
- [ ] Image loads correctly (/assets/stack.png)
- [ ] Buttons are clickable
- [ ] Hover state works correctly

### URL Validation (Click Each Button)

#### Access Role Templates

- [ ] Browser Access Role button opens AWS console
- [ ] Direct Access Role button opens AWS console
- [ ] Chained Access Role button opens AWS console
- [ ] Browser Access Role StackSet button opens AWS console
- [ ] Direct Access Role StackSet button opens AWS console
- [ ] Chained Access Role StackSet button opens AWS console

#### Inventory Role Templates

- [ ] Direct Org Inventory Role button opens AWS console
- [ ] Chained Org Inventory Role button opens AWS console
- [ ] Standalone Account Inventory Role button opens AWS console

#### Intermediate Role Template

- [ ] Trusted Intermediate Role button opens AWS console

### AWS Console Verification (Optional - Requires AWS Access)

For each button clicked:
- [ ] AWS CloudFormation console opens
- [ ] Correct region is selected (us-east-1)
- [ ] Template URL is populated correctly
- [ ] Stack name is pre-filled
- [ ] Template loads successfully in AWS console
- [ ] Parameters are visible and correct

## 4. Component Rendering

### Steps Component

- [ ] Steps render as numbered sequence
- [ ] Step titles are bold and prominent
- [ ] Step content is properly indented
- [ ] Nested content (lists, code blocks) renders correctly
- [ ] Steps are visually distinct from each other

### Note Component

- [ ] Note boxes have distinct styling
- [ ] Note icon displays correctly
- [ ] Note content is readable
- [ ] Note boxes stand out from regular text
- [ ] Multiple notes on same page render consistently

### Warning Component

- [ ] Warning boxes have distinct styling (different from Note)
- [ ] Warning icon displays correctly
- [ ] Warning content is readable
- [ ] Warning boxes are visually prominent
- [ ] Color scheme indicates importance

### Card and CardGroup Components

- [ ] Cards display in grid layout
- [ ] Card icons render correctly
- [ ] Card titles are visible
- [ ] Card descriptions are readable
- [ ] Cards are clickable
- [ ] Hover state works correctly

### Code Blocks

- [ ] Code blocks have syntax highlighting
- [ ] Code is properly formatted
- [ ] Copy button appears on hover
- [ ] Code blocks are scrollable if needed
- [ ] Inline code has distinct styling

### Tables

- [ ] Tables render correctly
- [ ] Table headers are styled
- [ ] Table rows are readable
- [ ] Tables are responsive on mobile
- [ ] Table content doesn't overflow

## 5. Mobile Responsiveness

### Test on Mobile Device or Browser Dev Tools

Set viewport to:
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)

### Mobile Testing Checklist

- [ ] Navigation menu is accessible
- [ ] Sidebar collapses to hamburger menu
- [ ] All pages are readable without horizontal scroll
- [ ] Steps components are readable on mobile
- [ ] Tables are responsive or scrollable
- [ ] Code blocks are scrollable
- [ ] Images scale appropriately
- [ ] Buttons are tappable (not too small)
- [ ] Links are tappable (not too close together)
- [ ] Cards stack vertically on mobile
- [ ] Note and Warning boxes are readable

## 6. Cross-Browser Testing

### Chrome

- [ ] All pages render correctly
- [ ] All components display properly
- [ ] All links work
- [ ] No console errors
- [ ] Performance is acceptable

### Firefox

- [ ] All pages render correctly
- [ ] All components display properly
- [ ] All links work
- [ ] No console errors
- [ ] Performance is acceptable

### Safari

- [ ] All pages render correctly
- [ ] All components display properly
- [ ] All links work
- [ ] No console errors
- [ ] Performance is acceptable

### Edge

- [ ] All pages render correctly
- [ ] All components display properly
- [ ] All links work
- [ ] No console errors
- [ ] Performance is acceptable

## 7. Content Quality Review

### Readability

- [ ] All text is readable (font size, contrast)
- [ ] Headings are properly hierarchical
- [ ] Paragraphs are well-spaced
- [ ] Lists are properly formatted
- [ ] No orphaned text or awkward line breaks

### Accuracy

- [ ] All S3 URLs are correct
- [ ] All parameter names match templates
- [ ] All role names are consistent
- [ ] All account IDs are correct (684035162433)
- [ ] All technical details are accurate

### Completeness

- [ ] All templates are documented
- [ ] All parameters are explained
- [ ] All deployment methods are covered
- [ ] All security considerations are mentioned
- [ ] All troubleshooting scenarios are addressed

### Consistency

- [ ] Terminology is consistent across pages
- [ ] Formatting is consistent across pages
- [ ] Structure is consistent across similar pages
- [ ] Voice and tone are consistent

## 8. Performance Testing

### Page Load Times

- [ ] Index page loads quickly (< 2 seconds)
- [ ] Quick-start pages load quickly (< 2 seconds)
- [ ] Reference pages load acceptably (< 3 seconds)
- [ ] Images load without delay
- [ ] No layout shift during load

### Navigation Performance

- [ ] Page transitions are smooth
- [ ] No lag when clicking links
- [ ] Search is responsive
- [ ] Sidebar navigation is smooth

## 9. Accessibility Testing

### Keyboard Navigation

- [ ] All links are keyboard accessible (Tab key)
- [ ] Focus indicators are visible
- [ ] Skip links work correctly
- [ ] Keyboard shortcuts work (if any)

### Screen Reader Testing (Optional)

- [ ] Headings are properly announced
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Tables have proper headers
- [ ] Form elements have labels (if any)

### Color Contrast

- [ ] Text has sufficient contrast
- [ ] Links are distinguishable
- [ ] Buttons have sufficient contrast
- [ ] Warning/Note boxes are readable

## 10. SEO and Metadata

### Page Metadata

- [ ] All pages have title tags
- [ ] All pages have description meta tags
- [ ] Titles are descriptive and unique
- [ ] Descriptions are informative

### URL Structure

- [ ] URLs are clean and descriptive
- [ ] URLs follow consistent pattern
- [ ] No broken URLs or redirects

## Testing Summary

### Issues Found

Document any issues found during testing:

| Issue # | Page | Component | Severity | Description | Status |
|---------|------|-----------|----------|-------------|--------|
| | | | | | |

### Sign-Off

- [ ] All critical issues resolved
- [ ] All high-priority issues resolved
- [ ] Medium/low priority issues documented for future work
- [ ] Documentation ready for production deployment

**Tested By:** ___________________
**Date:** ___________________
**Signature:** ___________________

## Notes

Use this section for any additional observations or recommendations:

---

## Quick Test Commands

```bash
# Start Mintlify preview
npx mintlify dev

# Run validation script
node validate-documentation.js

# Check for broken links (if tool available)
# npm run check-links
```

## Resources

- [Mintlify Documentation](https://mintlify.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/)
