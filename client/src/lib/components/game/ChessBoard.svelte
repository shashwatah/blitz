 <script lang="ts">
    import type { Readable } from "svelte/store";
    import type { Chess, Color } from "chess.js";

    import pieceSVG from "../../utils/svg";
    import { onMount } from "svelte";

    export let color: Color | undefined;
    export let chess: Readable<Chess>

    let offsetX: number | undefined;
    let offsetY: number | undefined;

    let enteredBlock: HTMLElement | undefined;
    let grabbedPiece: HTMLElement | undefined;

    let onblockenter: ((event: MouseEvent) => void) | null;
    let onblockleave: ((event: MouseEvent) => void) | null;

    // a little janky but gets the job done pretty well
    onMount(() => {
        onmousedown = (event: MouseEvent) => {
            grabbedPiece = event.target as HTMLElement;
            if (!grabbedPiece || !grabbedPiece.id.startsWith("piece")) return;
            
            grabbedPiece.classList.add("dragging");
            document.body.style.cursor = "grabbing";

            let originalX = event.clientX;
            let originalY = event.clientY;

            console.log("dragging", grabbedPiece.id);
           
            onmousemove = (ev) => {
                offsetX = ev.clientX - originalX;
                offsetY = ev.clientY - originalY;
            }

            onblockenter = (ev: MouseEvent) => {
                enteredBlock = ev.target as HTMLElement;
                enteredBlock.classList.add("drop-target");
            }

            onblockleave = () => {
                enteredBlock?.classList.remove("drop-target");
            }

            onmouseup = (ev) => {
                onmousemove = onmouseup = null;
                onblockenter = onblockleave = null;

                enteredBlock?.classList.remove("drop-target");
                grabbedPiece?.classList.remove("dragging");

                offsetX = offsetY = undefined;
                enteredBlock = grabbedPiece = undefined;

                document.body.style.cursor = "default";
                console.log("dropping at", (ev.target as HTMLElement).id);
            }
        }
    });
</script>

<div id="board" class="board-{color}" style="--offsetX: {offsetX}px; --offsetY: {offsetY}px">
    {#each $chess.board() as row, i}
        <div class="row">
            {#each row as block, j}
                <div on:mouseenter={onblockenter} on:mouseleave={onblockleave} role="figure" id={`block-${i}${j}`} class="block block-{(i+j) % 2 === 0 ? "w" : "b"}">
                    {#if block !== null}
                        <div id={`piece-${block.color}${block.type}${j}`} class="piece">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" 
                                class="piece-svg piece-svg-{block.color}">
                                {@html pieceSVG[block.type]}
                            </svg>  
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    #board {
        border: 2px solid #d1d1d1;
        height: 100%;
        width: 100%;
        display: flex;
    }

    .board-w {
        flex-direction: column;
    }

    .board-b {
        flex-direction: column-reverse;
    }
    
    .row {
        height: 12.5%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .block {
        height: 100%;
        width: 12.5%;
        text-align: center;
    }

    .block-w {
        background: #fff;
    }

    .block-b {
        background: #efefef;
    }

    .piece {
        display: block;
        height: 100%;
    }

    .piece:hover {
        cursor: grab;
    }

    .piece-svg {
        position: relative;
        height: 90%;
        margin-top: 15%;
        cursor: pointer;    
        stroke: #313030;
        stroke-width: .4px;
        -webkit-user-drag: auto;
        pointer-events: none;
    }

    .piece-svg-w {
        fill: #fff;
    }

    .piece-svg-b {
        fill: #a2a2a2;
    }

    .dragging {
        pointer-events: none;
        transform: translate(var(--offsetX), var(--offsetY));
    }

    .drop-target {
        filter: brightness(0) saturate(100%) invert(85%) sepia(37%) saturate(439%) hue-rotate(76deg) brightness(99%) contrast(95%);
    }
</style>

