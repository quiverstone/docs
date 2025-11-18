# Design Document

## Overview

This design outlines the restructuring and updating of Quiverstone's role deployment documentation. The primary goal is to create concise, action-oriented quick-start guides that enable users to deploy IAM roles quickly, while providing comprehensive reference documentation for users who need detailed information. The documentation will be reorganized into a dedicated roles section with updated CloudFormation template URLs reflecting the new S3 bucket paths.

The design follows a two-tier documentation approach:
1. **Quick-Start Guides**: Minimal, step-by-step deployment instructions for common scenarios
2. **Reference Documentation**: Comprehensive details for advanced users and troubleshooting

## Architecture

### Documentation Structure

```
setup/
├── iam-roles/
│   ├── index.mdx                    # Overview and role selection guide
│   ├── access-roles.mdx             # Quick-start for access roles (includes chained setup)
│   ├── inventory-roles.mdx          # Quick-start for inventory roles (includes chained setup)
│   └── reference/
│       ├── access-reference.mdx     # Comprehensive access role details
│       ├── inventory-reference.mdx  # Comprehensive inventory role details
│       └── intermediate-reference.mdx # Comprehensive intermediate role details
├── accounts/
│   └── index.mdx                    # Updated with links to IAM roles documentation
└── organizations/
    └── inventory.mdx                # Updated with links to IAM roles documentation
```

**Note:** Intermediate roles are documented within the access and inventory quick-starts as part of the chained deployment process, not as a standalone guide. The intermediate reference documentation provides comprehensive details for advanced users.

### Content Organization Pattern

**Access and Inventory Quick-Start Guides** (main files):
- Brief purpose statement (1-2 sentences)
- When to use this role type
- **Direct Deployment** section:
  - Quick launch button with deployment steps
  - Essential parameters only
- **Chained Deployment** section (when applicable):
  - Brief explanation of when chained access is needed
  - Step 1: Deploy intermediate role (with note about reusing existing)
  - Step 2: Deploy destination role
  - Essential parameters for both roles
- Link to comprehensive reference

**Reference Documentation** (reference subfolder):
- All template variants
- Detailed parameter explanations
- Security considerations
- Deployment scenarios
- Troubleshooting
- Integration patterns

**Intermediate Role Documentation**:
- No standalone quick-start guide
- Documented as part of chained deployment in access and inventory guides
- Comprehensive reference documentation for advanced users
- Emphasizes that intermediate role must be deployed first
- Notes that existing intermediate roles can be reused

## Components and Interfaces

### MDX Components

The documentation will use Mintlify's MDX components:

**Steps Component**: For sequential deployment procedures
```mdx
<Steps>
  <Step title="Launch Template">
    Content here
  </Step>
  <Step title="Configure Parameters">
    Content here
  </Step>
</Steps>
```

**Note Component**: For helpful information
```mdx
<Note>
Important information that helps users
</Note>
```

**Warning Component**: For critical warnings
```mdx
<Warning>
Critical information users must know
</Warning>
```

**Quick Launch Buttons**: CloudFormation stack launch links
```mdx
[![Launch Stack](/assets/stack.png)](https://console.aws.amazon.com/cloudformation/...)
```

### URL Structure

All CloudFormation template URLs follow this pattern:
```
https://s3.us-east-2.amazonaws.com/assets.quiverstone.io/role-catalog/{category}/{template-name}.yaml
```

Categories:
- `access/` - Access role templates
- `inventory/` - Inventory role templates
- `intermediate/` - Intermediate role templates

## Data Models

### Documentation Page Structure

Each quick-start guide follows this structure:

```yaml
frontmatter:
  title: string          # Page title
  description: string    # Brief description for navigation

content:
  - purpose: string      # 1-2 sentence purpose
  - when_to_use: list    # Bullet points of use cases
  - deployment_steps:    # Steps component
      - launch_template
      - configure_parameters
      - create_stack
      - copy_outputs
      - configure_quiverstone
  - essential_parameters: list  # Only critical parameters
  - next_steps: list     # What to do after deployment
  - reference_link: url  # Link to comprehensive reference
```

### Reference Documentation Structure

```yaml
frontmatter:
  title: string
  description: string

content:
  - overview: string
  - all_templates: list  # All template variants
  - deployment_methods: object
      - individual_account
      - stackset
      - service_catalog
  - parameters: object   # All parameters with full descriptions
  - security: object
      - authentication
      - authorization
      - audit
  - scenarios: list      # Detailed deployment scenarios
  - troubleshooting: list
  - integration: object  # How roles work together
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: S3 URL Consistency

*For any* CloudFormation template URL in the documentation, it should use the base path `https://s3.us-east-2.amazonaws.com/assets.quiverstone.io/role-catalog/`

**Validates: Requirements 1.5**

### Property 2: Internal Link Format

*For any* link in the documentation that points to another documentation page within the project, it should use a relative path (not an absolute URL)

**Validates: Requirements 5.3, 6.5**

### Property 3: External Link Format

*For any* link in the documentation that points to a resource outside the project (AWS docs, external sites), it should use an absolute URL starting with `http://` or `https://`

**Validates: Requirements 6.5**

### Property 4: Frontmatter Completeness

*For any* MDX file in the IAM roles documentation, it should contain frontmatter with both `title` and `description` fields

**Validates: Requirements 6.1**

### Property 5: CloudFormation Launch Link Validity

*For any* CloudFormation quick launch button in the documentation, the URL should be a valid AWS CloudFormation console link with a templateURL parameter pointing to an S3 bucket

**Validates: Requirements 2.3**

## Error Handling

### Missing Files

If reference documentation files are not created, quick-start guides should still function but will have broken links. The implementation should:
- Create all planned files in the correct structure
- Verify links point to existing files before completion

### Invalid URLs

If S3 bucket paths are incorrect:
- CloudFormation launch buttons will fail when users click them
- Users will see AWS console errors
- Implementation should validate all URLs match the required pattern

### Broken Cross-References

If links between documents are incorrect:
- Users will encounter 404 errors when navigating
- Documentation navigation will be broken
- Implementation should verify all internal links resolve to existing files

### Missing MDX Components

If required MDX components (Steps, Note, Warning) are not properly formatted:
- Mintlify may fail to render the page correctly
- Users may see raw markdown instead of formatted components
- Implementation should follow Mintlify MDX syntax exactly

## Testing Strategy

### Manual Testing

Since this is a documentation update, testing will primarily be manual:

**Visual Review:**
- Review each page in Mintlify preview
- Verify formatting renders correctly
- Check that Steps components display properly
- Ensure Note and Warning components are styled correctly

**Navigation Testing:**
- Click all internal links to verify they work
- Test CloudFormation launch buttons (in AWS console)
- Verify breadcrumb navigation works
- Check that reference links from quick-starts work

**Content Verification:**
- Verify all S3 URLs use correct base path
- Check that all template names match actual files
- Ensure parameter descriptions are accurate
- Confirm deployment steps are complete

**Cross-Browser Testing:**
- Test documentation in multiple browsers
- Verify mobile responsiveness
- Check that code blocks render correctly

### Automated Testing

Limited automated testing is possible for documentation:

**Link Validation:**
- Script to extract all links from MDX files
- Verify internal links point to existing files
- Check external links return 200 status codes
- Validate S3 URLs match required pattern

**Frontmatter Validation:**
- Parse all MDX files
- Verify frontmatter exists
- Check required fields (title, description) are present
- Ensure no syntax errors in frontmatter

**URL Pattern Validation:**
- Extract all S3 URLs from documentation
- Verify they match the pattern: `https://s3.us-east-2.amazonaws.com/assets.quiverstone.io/role-catalog/{category}/{template}.yaml`
- Report any URLs that don't match

**File Structure Validation:**
- Verify all expected files exist
- Check directory structure matches design
- Ensure no orphaned files

### Testing Checklist

Before considering the documentation complete:

- [ ] All MDX files have valid frontmatter
- [ ] All internal links resolve to existing files
- [ ] All CloudFormation launch buttons use correct S3 URLs
- [ ] All S3 URLs use the new base path
- [ ] Steps components render correctly in Mintlify
- [ ] Note and Warning components display properly
- [ ] Quick-start guides link to reference documentation
- [ ] Reference documentation is comprehensive
- [ ] Existing account and organization pages updated with links
- [ ] Navigation between pages works smoothly
- [ ] Mobile view is readable
- [ ] Code examples are properly formatted

