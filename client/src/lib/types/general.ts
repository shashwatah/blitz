import type { Color, PieceSymbol } from "chess.js";

export type Page = "HOME" | "GAME";
export type GameType = "PUBLIC" | "PRIVATE" | undefined;
export type GameStatus = "INACTIVE" | "WAITING" | "ACTIVE" | "END" | "CONNFAIL" | "RESET";

export type Player = {
    name: string,
    isOne: boolean, // needs better name
    isActive: boolean;
    color: Color
    timer: string, // needs different type
    capturedPieces: Array<PieceSymbol>
}