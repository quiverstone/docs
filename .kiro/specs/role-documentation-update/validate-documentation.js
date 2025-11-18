#!/usr/bin/env node

/**
 * Documentation Validation Script
 * Validates IAM roles documentation for:
 * - Frontmatter completeness
 * - Internal link format (relative paths)
 * - External link format (absolute URLs)
 * - S3 URL consistency
 * - CloudFormation launch button validity
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = 'setup/iam-roles';
const S3_BASE_PATH = 'https://s3.us-east-2.amazonaws.com/assets.quiverstone.io/role-catalog/';
const CF_CONSOLE_BASE = 'https://console.aws.amazon.com/cloudformation/';

// Results tracking
const results = {
  filesChecked: 0,
  errors: [],
  warnings: [],
  success: []
};

/**
 * Read all MDX files recursively
 */
function findMdxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract frontmatter from MDX file
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

/**
 * Validate frontmatter has required fields
 */
function validateFrontmatter(filePath, content) {
  const frontmatter = extractFrontmatter(content);

  if (!frontmatter) {
    results.errors.push({
      file: filePath,
      type: 'frontmatter',
      message: 'Missing frontmatter block'
    });
    return;
  }

  if (!frontmatter.title) {
    results.errors.push({
      file: filePath,
      type: 'frontmatter',
      message: 'Missing required field: title'
    });
  }

  if (!frontmatter.description) {
    results.errors.push({
      file: filePath,
      type: 'frontmatter',
      message: 'Missing required field: description'
    });
  }

  if (frontmatter.title && frontmatter.description) {
    results.success.push({
      file: filePath,
      type: 'frontmatter',
      message: 'Valid frontmatter with title and description'
    });
  }
}

/**
 * Extract all markdown links from content
 */
function extractLinks(content) {
  const links = [];

  // Markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      type: 'markdown'
    });
  }

  // HTML href links: href="url"
  const htmlLinkRegex = /href=["']([^"']+)["']/g;

  while ((match = htmlLinkRegex.exec(content)) !== null) {
    links.push({
      text: 'HTML link',
      url: match[1],
      type: 'html'
    });
  }

  return links;
}

/**
 * Validate link format (internal vs external)
 */
function validateLinks(filePath, content) {
  const links = extractLinks(content);

  for (const link of links) {
    const url = link.url;

    // Skip anchor links
    if (url.startsWith('#')) {
      continue;
    }

    // Check if it's an external link
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // External links should be absolute URLs
      results.success.push({
        file: filePath,
        type: 'external-link',
        message: `Valid external link: ${url}`
      });
    } else {
      // Internal links should use relative paths
      if (url.startsWith('/')) {
        results.success.push({
          file: filePath,
          type: 'internal-link',
          message: `Valid internal link: ${url}`
        });
      } else {
        results.warnings.push({
          file: filePath,
          type: 'internal-link',
          message: `Internal link may not be relative: ${url}`
        });
      }
    }
  }
}

/**
 * Extract all S3 URLs from content
 */
function extractS3Urls(content) {
  const s3Urls = [];
  const s3Regex = /https:\/\/s3[^"'\s)]+/g;
  let match;

  while ((match = s3Regex.exec(content)) !== null) {
    s3Urls.push(match[0]);
  }

  return s3Urls;
}

/**
 * Validate S3 URLs use correct base path
 */
function validateS3Urls(filePath, content) {
  const s3Urls = extractS3Urls(content);

  for (const url of s3Urls) {
    if (url.startsWith(S3_BASE_PATH)) {
      results.success.push({
        file: filePath,
        type: 's3-url',
        message: `Valid S3 URL: ${url}`
      });
    } else {
      results.errors.push({
        file: filePath,
        type: 's3-url',
        message: `Invalid S3 URL (wrong base path): ${url}`
      });
    }
  }
}

/**
 * Extract CloudFormation launch buttons
 */
function extractCfLaunchButtons(content) {
  const buttons = [];
  const cfRegex = /\[!\[Launch Stack\]\([^\)]+\)\]\((https:\/\/console\.aws\.amazon\.com\/cloudformation[^\)]+)\)/g;
  let match;

  while ((match = cfRegex.exec(content)) !== null) {
    buttons.push(match[1]);
  }

  return buttons;
}

/**
 * Validate CloudFormation launch buttons
 */
function validateCfLaunchButtons(filePath, content) {
  const buttons = extractCfLaunchButtons(content);

  for (const url of buttons) {
    // Check if it's a valid CF console URL
    if (!url.startsWith(CF_CONSOLE_BASE)) {
      results.errors.push({
        file: filePath,
        type: 'cf-button',
        message: `Invalid CloudFormation console URL: ${url}`
      });
      continue;
    }

    // Check if it has templateURL parameter
    if (!url.includes('templateURL=')) {
      results.errors.push({
        file: filePath,
        type: 'cf-button',
        message: `CloudFormation URL missing templateURL parameter: ${url}`
      });
      continue;
    }

    // Extract templateURL value
    const templateUrlMatch = url.match(/templateURL=([^&]+)/);
    if (templateUrlMatch) {
      const templateUrl = decodeURIComponent(templateUrlMatch[1]);

      // Validate it's an S3 URL with correct base path
      if (templateUrl.startsWith(S3_BASE_PATH)) {
        results.success.push({
          file: filePath,
          type: 'cf-button',
          message: `Valid CloudFormation launch button with correct S3 URL`
        });
      } else {
        results.errors.push({
          file: filePath,
          type: 'cf-button',
          message: `CloudFormation button has invalid S3 URL: ${templateUrl}`
        });
      }
    }
  }
}

/**
 * Validate a single file
 */
function validateFile(filePath) {
  results.filesChecked++;

  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\nValidating: ${filePath}`);

  validateFrontmatter(filePath, content);
  validateLinks(filePath, content);
  validateS3Urls(filePath, content);
  validateCfLaunchButtons(filePath, content);
}

/**
 * Print results
 */
function printResults() {
  console.log('\n' + '='.repeat(80));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(80));

  console.log(`\nFiles checked: ${results.filesChecked}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Warnings: ${results.warnings.length}`);
  console.log(`Successes: ${results.success.length}`);

  if (results.errors.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('ERRORS:');
    console.log('-'.repeat(80));
    for (const error of results.errors) {
      console.log(`\n[${error.type}] ${error.file}`);
      console.log(`  ${error.message}`);
    }
  }

  if (results.warnings.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('WARNINGS:');
    console.log('-'.repeat(80));
    for (const warning of results.warnings) {
      console.log(`\n[${warning.type}] ${warning.file}`);
      console.log(`  ${warning.message}`);
    }
  }

  console.log('\n' + '='.repeat(80));

  if (results.errors.length === 0) {
    console.log('✓ All validation checks passed!');
    return 0;
  } else {
    console.log('✗ Validation failed with errors');
    return 1;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('IAM Roles Documentation Validation');
  console.log('='.repeat(80));

  // Find all MDX files
  const files = findMdxFiles(DOCS_DIR);
  console.log(`\nFound ${files.length} MDX files to validate`);

  // Validate each file
  for (const file of files) {
    validateFile(file);
  }

  // Print results
  const exitCode = printResults();
  process.exit(exitCode);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { validateFile, extractFrontmatter, extractLinks, extractS3Urls };
