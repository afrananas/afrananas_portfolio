// ADR-004: raw design values (colors, font sizes, font families) live only in src/styles/tokens.css.
// Scans .css files and <style> blocks in .astro files under src/. Exits 1 on any violation.
import { globSync, readFileSync } from 'node:fs';

const TOKENS = 'src/styles/tokens.css';
const RULES = [
  [/#[0-9a-fA-F]{3,8}\b/, 'raw hex color'],
  [/\b(?:rgba?|hsla?|oklch|lab|lch)\(/, 'raw color function'],
  [/font-size\s*:\s*[\d.]+(?:px|rem|em)\b/, 'raw font size'],
  [/font-family\s*:(?!\s*var\()/, 'raw font family'],
];

const files = globSync('src/**/*.{css,astro}').filter((f) => f !== TOKENS);
const violations = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  // Only CSS: whole file for .css, <style> blocks for .astro (offsets keep line numbers right).
  const blocks = file.endsWith('.css')
    ? [{ css: text, offset: 0 }]
    : [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => ({
        css: m[1],
        offset: text.slice(0, m.index + m[0].indexOf(m[1])).split('\n').length - 1,
      }));
  for (const { css, offset } of blocks) {
    css.split('\n').forEach((line, i) => {
      for (const [pattern, label] of RULES) {
        if (pattern.test(line))
          violations.push(`${file}:${offset + i + 1}  ${label}: ${line.trim()}`);
      }
    });
  }
}

if (violations.length) {
  console.error(`Raw design values outside ${TOKENS} (use a token):\n${violations.join('\n')}`);
  process.exit(1);
}
console.log(`check-css-tokens: ${files.length} files clean`);
