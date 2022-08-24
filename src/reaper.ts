import { Direction } from "./enums/direction";
import { KeyboardInput } from "./enums/keyboardInput";
import { GameObject } from "./lib/gameObject";
import { limitInputsToUnitCircle } from "./lib/movement";
import { GameInputs, MapBoundaries } from "./types";

export class Reaper extends GameObject{
    #isReaping: boolean = false;
    #reapTime: number = 0;

    #isJumping: boolean = false;
    #jumpTime: number = 0;

    #stamina: number = 100;
    #maxMoveSpeed: number = 0.5;

    #direction: Direction = Direction.up;

    constructor() {
        super();

        this.setDimensions(100, 50);
    }

    move(dt: number, inputs: GameInputs, mapBoundaries: MapBoundaries) {
        let xMagnitude = 0;
        let yMagnitude = 0;

        if (inputs.keyboard.has(KeyboardInput.d) || inputs.keyboard.has(KeyboardInput.arrowRight)) {
            xMagnitude += 1;
        }

        if (inputs.keyboard.has(KeyboardInput.a) || inputs.keyboard.has(KeyboardInput.arrowLeft)) {
            xMagnitude -= 1;
        }

        if (inputs.keyboard.has(KeyboardInput.w) || inputs.keyboard.has(KeyboardInput.arrowUp)) {
            yMagnitude -= 1;
        }

        if (inputs.keyboard.has(KeyboardInput.s) || inputs.keyboard.has(KeyboardInput.arrowDown)) {
            yMagnitude += 1;
        }

        const {x, y, z} = this.getLocation();

        const {xOut, yOut} = limitInputsToUnitCircle(xMagnitude, yMagnitude);

        const {h, w} = this.getDimensions();

        const newX = Math.max(
            Math.min(
                x + (xOut * dt * this.#maxMoveSpeed),
                mapBoundaries.maxX - w
            ),
            mapBoundaries.minX
        );

        const newY = Math.max(
            Math.min(
                y + (yOut * dt * this.#maxMoveSpeed),
                mapBoundaries.maxY - h
            ),
            mapBoundaries.minY
        );

        this.setLocation(newX, newY, z);
    }

    reap(dt: number) {
        if (this.#stamina < 2) {
            return;
        }

        if (this.#isReaping || this.#isJumping) {
            return;
        }

        this.#isReaping = true;
        this.#reapTime = dt;
        this.#stamina -= 2;

        setTimeout(() => {
            this.#isReaping = false;
        }, 250);
    }

    jump(dt: number) {
        if (this.#stamina < 5) {
            return;
        }

        if (this.#isJumping) {
            return;
        }

        if (this.#isReaping) {
            this.#isReaping = false;
        }

        this.#isJumping = true;
        this.#jumpTime = dt;
        this.#stamina -= 5;

        setTimeout(() => {
            this.#isJumping = false;
        }, 500);
    }

    getMetaData() {
        return {
            direction: this.#direction,
            isReaping: this.#isReaping,
            reapTime: this.#reapTime,
            isJumping: this.#isJumping,
            jumpTime: this.#jumpTime,
            stamina: this.#stamina,
            maxMoveSpeed: this.#maxMoveSpeed
        }
    }

    setDirection(direction: Direction) {
        this.#direction = direction;
    }
}