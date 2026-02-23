// Parses ingredient strings and scales quantities based on servings ratio

const FRACTION_MAP: Record<string, number> = {
  "\u00BC": 0.25,
  "\u00BD": 0.5,
  "\u00BE": 0.75,
  "\u2153": 0.333,
  "\u2154": 0.667,
  "\u215B": 0.125,
  "\u215C": 0.375,
  "\u215D": 0.625,
  "\u215E": 0.875,
};

const NUMBER_TO_FRACTION: [number, string][] = [
  [0.125, "\u215B"],
  [0.25, "\u00BC"],
  [0.333, "\u2153"],
  [0.375, "\u215C"],
  [0.5, "\u00BD"],
  [0.625, "\u215D"],
  [0.667, "\u2154"],
  [0.75, "\u00BE"],
  [0.875, "\u215E"],
];

function parseMixedNumber(str: string): number | null {
  const trimmed = str.trim();

  // Check for unicode fractions: "1½", "½", etc.
  for (const [frac, val] of Object.entries(FRACTION_MAP)) {
    if (trimmed.includes(frac)) {
      const before = trimmed.replace(frac, "").trim();
      const whole = before ? parseFloat(before) : 0;
      if (!isNaN(whole)) return whole + val;
    }
  }

  // Check for "1/2", "1 1/2" style fractions
  const mixedMatch = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    return parseInt(mixedMatch[1]) + parseInt(mixedMatch[2]) / parseInt(mixedMatch[3]);
  }

  const fracMatch = trimmed.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) {
    return parseInt(fracMatch[1]) / parseInt(fracMatch[2]);
  }

  const num = parseFloat(trimmed);
  return isNaN(num) ? null : num;
}

function formatNumber(n: number): string {
  if (n <= 0) return "0";

  const whole = Math.floor(n);
  const frac = n - whole;

  if (frac < 0.06) return whole.toString();

  // Find closest fraction
  let closest = NUMBER_TO_FRACTION[0];
  let minDiff = Math.abs(frac - closest[0]);
  for (const entry of NUMBER_TO_FRACTION) {
    const diff = Math.abs(frac - entry[0]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = entry;
    }
  }

  if (minDiff < 0.06) {
    return whole > 0 ? `${whole}${closest[1]}` : closest[1];
  }

  // Round to 1 decimal
  const rounded = Math.round(n * 10) / 10;
  return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
}

export function scaleIngredient(
  ingredient: string,
  originalServings: number,
  newServings: number
): string {
  if (originalServings === newServings || originalServings === 0) return ingredient;

  const ratio = newServings / originalServings;

  // Match leading number (possibly with fraction) at the start of the ingredient
  // Patterns: "2 cups", "1½ cups", "½ cup", "1/2 cup", "1 1/2 cups"
  const patterns = [
    // "1 1/2 cups flour" - mixed fraction with slash
    /^(\d+\s+\d+\/\d+)\s+(.+)$/,
    // "1/2 cup flour" - simple fraction with slash
    /^(\d+\/\d+)\s+(.+)$/,
    // "1½ cups flour" or "½ cup" - unicode fractions
    /^(\d*[¼½¾⅓⅔⅛⅜⅝⅞])\s+(.+)$/,
    // "2 cups flour" or "200 g flour" - plain number
    /^(\d+\.?\d*)\s+(.+)$/,
  ];

  for (const pattern of patterns) {
    const match = ingredient.match(pattern);
    if (match) {
      const parsed = parseMixedNumber(match[1]);
      if (parsed !== null) {
        const scaled = parsed * ratio;
        return `${formatNumber(scaled)} ${match[2]}`;
      }
    }
  }

  return ingredient;
}
