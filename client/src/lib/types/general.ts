export interface Player {
    name: string,
    isOne: boolean, // needs better name
    isActive: boolean;
    color: Color
    timer: string, // needs different type
    capturedPieces: Array<string>
}

export enum Color {
    White = "white",
    Black = "black"
}

export enum AuthType {
    Login,
    Register
}