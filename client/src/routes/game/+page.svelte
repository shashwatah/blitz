<script lang="ts">
    import { ChessBoardPos } from "$lib/types/chessBoard";
    import Chessboard from "$lib/components/Chessboard.svelte";
    
    let chessboardPos = ChessBoardPos.Pulled;
    setTimeout(() => {
        chessboardPos = ChessBoardPos.Center;
    }, 0);
</script>

<div id="left" class="game-stat"></div>
<div id="right" class="game-stat"></div>

<div id="chessboard-container" class="chessboard-pos-{chessboardPos}">
    <Chessboard/>
</div>

<style>
    .game-stat {
        height: 40vw;
        width: 25vw;
        position: fixed;
        top: 50vh;
        transform: translateY(-50%);
        border: 1px solid black;
    }

    #left {
        left: 0px;
    }

    #right {
        right: 0px;
    }

    #chessboard-container {
        background-color: blue;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-51.5%);  /* ? */
        transition: 0.2s linear;
    }

    .chessboard-pos-pulled {
        height: 60vw;
        width: 60vw;
        bottom: -45vw;
    }

    .chessboard-pos-center {
        height: 40vw;
        width: 40vw;
        bottom: 90px;
    }
</style>