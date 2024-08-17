 <script lang="ts">
    import type { Readable } from "svelte/store";
    import type { Chess, Color } from "chess.js";

    import pieceSVG from "../../utils/svg";
    import { onMount } from "svelte";

    export let color: Color | undefined;
    export let chess: Readable<Chess>

    let offsetX: number | undefined;
    let offsetY: number | undefined;

    onMount(() => {
        onmousedown = (event: MouseEvent) => {
            let piece = event.target as HTMLElement;

            if (!piece || !piece.id.startsWith("piece")) return;
            
            piece.classList.add("dragging");
            console.log("dragging", piece.id);

            let originalX = event.clientX;
            let originalY = event.clientY;
            
            document.body.style.cursor = "grabbing";

            onmousemove = (ev) => {
                offsetX = ev.clientX - originalX;
                offsetY = ev.clientY - originalY;
            }

            onmouseup = (ev) => {
                onmousemove = null;
                offsetX = undefined;
                offsetY = undefined;

                piece?.classList.remove("dragging");
                console.log("dropping at", (ev.target as HTMLElement).id);

                document.body.style.cursor = "default";

                onmouseup = null;
            }
        }
    });
</script>

<div id="board" class="board-{color}" style="--offsetX: {offsetX}px; --offsetY: {offsetY}px">
    {#each $chess.board() as row, i}
        <div class="row">
            {#each row as block, j}
                <div id={`block-${i}${j}`} class="block block-{(i+j) % 2 === 0 ? "w" : "b"}">
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

