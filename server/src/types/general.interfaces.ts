import { PlayerNum } from "./general.enums"

export interface Location {
    x: number, 
    y: number
}

export interface Move {
    startPos: Location,
    endPos: Location,
    player: PlayerNum
}