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