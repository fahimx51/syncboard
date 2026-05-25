// world.ts
import type { View } from "./types";

// Inside your world.ts
export function toWorld(x: number, y: number, view: View, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();

    // Clamp coordinates to canvas bounds
    const screenX = Math.max(0, Math.min(x - rect.left, rect.width));
    const screenY = Math.max(0, Math.min(y - rect.top, rect.height));

    return {
        x: (screenX - view.x) / view.scale,
        y: (screenY - view.y) / view.scale
    };
}