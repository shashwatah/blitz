export type GameStatus = "ACTIVE" | "END";

export type PlayerNum = "ONE" | "TWO";

export type PlayerColor = "WHITE" | "BLACK";

export type Message = {
    type: string,
    move?: {
        from: string,
        to: string
    }
}   