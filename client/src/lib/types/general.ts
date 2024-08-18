import type { Square, PieceSymbol, Color } from "chess.js";

export type Page = "HOME" | "GAME";
export type GameType = "PUBLIC" | "PRIVATE" | undefined;
export type GameStatus = "INACTIVE" | "WAITING" | "ACTIVE" | "END" | "CONNFAIL" | "RESET";

// this emulated the data returned by chess.board
// might change this later
export type Board = ({
    square: Square, 
    type: PieceSymbol,
    color: Color
} | null)[][];