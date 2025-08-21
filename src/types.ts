export type simplePalette = {
    bg: string,
    txt: string,
    accent: string,
    scrollTrack: string,
    scrollThumb: string
}

export const defaultPalette: simplePalette = {
    bg: "#000",
    txt: "#e7e5e4",
    accent: "#e7e5e4",
    scrollTrack: "#000",
    scrollThumb: "#ccc"
}

// TODO: ロゴの画像が複数種類出てきちゃったので、
// content collectionでjsonベース管理が
// できるようにする