import { CanvasGame } from "./lib/canvasGame";
import { Reaper } from "./reaper";
import { GameObject } from "./lib/gameObject";
import { InputHandler } from "./lib/inputHandler";
import { LilReaperSettings, MapBoundaries } from "./types";

export class LilReaper extends CanvasGame {
    readonly settings: LilReaperSettings;
    readonly inputHandler: InputHandler = new InputHandler();

    #reaper: Reaper = new Reaper();

    #gameObjects = new Array<GameObject>();

    constructor(canvasId: string, settings: LilReaperSettings) {
        super(canvasId, '2d');

        this.settings = settings;
    }

    create(): void {

    };

    update(): void {
        const dt = this.getFrameDt();
        const inputs = this.inputHandler.getInputs();
        const mapBoundaries = this.getMapBoundaries();

        this.#reaper.move(dt, inputs, mapBoundaries);
    };

    destroy(): void {
        
    };

    draw(): void {
        this.#drawSky();

        this.#renderBackToFront();
    };

    getMapBoundaries(): MapBoundaries {
        return {
            minX: 0,
            maxX: this.canvas.width,
            minY: 0,
            maxY: this.canvas.height
        };
    };

    #drawSky() {

    }

    #renderBackToFront() {
        const reaperLocation = this.#reaper.getLocation();
        let hasRenderedReaper = false;

        for(let i = this.#gameObjects.length; i > 0; i--) {
            const gameObject = this.#gameObjects[i];
            const gameObjectLocation = gameObject.getLocation();

            if (gameObjectLocation.z < reaperLocation.z) {
                this.#renderReaper();
                hasRenderedReaper = true;
            }

            this.#renderGameObject(gameObject);
        }

        if (!hasRenderedReaper) {
            this.#renderReaper();
        }
    };

    #renderReaper = () => {
        //@ts-ignore
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //@ts-ignore
        this.ctx.fillStyle = 'red';

        const reaperLocation = this.#reaper.getLocation();
        //@ts-ignore
        this.ctx.fillRect(reaperLocation.x, reaperLocation.y, 50, 100);
    };

    #renderGameObject = (_: GameObject) => {};
}