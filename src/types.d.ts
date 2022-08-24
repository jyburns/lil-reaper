import { KeyboardInput } from "./enums/keyboardInput"

interface MainMenuFormData {
    difficulty: 'easy' | 'medium' | 'hard' | 'grim'
}

interface LilReaperSettings {
    difficulty: 'easy' | 'medium' | 'hard' | 'grim'
}

interface GameInputs {
    keyboard: Set<KeyboardInput>
}

interface GameObjectLocation {
    x: number
    y: number
    z: number
}

interface GameObjectDimensions {
    h: number
    w: number
}

interface MapBoundaries {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
}

interface Obstacle extends GameObject {

}