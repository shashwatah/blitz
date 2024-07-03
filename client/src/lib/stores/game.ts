import { readable } from "svelte/store";
import type { Readable } from "svelte/motion";

export const playerColor: Readable<string>  = readable("white");