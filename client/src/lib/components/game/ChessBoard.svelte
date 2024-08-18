 <script lang="ts">
    import type { Readable } from "svelte/store";
    import { createEventDispatcher } from "svelte";
    
    import { SQUARES as blockIDs} from "chess.js";
    import type { Chess, Color } from "chess.js";

    import pieceSVG from "../../utils/svg";
    import { onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let color: Color | undefined;
    export let chess: Readable<Chess>

    let offsetX: number | undefined;
    let offsetY: number | undefined;

    let currentBlock: HTMLElement | undefined;
    let currentPiece: HTMLElement | undefined;

    let onblockenter: ((event: MouseEvent) => void) | null;
    let onblockleave: ((event: MouseEvent) => void) | null;

    onMount(() => {
        onmousedown = (event: MouseEvent) => {
            // need to display possible moves for the piece
    
            currentPiece = event.target as HTMLElement;
            if (!currentPiece || currentPiece.classList[0] !== "piece") return;
            
            currentPiece.classList.add("dragging");
            document.body.style.cursor = "grabbing";

            let originalX = event.clientX;
            let originalY = event.clientY;

            console.log("dragging", currentPiece.id);
           
            onmousemove = (ev) => {
                offsetX = ev.clientX - originalX;
                offsetY = ev.clientY - originalY;
            }

            onblockenter = (ev: MouseEvent) => {
                currentBlock = ev.target as HTMLElement;
                if (!currentBlock.hasChildNodes()) currentBlock.classList.add("hovering");
            }

            onblockleave = () => {
                currentBlock?.classList.remove("hovering");
            }

            onmouseup = (ev) => {
                let target = ev.target as HTMLElement;

                currentBlock?.classList.remove("hovering");
                currentPiece?.classList.remove("dragging");

                if (target.classList[0] === "block") {
                    dispatch("move", {
                        from: currentPiece?.parentElement?.dataset.id,
                        to: target.dataset.id
                    })
                }

                offsetX = offsetY = undefined;
                currentBlock = currentPiece = undefined;
                onmousemove = onmouseup = null;
                onblockenter = onblockleave = null;

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
                {@const index = (i+j)+(7*i)}
                {@const blockID = blockIDs[index]}
                {@const blockColor = (i+j) % 2 === 0 ? "w" : "b"}    

                <div id="block-{blockID}" class="block block-{blockColor}" data-id={blockID}
                     on:mouseenter={onblockenter} on:mouseleave={onblockleave}
                     role="gridcell" tabindex="{index}">
                     {#if block !== null}
                        {@const piece = block}

                        <div id="piece-{piece.color}{piece.type}{j}" class="piece">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" 
                                class="piece-svg piece-svg-{piece.color}">
                                {@html pieceSVG[piece.type]}
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

    .hovering {
        filter: brightness(0) saturate(100%) invert(85%) sepia(37%) saturate(439%) hue-rotate(76deg) brightness(99%) contrast(95%);
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
        z-index: 100;
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
</style>

