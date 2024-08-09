<script lang="ts">
    import type { Color } from "chess.js";
    
    import game from "$lib/controllers/game";
    
    import pieceSVG from "../../utils/svg";

    // only HOME and GAME are supposed to use the game controller
    // this is exists only until i start working on GAME
    let chess = game.CHESS;
    let color: Color = "w";
    game.STATUS.subscribe((status) => {
        if (status === "ACTIVE" && game.COLOR) color = game.COLOR
        if (status === "INACTIVE") color = "w";
    });
    // currently directly using chess.js' color type (w, b) like on the backend
    // do i need to change this??
</script>

<div id="chessboard" class="chessboard-{color}">
    {#each $chess.board() as row, i}
        <div class="chessboard-row">
            {#each row as block, j}
                <div class="chessboard-block {(i+j) % 2 === 0 ? "w" : "b"}-chessboard-block">
                    {#if block !== null}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" 
                            class="chess-piece {block.color}-chess-piece">
                            {@html pieceSVG[block.type]}
                        </svg>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
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
    }

    .w-chess-piece {
        fill: #fff;
    }

    .b-chess-piece {
        fill: #a2a2a2;
    }
</style>

