<script lang="ts">
    import { goto } from "$app/navigation";
    
    import { ChessBoardPos } from "$lib/types/chessBoard";
    import { Color } from "$lib/types/general";

    import Chessboard from "$lib/components/game/ChessBoard.svelte";
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
    <Chessboard p1Color={Color.White} p2Color={Color.Black}/>
</div>

<style>
    /* main container */
    #game-setup-container {
        height: 175px;
        width: 50%;  /* ? */
        position: fixed;
        top: calc(50% - 110px);  /* ? */
        margin-left: 50%;
        transform: translateX(-51%);  /* ? */
    }

    #chessboard-container {
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