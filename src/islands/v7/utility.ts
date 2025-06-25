export function lerpF(from: number, to: number, t: number): number {
    if (from == to) return from

    const small = Math.min(from, to)
    const big = Math.max(from, to)

    const width = big - small
    
    if (t <= 0 || t >= 1) return t <= .5 ? small : big

    return small + width * t
}

// https://easings.net/#easeOutQuint
export function easeOutQuint(t: number): number {
    return 1 - Math.pow(1 - t, 5);
}

export const d2r = (ang: number) => ang * (Math.PI / 180)
export const r2d = (ang: number) => ang * (180 / Math.PI)