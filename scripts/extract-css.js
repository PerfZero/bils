#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function usage() {
  const msg = [
    "Usage:",
    "  node scripts/extract-css.js --component <path> --css <path> [--out <path>]",
    "",
    "Notes:",
    "  - Extracts rules from the CSS file that match static className strings in the component.",
    "  - If --out is omitted, prints to stdout.",
  ].join("\n");
  console.error(msg);
}

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return null;
  }
  return process.argv[idx + 1];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractClassNames(componentSource) {
  const set = new Set();
  const patterns = [
    /className\s*=\s*"([^"]+)"/g,
    /className\s*=\s*'([^']+)'/g,
    /className\s*=\s*\{\s*"([^"]+)"\s*\}/g,
    /className\s*=\s*\{\s*'([^']+)'\s*\}/g,
    /className\s*=\s*\{\s*`([^`$]+)`\s*\}/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(componentSource)) !== null) {
      const raw = match[1];
      raw
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean)
        .forEach((token) => {
          set.add(token);
        });
    }
  }

  return set;
}

function selectorHasMatch(selector, classSet) {
  for (const className of classSet) {
    const re = new RegExp(`\\.${escapeRegExp(className)}(?![\\w-])`);
    if (re.test(selector)) {
      return true;
    }
  }
  return false;
}

function findMatchingBrace(css, startIndex) {
  let depth = 1;
  for (let i = startIndex; i < css.length; i += 1) {
    const ch = css[i];
    if (ch === "{") {
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

function extractBlocks(css, classSet) {
  let i = 0;
  const out = [];

  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) {
      i += 1;
    }
    if (i >= css.length) {
      break;
    }

    const start = i;
    if (css[i] === "@") {
      let headerEnd = i;
      while (headerEnd < css.length && css[headerEnd] !== "{" && css[headerEnd] !== ";") {
        headerEnd += 1;
      }

      if (headerEnd >= css.length) {
        break;
      }

      if (css[headerEnd] === ";") {
        i = headerEnd + 1;
        continue;
      }

      const bodyStart = headerEnd + 1;
      const bodyEnd = findMatchingBrace(css, bodyStart);
      if (bodyEnd === -1) {
        break;
      }

      const header = css.slice(start, headerEnd + 1);
      const body = css.slice(bodyStart, bodyEnd);
      const filteredBody = extractBlocks(body, classSet);
      if (filteredBody.trim()) {
        out.push(`${header}${filteredBody}}`);
      }
      i = bodyEnd + 1;
      continue;
    }

    const braceIndex = css.indexOf("{", i);
    if (braceIndex === -1) {
      break;
    }
    const selector = css.slice(start, braceIndex).trim();
    const bodyStart = braceIndex + 1;
    const bodyEnd = findMatchingBrace(css, bodyStart);
    if (bodyEnd === -1) {
      break;
    }

    if (selectorHasMatch(selector, classSet)) {
      out.push(css.slice(start, bodyEnd + 1));
    }
    i = bodyEnd + 1;
  }

  return out.join("");
}

function main() {
  const componentPath = getArg("--component");
  const cssPath = getArg("--css");
  const outPath = getArg("--out");

  if (!componentPath || !cssPath) {
    usage();
    process.exit(1);
  }

  const componentSource = fs.readFileSync(componentPath, "utf8");
  const cssSource = fs.readFileSync(cssPath, "utf8");

  const classSet = extractClassNames(componentSource);
  if (classSet.size === 0) {
    console.error("No static className strings found.");
    process.exit(1);
  }

  const cssNoComments = cssSource.replace(/\/\*[\s\S]*?\*\//g, "");
  const extracted = extractBlocks(cssNoComments, classSet);

  if (outPath) {
    fs.writeFileSync(outPath, extracted.trimEnd() + "\n", "utf8");
  } else {
    process.stdout.write(extracted.trimEnd() + "\n");
  }
}

main();
