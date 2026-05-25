// events.ts
import { current, strokes, view, markDirty } from "./engine";
import { toWorld } from "./world";
import { smoothStroke } from "./smoothing"; // Added import

let drawing = false;
let isPanning = false;
let panStart = { x: 0, y: 0 };
let viewStart = { x: 0, y: 0 };

export function setupEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", (e) => {
        if (e.button === 1 || e.button === 2) {
            isPanning = true;
            panStart = { x: e.clientX, y: e.clientY };
            viewStart = { x: view.x, y: view.y };
            return;
        }

        canvas.setPointerCapture(e.pointerId);
        drawing = true;
        current.length = 0;
        current.push(toWorld(e.clientX, e.clientY, view, canvas));
    });

    canvas.addEventListener("pointermove", (e) => {
        if (isPanning) {
            view.x = viewStart.x + (e.clientX - panStart.x);
            view.y = viewStart.y + (e.clientY - panStart.y);
            markDirty();
            return;
        }

        if (!drawing) return;

        const p = toWorld(e.clientX, e.clientY, view, canvas);
        const last = current[current.length - 1];

        // Linear interpolation for responsive "live" drawing feel
        current.push({
            x: last.x + (p.x - last.x) * 0.3,
            y: last.y + (p.y - last.y) * 0.3
        });
        markDirty();
    });

    canvas.addEventListener("pointerup", (e) => {
        if (isPanning) {
            isPanning = false;
            return;
        }
        drawing = false;
        canvas.releasePointerCapture(e.pointerId);

        if (current.length > 1) {
            const processed = smoothStroke(smoothStroke(current));
            strokes.push(processed);
            markDirty();
        }
        current.length = 0;
    });

    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const before = toWorld(e.clientX, e.clientY, view, canvas);
        const zoomFactor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        view.scale = Math.max(0.1, Math.min(10, view.scale * zoomFactor));
        const after = toWorld(e.clientX, e.clientY, view, canvas);
        view.x += (after.x - before.x) * view.scale;
        view.y += (after.y - before.y) * view.scale;
        markDirty();
    }, { passive: false });

    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}