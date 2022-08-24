export class CanvasGame {
    readonly canvasId: string;
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | ImageBitmapRenderingContext;
    
    #previousFrameTimeStamp: DOMHighResTimeStamp = 0;
    #elapsedGameTime: number = 0;
    #dt: number = 0;

    #isRunning: boolean = false;

    constructor(canvasId: string, contextType: string, contextAttributes?: Object) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext(contextType, contextAttributes) as CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | ImageBitmapRenderingContext;
    }

    setCanvasSize(height: number, width: number) {
        this.canvas.height = height;
        this.canvas.width = width;
    }

    start(): void {
        this.#setDelta();
        this.#isRunning = true;
    }

    pause(): void {
        this.#isRunning = false;
    }

    run(): void {
        if (this.#isRunning) {
            this.step();
        }
    }

    step(): void {
        this.#setDelta();
        this.create();
        this.update();
        this.destroy();
        this.draw();
    };

    create(): void {}
    update(): void {}
    destroy(): void {}
    draw(): void {}

    getFrameDt() {
        return this.#dt;
    }

    getElapsedGameTime() {
        return this.#elapsedGameTime;
    }

    #setDelta() {
        const stamp = performance.now();
        this.#dt = stamp - this.#previousFrameTimeStamp;
        this.#previousFrameTimeStamp = stamp;
        this.#elapsedGameTime += this.#dt;
    }
}