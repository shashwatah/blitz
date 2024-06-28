<script lang="ts">
    import { goto } from "$app/navigation";
    import { ChessBoardPos } from "$lib/types/chessBoard";
    
    import Chessboard from "$lib/components/Chessboard.svelte";
    import GameSetup from "$lib/components/GameSetup.svelte";
    
    let chessboardPos: ChessBoardPos = ChessBoardPos.Default; // default, pulled, pushed, center 
    
    function gotoGame() {
        goto("/game");
    }

    // @ts-ignore
    function handlePageChange(event) {
        chessboardPos = event.detail.isMS ? ChessBoardPos.Default : ChessBoardPos.Pulled; 
    }
</script>

<div id="game-setup-container">
    <GameSetup on:goto-game={gotoGame} on:page-change={handlePageChange}/>
</div>

<div id="chessboard-container" class="chessboard-pos-{chessboardPos}">
    <Chessboard/>
</div>

<div id="left" class="game-stat"></div>
<div id="right" class="game-stat"></div>

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

    /* main container */
    #game-setup-container {
        height: 175px;
        width: 50%;  /* ? */
        position: fixed;
        top: calc(50% - 110px);  /* ? */
        margin-left: 50%;
        transform: translateX(-51%);  /* ? */
        background-color: yellow;
    }

    #chessboard-container {
        background-color: blue;
        height: 60vw;
        width: 60vw;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-51%);  /* ? */
        transition: 0.1s linear;
    }

    .chessboard-pos-default {
        bottom: -52.5vw;
    }

    .chessboard-pos-pulled {
        bottom: -45vw;
    }
</style>