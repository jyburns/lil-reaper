import { KeyboardInput } from "../enums/keyboardInput";
import { GameInputs } from "../types";

export class InputHandler {
    #keyboardInputs: Set<KeyboardInput>;

    constructor() {
        this.#keyboardInputs = new Set<KeyboardInput>();

        document.addEventListener('keydown', this.#onKeydown.bind(this));
        document.addEventListener('keyup', this.#onKeyup.bind(this));
    }

    getInputs(): GameInputs {
        return {
            keyboard: this.#keyboardInputs
        }
    }

    #onKeydown(e: KeyboardEvent) {
        this.#keyboardInputs.add(e.code as KeyboardInput);
    }

    #onKeyup(e: KeyboardEvent) {
        this.#keyboardInputs.delete(e.code as KeyboardInput);
    }
}