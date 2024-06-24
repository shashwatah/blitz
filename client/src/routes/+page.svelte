<script>
    import { goto } from "$app/navigation";
    
    import Chessboard from "$lib/Chessboard.svelte";
    import GameSetup from "$lib/GameSetup.svelte";
    
    let chessboardPos = "default"; // default, pulled, pushed, center 

    function gotoGame() {
        goto("/game");
    }

    function handlePageChange(event) {
        chessboardPos = event.detail.isMS ? "default" : "pulled"; 
    }
</script>

<div id="game-setup-container">
    <GameSetup on:goto-game={gotoGame} on:page-change={handlePageChange}/>
</div>

<div id="chessboard-container" class="chessboard-pos-{chessboardPos}">
    <Chessboard/>
</div>

<style>
    /* main container */
    #game-setup-container {
        height: 175px;
        width: 50%; /**/
        position: fixed;
        top: calc(50% - 110px); /**/
        margin-left: 50%;
        transform: translateX(-50%);
    }

    #chessboard-container {
        height: 60vw;
        width: 60vw;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        transition: 0.1s linear;
    }

    .chessboard-pos-default {
        bottom: -52.5vw;
    }

    .chessboard-pos-pulled {
        bottom: -45vw;
    }
</style>