# Implementation Plan

- [x] 1. Set up documentation structure
  - Create `setup/iam-roles/` directory
  - Create `setup/iam-roles/reference/` subdirectory
  - _Requirements: 1.1, 1.2_

- [x] 2. Create IAM roles overview page
  - Create `setup/iam-roles/index.mdx` with frontmatter
  - Write brief overview of IAM role types (access, inventory, intermediate)
  - Add decision guide for choosing role types
  - Include links to quick-start guides
  - _Requirements: 1.1, 6.1_

- [x] 3. Create access roles quick-start guide
  - Create `setup/iam-roles/access-roles.mdx` with frontmatter
  - Write brief purpose statement (1-2 sentences)
  - Add "When to use" section with bullet points
  - _Requirements: 2.1, 6.1_

- [x] 3.1 Add direct access deployment section
  - Add Steps component for direct access deployment
  - Include CloudFormation launch button with correct S3 URL
  - Document essential parameters (role name, external ID, permissions)
  - Add brief configuration guidance
  - _Requirements: 2.1, 2.2, 2.3, 1.5_

- [x] 3.2 Add chained access deployment section
  - Add brief explanation of when chained access is needed
  - Add Step 1: Deploy intermediate role with launch button
  - Note that existing intermediate roles can be reused
  - Add Step 2: Deploy destination access role with launch button
  - Document essential parameters for both roles
  - Emphasize deployment order (intermediate first)
  - _Requirements: 4.1, 4.3_

- [x] 3.3 Add access roles reference link
  - Add link to comprehensive reference documentation
  - _Requirements: 2.5_

- [x] 4. Create inventory roles quick-start guide
  - Create `setup/iam-roles/inventory-roles.mdx` with frontmatter
  - Write brief purpose statement (1-2 sentences)
  - Add "When to use" section with bullet points
  - _Requirements: 3.1, 6.1_

- [x] 4.1 Add direct inventory deployment section
  - Add Steps component for direct org inventory deployment
  - Include CloudFormation launch button with correct S3 URL
  - Document essential parameters (role name, external ID)
  - Add brief configuration guidance
  - _Requirements: 3.1, 3.2, 1.5_

- [x] 4.2 Add chained inventory deployment section
  - Add brief explanation of when chained access is needed
  - Add Step 1: Deploy intermediate role with launch button
  - Note that existing intermediate roles can be reused
  - Add Step 2: Deploy destination inventory role with launch button
  - Document essential parameters for both roles
  - Emphasize deployment order (intermediate first)
  - _Requirements: 3.3, 4.1, 4.3_

- [x] 4.3 Add standalone account inventory section
  - Briefly mention standalone account inventory option
  - Add link to reference documentation for details
  - _Requirements: 3.3_

- [x] 4.4 Add inventory roles reference link
  - Add link to comprehensive reference documentation
  - _Requirements: 3.5_

- [x] 5. Create access roles reference documentation
  - Create `setup/iam-roles/reference/access-reference.mdx` with frontmatter
  - Write comprehensive overview of access roles
  - _Requirements: 2.5, 6.1_

- [x] 5.1 Document all access role templates
  - Document browser-access-role.yaml with all parameters
  - Document direct-access-role.yaml with all parameters
  - Document chained-access-role.yaml with all parameters
  - Document browser-access-role-stackset.yaml with all parameters
  - Document direct-access-role-stackset.yaml with all parameters
  - Document chained-access-role-stackset.yaml with all parameters
  - Include CloudFormation launch buttons for each
  - _Requirements: 2.5, 1.5_

- [x] 5.2 Add access method comparison section
  - Explain browser-based access with use cases
  - Explain direct access with use cases
  - Explain chained access with use cases
  - Include security considerations for each
  - _Requirements: 2.5_

- [x] 5.3 Add deployment type comparison section
  - Explain individual account deployment
  - Explain StackSet deployment
  - Include when to use each approach
  - _Requirements: 2.5_

- [x] 5.4 Add configuration guidance section
  - Document all permission levels with descriptions
  - Explain External ID configuration
  - Provide role naming best practices
  - Document StackSet configuration options
  - _Requirements: 2.5_

- [x] 5.5 Add deployment scenarios section
  - Provide scenarios for small organizations
  - Provide scenarios for medium organizations
  - Provide scenarios for large organizations
  - Provide scenarios for highly regulated environments
  - _Requirements: 2.5_

- [x] 5.6 Add troubleshooting section
  - Document common issues and solutions
  - Provide validation steps
  - Include debug checklist
  - _Requirements: 2.5_

- [x] 6. Create inventory roles reference documentation
  - Create `setup/iam-roles/reference/inventory-reference.mdx` with frontmatter
  - Write comprehensive overview of inventory roles
  - _Requirements: 3.5, 6.1_

- [x] 6.1 Document all inventory role templates
  - Document direct-org-inventory-role.yaml with all parameters
  - Document chained-org-inventory-role.yaml with all parameters
  - Document standalone-account-inventory-role.yaml with all parameters
  - Include CloudFormation launch buttons for each
  - _Requirements: 3.5, 1.5_

- [x] 6.2 Add account type comparison section
  - Explain management account inventory
  - Explain delegated administrator account inventory
  - Explain standalone account inventory
  - Include when to use each approach
  - _Requirements: 3.5_

- [x] 6.3 Add access method comparison section
  - Explain direct inventory access
  - Explain chained inventory access
  - Include security considerations
  - _Requirements: 3.5_

- [x] 6.4 Add permissions section
  - Document AWS Organizations permissions granted
  - Explain what permissions enable
  - Clarify what permissions do NOT allow
  - _Requirements: 3.5_

- [x] 6.5 Add deployment scenarios section
  - Standard organization with management account access
  - Organization with delegated administrator
  - High-security organization with chained access
  - Standalone account scenarios
  - Multiple standalone accounts
  - _Requirements: 3.5_

- [x] 6.6 Add troubleshooting section
  - Document common issues and solutions
  - Provide validation steps
  - _Requirements: 3.5_

- [x] 7. Create intermediate roles reference documentation
  - Create `setup/iam-roles/reference/intermediate-reference.mdx` with frontmatter
  - Write comprehensive overview of intermediate roles
  - Explain role in chained access architecture
  - _Requirements: 4.5, 6.1_

- [x] 7.1 Document intermediate role template
  - Document trusted-intermediate-role.yaml with all parameters
  - Include CloudFormation launch button
  - _Requirements: 4.5, 1.5_

- [x] 7.2 Add assume role scope options section
  - Explain any-role-any-account scope
  - Explain specific-account-and-role scope
  - Explain specific-role-any-account scope (recommended)
  - Include when to use each option
  - _Requirements: 4.5_

- [x] 7.3 Add trust relationship configuration section
  - Explain trust policy structure
  - Document External ID security
  - Provide best practices
  - _Requirements: 4.5_

- [x] 7.4 Add deployment scenarios section
  - Single organization with chained inventory
  - Multiple organizations with chained access
  - Organization-wide chained account access
  - Maximum security single destination
  - Maximum flexibility multi-organization
  - _Requirements: 4.5_

- [x] 7.5 Add integration section
  - Explain integration with chained access roles
  - Explain integration with chained inventory roles
  - Document deployment order
  - Explain trust configuration options
  - _Requirements: 4.5_

- [x] 8. Update accounts index page
  - Open `setup/accounts/index.mdx`
  - Add section or note about IAM role deployment
  - Add link to `setup/iam-roles/access-roles.mdx`
  - Preserve all existing content
  - _Requirements: 5.1, 5.4_

- [x] 9. Update organization inventory page
  - Open `setup/organizations/inventory.mdx`
  - Update CloudFormation template URLs to use new S3 paths
  - Add link to `setup/iam-roles/inventory-roles.mdx` for detailed information
  - Preserve all existing content and structure
  - _Requirements: 5.2, 5.4, 1.5_

- [x] 10. Validate all documentation
  - Verify all MDX files have proper frontmatter with title and description
  - Check all internal links use relative paths
  - Check all external links use absolute URLs
  - Verify all S3 URLs use correct base path
  - Ensure all CloudFormation launch buttons have correct URLs
  - _Requirements: 6.1, 6.5, 1.5_

- [x] 11. Final review and testing
  - Review all pages in Mintlify preview
  - Test all internal navigation links
  - Verify Steps components render correctly
  - Check Note and Warning components display properly
  - Test CloudFormation launch buttons (verify they open AWS console)
  - Verify mobile responsiveness
  - _Requirements: All_

