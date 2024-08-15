 <script lang="ts">
    // @ts-nocheck

    import type { Readable } from "svelte/store";
    import type { Chess, Color } from "chess.js";

    import pieceSVG from "../../utils/svg";
    import { onMount } from "svelte";

    export let color: Color | undefined;
    export let chess: Readable<Chess>

    let dragStart: any;
    let dragEnd: any;


    // janky
    onMount(() => {
        ondragstart = (event) => {
            event.dataTransfer?.setData("piece-id", event.target.id);
            event.target.classList.add("dragging")
            event.target.classList.remove("not-dragging")

            console.log(event.dataTransfer?.getData("piece-id"));
        }

        ondragenter = (event) => {
            if (event.target.classList.contains("chessboard-block") && !event.target.classList.contains("drop-wait") && event.target.innerHTML === "") {
                event.target.classList.add("drop-wait");
            }
        }   

        ondragleave = (event) => {
            if (event.target.classList.contains("chessboard-block") && event.target.classList.contains("drop-wait")) {
                event.target.classList.remove("drop-wait");
            }
        }

        ondragover = (event) => {
            event.preventDefault();
        }

        ondrop = (event) => {
            if (event.target.classList.contains("chessboard-block") && event.target.classList.contains("drop-wait")) {
                let parent = document.getElementById(event.dataTransfer?.getData("piece-id"))?.parentElement;
                if (parent) {
                    event.target.innerHTML = parent.innerHTML;
                    parent.innerHTML = "";
                    event.target.classList.remove("drop-wait")
                }
            }

            document.getElementById(event.dataTransfer?.getData("piece-id"))?.classList.remove("dragging");
            document.getElementById(event.dataTransfer?.getData("piece-id"))?.classList.add("not-dragging");
        }
    })
</script>

<div id="chessboard" class="chessboard-{color}">
    {#each $chess.board() as row, i}
        <div class="chessboard-row">
            {#each row as block, j}
                <div id={`${i}${j}`} class="chessboard-block {(i+j) % 2 === 0 ? "w" : "b"}-chessboard-block">
                    {#if block !== null}
                        <span id={`${block.type}-${block.color}-${j}`} class="not-dragging" role="figure" draggable="true">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" 
                                class="chess-piece {block.color}-chess-piece">
                                {@html pieceSVG[block.type]}
                            </svg>  
                        </span>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .not-dragging {
        opacity: 1;
    }

    .dragging {
        opacity: 0;
    }

    .drop-wait {
        filter: brightness(0) saturate(100%) invert(85%) sepia(37%) saturate(439%) hue-rotate(76deg) brightness(99%) contrast(95%);
    }

    #chessboard {
        border: 2px solid #d1d1d1;
        height: 100%;
        width: 100%;
        display: flex;
    }

    .chessboard-w {
        flex-direction: column;
    }

    .chessboard-b {
        flex-direction: column-reverse;
    }
    
    .chessboard-row {
        height: 12.5%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .chessboard-block {
        height: 100%;
        width: 12.5%;
        text-align: center;
    }

    .w-chessboard-block {
        background: #fff;
    }

    .b-chessboard-block {
        background: #efefef;
    }

    .chess-piece {
        position: relative;
        height: 90%;
        margin-top: 15%;
        cursor: pointer;    
        stroke: #313030;
        stroke-width: .4px;
        -webkit-user-drag: auto;
    }

    .w-chess-piece {
        fill: #fff;
    }

    .b-chess-piece {
        fill: #a2a2a2;
    }
</style>

