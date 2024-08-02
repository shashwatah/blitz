import WebSocket from "ws";

import { genRandomStr } from "../bin/helpers";

export default class User {
    protected socket: WebSocket;
    protected id: string; 
    protected name: string;

    constructor(user: User | { socket: WebSocket, id?: string, name?: string }) {
        if (user instanceof User) {
            this.socket = user.socket;
            this.id = user.id;
            this.name = user.name;
        } else {
            this.socket = user.socket;
            this.id = user.id ? user.id : genRandomStr();
            this.name = user.name ? user.name : "guest";
       }
    }

    listen(listener: (data: WebSocket.RawData) => void) {
        this.socket.on("message", listener);
    }

    tell(message: string) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    exit() {
        this.socket.close();
    }

    get ID(): string {
        return this.id;
    }
}

