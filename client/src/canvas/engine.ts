//engine.ts file

// ================= DPR =================

import type { Point, View } from "./types";

export const dpr =
    window.devicePixelRatio || 1;

// ================= CAMERA / VIEW =================

export const view: View = {
    x: 0,
    y: 0,
    scale: 1
};

// ================= DRAW STATE =================

// current live stroke
export const current: Point[] = [];

// all finished strokes
export const strokes: Point[][] = [];

// ================= FLAGS =================

export let dirty = true;

// ================= OFFSCREEN CANVAS =================

export const offscreen =
    document.createElement("canvas");

export const offscreenCtx =
    offscreen.getContext("2d")!;



// ================= HELPERS =================

export function markDirty() {
    dirty = true;
}

export function clearDirty() {
    dirty = false;
}