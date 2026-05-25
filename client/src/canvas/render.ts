//render.ts

import type { Point, View } from "./types";
export function renderScene(
    ctx: CanvasRenderingContext2D,
    strokes: Point[][],
    current: Point[],
    view: View,
    drawing: boolean
) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.translate(view.x, view.y);
    ctx.scale(view.scale, view.scale);

    // Calculate dynamic line width
    // Base width is 2. 
    // We want the line to be at least 2 pixels wide on screen.
    const baseWidth = 2;
    const dynamicWidth = Math.max(baseWidth, baseWidth / view.scale);

    for (const s of strokes) {
        drawStroke(ctx, s, dynamicWidth);
    }

    if (drawing && current.length > 0) {
        drawStroke(ctx, current, dynamicWidth);
    }

    ctx.restore();
}


export function drawStroke(
    ctx: CanvasRenderingContext2D,
    pts: Point[],
    width: number
) {
    if (pts.length < 2) return;

    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "red";
    ctx.beginPath();

    ctx.moveTo(pts[0].x, pts[0].y);

    for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }

    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.stroke();
}