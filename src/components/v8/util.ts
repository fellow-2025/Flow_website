export function remap (value: number, low1: number, high1: number, low2: number, high2: number): number {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1)
}

type Breakpoints = {
  [width: number]: number; // 短辺の長さ: フォントサイズ
};

const tailwindBreakpoints: Breakpoints = {
  0: 12,
  640: 14,
  1024: 15,
  1536: 17,
};

// const tailwindFontSizes: Record<string, number> = {
//   "text-xs": 12,
//   "text-sm": 14,
//   "text-base": 16,
//   "text-lg": 18,
//   "text-xl": 20,
//   "text-2xl": 24,
//   "text-3xl": 30,
//   "text-4xl": 36,
//   "text-5xl": 48,
//   "text-6xl": 60,
// };

export function getFontSize(shortSide: number): number {
  // breakpointsを昇順にソート
  const sorted = Object.keys(tailwindBreakpoints)
    .map(Number)
    .sort((a, b) => a - b);

  // 現在の短辺以下で最大のキーを探す
  let size = tailwindBreakpoints[sorted[0]];
  for (const bp of sorted) {
    if (shortSide >= bp) {
      size = tailwindBreakpoints[bp];
    } else {
      break;
    }
  }
  return size;
}
