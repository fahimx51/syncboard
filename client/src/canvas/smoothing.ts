//smoothing.ts

import type { Point } from "./types";


export function smoothStroke(pts: Point[]) {

    if (pts.length < 3) return pts;

    const out = [pts[0]];

    for (let i = 1; i < pts.length - 1; i++) {

        const p = pts[i];
        const pr = pts[i - 1];
        const nx = pts[i + 1];

        out.push({
            x: p.x * 0.6 + (pr.x + nx.x) * 0.2,
            y: p.y * 0.6 + (pr.y + nx.y) * 0.2
        });
    }

    out.push(pts[pts.length - 1]);

    return out;
}