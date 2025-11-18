# Requirements Document

## Introduction

This feature involves updating the Quiverstone documentation to reflect changes to AWS IAM role CloudFormation templates and their S3 storage locations. The role templates (Access and Inventory roles) have been updated in a separate repository, and the documentation needs to be reorganized and updated to accurately reflect these changes. The documentation should be restructured to create a centralized roles section that can be referenced from multiple places in the documentation.

## Glossary

- **CloudFormation Template**: AWS infrastructure-as-code template files in YAML format that define IAM roles
- **S3 Bucket Path**: The location in Amazon S3 where CloudFormation templates are stored
- **Access Role**: IAM role that provides varying levels of access to AWS accounts (read-only, administrator, etc.)
- **Inventory Role**: IAM role that provides read-only access to AWS Organizations for account discovery
- **Intermediate Role**: IAM role deployed in a trusted account to enable chained role assumption
- **Direct Access**: Role assumption pattern where Quiverstone directly assumes a role in the target account
- **Chained Access**: Role assumption pattern where Quiverstone assumes a role through an intermediate account
- **StackSet**: AWS CloudFormation feature for deploying templates across multiple accounts in an organization
- **MDX File**: Markdown file with JSX support used by Mintlify documentation platform
- **Role Catalog**: The collection of CloudFormation templates for deploying Quiverstone IAM roles

## Requirements

### Requirement 1

**User Story:** As a documentation reader, I want concise quick-start guides for role deployment, so that I can deploy roles quickly without reading excessive documentation.

#### Acceptance Criteria

1. WHEN the documentation structure is created THEN the system SHALL create a new directory at `setup/iam-roles/` to contain all IAM role deployment documentation
2. WHEN role documentation is organized THEN the system SHALL create separate MDX files for access roles and inventory roles, with intermediate role deployment integrated into chained access sections
3. WHEN quick-start guides are written THEN the system SHALL focus on essential deployment steps with minimal explanatory text
4. WHEN comprehensive reference documentation is needed THEN the system SHALL create separate detailed reference sections linked from quick-start guides
5. WHEN S3 bucket paths are documented THEN the system SHALL use the updated paths `https://s3.us-east-2.amazonaws.com/assets.quiverstone.io/role-catalog/`

### Requirement 2

**User Story:** As a documentation reader, I want quick-start deployment instructions for access roles, so that I can deploy them immediately with minimal reading.

#### Acceptance Criteria

1. WHEN access role quick-start is created THEN the system SHALL provide deployment steps for the most common scenarios (direct and StackSet)
2. WHEN deployment steps are written THEN the system SHALL use numbered steps with only essential information
3. WHEN quick launch buttons are included THEN the system SHALL provide CloudFormation console links with the correct S3 template URLs
4. WHEN parameter guidance is provided THEN the system SHALL list only critical parameters with brief descriptions
5. WHEN comprehensive details are needed THEN the system SHALL link to a separate reference section with full explanations of all six templates, access methods, and security considerations

### Requirement 3

**User Story:** As a documentation reader, I want streamlined inventory role deployment steps, so that I can set up organization inventory quickly.

#### Acceptance Criteria

1. WHEN inventory role quick-start is created THEN the system SHALL provide concise deployment steps for the most common scenario (direct org inventory)
2. WHEN deployment steps are written THEN the system SHALL use a step-by-step format with quick launch buttons and minimal explanatory text
3. WHEN alternative scenarios are mentioned THEN the system SHALL briefly note chained and standalone options with links to detailed reference
4. WHEN parameters are documented THEN the system SHALL list only the essential parameters users need to configure
5. WHEN comprehensive details are needed THEN the system SHALL link to a separate reference section with full explanations of all templates, account types, permissions, and troubleshooting

### Requirement 4

**User Story:** As a documentation reader, I want intermediate role deployment integrated into chained access instructions, so that I understand the complete deployment sequence without reading separate guides.

#### Acceptance Criteria

1. WHEN chained deployment is documented THEN the system SHALL include intermediate role deployment as the first step in the chained access process
2. WHEN intermediate role deployment is explained THEN the system SHALL note that existing intermediate roles can be reused
3. WHEN deployment order is documented THEN the system SHALL clearly indicate that the intermediate role must be deployed before the destination role
4. WHEN intermediate role parameters are documented THEN the system SHALL list only critical parameters with brief guidance
5. WHEN comprehensive details are needed THEN the system SHALL link to a separate intermediate reference section with full explanations of scope options, trust relationships, and integration patterns

### Requirement 5

**User Story:** As a documentation reader navigating existing documentation, I want updated references to IAM role documentation, so that I can find detailed IAM role information from account and organization setup pages.

#### Acceptance Criteria

1. WHEN the accounts index page is updated THEN the system SHALL add references to the new IAM roles documentation section
2. WHEN the organization inventory page is updated THEN the system SHALL link to the detailed IAM inventory role documentation
3. WHEN cross-references are added THEN the system SHALL use appropriate MDX link syntax for internal documentation links
4. WHEN existing content is preserved THEN the system SHALL maintain all current functionality descriptions and user guidance
5. WHEN navigation is improved THEN the system SHALL ensure readers can easily navigate between setup guides and detailed IAM role documentation

### Requirement 6

**User Story:** As a documentation maintainer, I want consistent formatting and structure across all IAM role documentation, so that the documentation is professional and easy to maintain.

#### Acceptance Criteria

1. WHEN MDX files are created THEN the system SHALL include proper frontmatter with title and description fields
2. WHEN quick-start guides are structured THEN the system SHALL use Steps components for deployment procedures and minimize prose
3. WHEN reference sections are structured THEN the system SHALL use collapsible sections or separate pages to avoid overwhelming readers
4. WHEN MDX components are used THEN the system SHALL use Note for helpful tips and Warning for critical information
5. WHEN links are included THEN the system SHALL use relative paths for internal links and absolute URLs for external resources

