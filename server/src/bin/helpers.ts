// valid path: /game/'pub'or'pvt'/code?
export function validateGamePath(url: string | undefined): boolean {
    let path = url?.split("/");
    path?.shift();

    if (!path) return false;
    if (path.length > 3) return false;
    if (path[0] !== "game") return false;
    if (!["pub", "pvt"].includes(path[1])) return false;

    return true;
}