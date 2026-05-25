// resize.ts

export function resizeCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    dpr: number
) {
    // 1. Set the internal resolution
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // 2. Set the display size
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    // 3. Clear existing transformations and set base DPR scale
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // 4. PREVENT BLUR: This is the most important line!
    ctx.imageSmoothingEnabled = false;
}