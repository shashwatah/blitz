import { readable } from "svelte/store";
import type { Readable } from "svelte/store";

import { page } from "$app/stores";

import type { Page } from "../types/general.types";

export const currentPage: Readable<Page> = readable(true ? "HOME" : "GAME", (set) => {
    page.subscribe((val) => set(val.url.pathname === "/" ? "HOME" : "GAME"));
});