export function splitPath(url: string): string[] {
    let split = url.split("/");
    split?.shift(); 
    return split;
}

// valid path: /game/'pub'or'pvt'/?code
export function validateGamePath(url: string | undefined): boolean {
    let path = url ? splitPath(url) : [];

    if (path.length > 3) return false;
    if (path[0] !== "game") return false;
    if (!["pub", "pvt"].includes(path[1])) return false;

    return true;
}