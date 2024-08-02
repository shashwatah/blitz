export function splitPath(url: string): string[] {
    let split = url.split("/");
    split?.shift(); 
    return split;
}

// valid path: /game/'public'or'private'/?code
export function validateGamePath(url: string | undefined): boolean {
    let path = url ? splitPath(url) : [];

    if (
        path.length > 3 ||
        path[0] !== "game" ||
        !["public", "private"].includes(path[1])
    ) return false;

    return true;
}

// currently being used for generating: game id, private game code, user id
// took this off of stackoverflow, replace with a better method
export function genRandomStr(): string {
    return (Math.random() + 1).toString(36).substring(5);
}