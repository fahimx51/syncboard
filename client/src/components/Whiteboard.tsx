import { useEffect, useRef } from "react";
import * as Engine from "../canvas/engine";
import { resizeCanvas } from "../canvas/resize";
import { renderScene } from "../canvas/render";
import { setupEvents } from "../canvas/events";

export default function Whiteboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function handleResize() {
            // This now uses the actual container size thanks to the div wrapper
            resizeCanvas(canvas, ctx, window.devicePixelRatio);
            Engine.markDirty();
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        setupEvents(canvas);

        function animate() {
            renderScene(
                ctx,
                Engine.strokes,
                Engine.current,
                Engine.view,
                Engine.current.length > 0
            );
            requestAnimationFrame(animate);
        }

        const rafId = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        // The container forces the canvas to stay within limits
        <div className="fixed inset-0 overflow-hidden bg-white">
            <canvas
                ref={canvasRef}
                className="block w-full h-full touch-none bg-black"
            />
        </div>
    );
}