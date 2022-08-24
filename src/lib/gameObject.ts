import { GameObjectLocation, GameObjectDimensions } from "../types";

export class GameObject {
    #x: number = 0;
    #y: number = 0;
    #z: number = 0;

    #h: number = 0;
    #w: number = 0;

    constructor() {}

    setLocation(x: number, y: number, z: number) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    getLocation(): GameObjectLocation {
        return {
            x: this.#x,
            y: this.#y,
            z: this.#z
        };
    }

    setDimensions(h: number, w: number) {
        this.#h = h;
        this.#w = w;
    }

    getDimensions(): GameObjectDimensions {
        return {
            h: this.#h,
            w: this.#w
        }
    }
}