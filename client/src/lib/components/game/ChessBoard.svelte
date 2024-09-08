 <script lang="ts">
    // the board might be flipped wrong
    // when player one moves their left most pawn
    // player two also sees the left most pawn moving (from their perspective)

    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    
    import { SQUARES as blockIDs, type Color, type Move} from "chess.js";
    import type { Board } from "$lib/types/general";

    import pieceSVG from "../../utils/svg";

    export let color: Color | undefined;
    export let turn: boolean; // could just decide this by moves.length?
    export let board: Board
    export let moves: Move[];

    let offsetX: number;
    let offsetY: number;

    let onblockenter: ((event: MouseEvent) => void) | null;
    let onblockleave: ((event: MouseEvent) => void) | null;

    onMount(() => {
        onmousedown = (event: MouseEvent) => {
            if (!turn) return; // will this hinder proper gameplay? 
 
            let currentPiece = event.target as HTMLElement;
            if (!currentPiece || currentPiece.classList[0] !== "piece") return;
            if (currentPiece.dataset.color !== color) return;
            
            let originalX = event.clientX;
            let originalY = event.clientY;
           
            currentPiece.classList.add("dragging");
            document.body.style.cursor = "grabbing";

            // can i do it without creating an el?
            // this will have to be different if theres a piece that can be captured
            moves.filter(move => move.from === currentPiece?.dataset.block)
            .forEach(move => {
                let block = document.getElementById(`block-${move.to}`);
                if (!block) return;
                
                let target = document.createElement("span");
                target.classList.add("target");
                target.classList.add(block.children.length === 0 ? "move-target" : "capture-target");

                block.appendChild(target);
            });
            
            let currentBlock: HTMLElement;
            console.log("dragging", currentPiece.id);

            onmousemove = (ev) => {
                offsetX = ev.clientX - originalX;
                offsetY = ev.clientY - originalY;
            }

            onblockenter = (ev: MouseEvent) => {
                currentBlock = ev.target as HTMLElement;
                currentBlock.classList.add("hovering");
            }

            onblockleave = () => {
                currentBlock?.classList.remove("hovering");
            }

            onmouseup = (ev) => {
                currentPiece?.classList.remove("dragging");
                currentBlock?.classList.remove("hovering");
                document.body.style.cursor = "default";

                Array.from(document.getElementsByClassName("target"))
                     .forEach(target => {target.remove()});
                
                offsetX = offsetY = 0;
                onmousemove = onmouseup = null;
                onblockenter = onblockleave = null;

                let target = ev.target as HTMLElement;
                // this condition doesn't work for when trying to capture
                // an opponent's piece or something similar
                // event will target the piece on the block rather than the block itself
                if (target.classList[0] === "piece") target = target.parentElement as HTMLElement;
                if (target.classList[0] !== "block") return;
                if (target.dataset.id === currentPiece?.dataset.block) return;

                dispatch("move", {
                    from: currentPiece?.parentElement?.dataset.id,
                    to: target.dataset.id
                });
                
                console.log("dropping at", target.id);
            }
        }
    });
</script>

<div id="board" class="board-{color}" style="--offsetX: {offsetX}px; --offsetY: {offsetY}px">
    {#each board as row, i}
        <div class="row row-{color}">
            {#each row as block, j}
                {@const index = (i+j)+(7*i)}
                {@const blockID = blockIDs[index]}
                {@const blockColor = (i+j) % 2 === 0 ? "w" : "b"}    

                <div id="block-{blockID}" class="block block-{blockColor}" data-id={blockID}
                     on:mouseenter={onblockenter} on:mouseleave={onblockleave}
                     role="gridcell" tabindex="{index}">
                     {#if block !== null}
                        {@const piece = block}

                        <div id="piece-{piece.color}{piece.type}{j}" class="piece" data-color={piece.color} data-block={blockID}>
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
        border: 1px solid #d1d1d1;
        height: 100%;
        width: 100%;
        display: flex;
        overflow: hidden; /* temp solution for piece drag outside the board */
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
    }

    .row-w {
        flex-direction: row;
    }
    
    .row-b {
        flex-direction: row-reverse;
    }

    .block {
        height: 100%;
        width: 12.5%;
        text-align: center;
        display: inline-block;
    }

    .block-w {
        background: #fff;
    }

    .block-b {
        background: #efefef;
    }

    .hovering {
        box-shadow: 0 0 0 5px #d1d1d1 inset;
    }

    .piece {
        position: relative;
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
        z-index: 100 !important;
        pointer-events: none;
        transform: translate(var(--offsetX), var(--offsetY));
    }
    
    /* https://stackoverflow.com/a/59670838 */
    div :global(.move-target) {
        display: inline-block;
        height: 30%;
        width: 30%;
        border-radius: 50%;
        margin-top: 40%;
        background: #a2a2a2;
        opacity: 0.5;
        pointer-events: none;
    }

    /* works but doesn't seem like the right way to do it */
    div :global(.capture-target) {
        height: 60%;
        width: 60%;
        border-radius: 50%;
        border: 0.3rem solid #a2a2a2;
        opacity: 0.5;
        float: left;
        margin-left: 50%;
        transform: translate(-50%, -115%);
        pointer-events: none;
    }
</style>

