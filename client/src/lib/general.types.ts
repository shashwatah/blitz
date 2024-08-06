import type { Color, PieceSymbol } from "chess.js";

export type Page = "HOME" | "GAME";
export type GameType = "PUBLIC" | "PRIVATE" | undefined;
export type ConnMode = "JOIN" | "CREATE" | undefined; 
export type GameStatus = "CONNFAIL" | "WAITING" | "ACTIVE" | "END" | "INACTIVE";


export type Player = {
    name: string,
    isOne: boolean, // needs better name
    isActive: boolean;
    color: Color
    timer: string, // needs different type
    capturedPieces: Array<PieceSymbol>
}