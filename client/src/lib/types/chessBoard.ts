export interface ChessPiece {
    initRow: number,
    initCol: number[],
    svg: string
}

export interface ChessPieces {
    [name: string]: ChessPiece
}

export interface ChessBlock {
    loc: {
        row: number,
        col: number
    },
    piece?: {
        name: string,
        isOpponent: boolean
    }
}

export interface ChessBlockNotation {
    row: number,
    col: string
}

export type ChessBoard = ChessBlock[][];

export const enum ChessBoardPos {
    Default = "default",
    Pulled = "pulled",
    Center = "center",
    Pushed = "pushed"
}
