<script lang="ts">
    import type { PieceSymbol } from "chess.js";
    import pieceSVG from "../utils/svg";

    let rows: PieceSymbol[][] = [["r", "n", "b", "k", "q", "b", "n", "r"],
                                ["p", "p", "p", "p", "p", "p", "p", "p"]]
</script>

<div id="chessboard" class="chessboard">
    {#each rows as row, i}
        <div class="chessboard-row">
            {#each row as piece, j}
                <div class="chessboard-block {(i+j) % 2 === 0 ? "w" : "b"}-chessboard-block">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" 
                        class="chess-piece">
                        {@html pieceSVG[piece]}
                    </svg>
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
        fill: #a2a2a2;
    }
</style>

