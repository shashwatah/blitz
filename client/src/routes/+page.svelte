<script lang="ts">
    import { goto } from "$app/navigation";
    
    import Chessboard from "$lib/components/game/ChessBoard.svelte";
    import GameSetup from "$lib/components/GameSetup.svelte";
    
    import game from "$lib/controllers/game";

    let chessboardPos: "default" | "pulled" = "default";
    let resetSetup = false;
    let gameCode: string | undefined = undefined;

    function connect(event: CustomEvent) {
        game.connect(event.detail.type, event.detail.code);
        game.STATUS.subscribe((status) => {
            if (status === "RESET") resetSetup = true;
            if (status === "WAITING") gameCode = game.CODE;
            if (status === "ACTIVE") goto("/game");
        })
    }

    function disconnect() {
        game.disconnect();
    }
</script>

<div id="game-setup-container">
    <GameSetup 
        on:select={() => {chessboardPos = "pulled"}} 
        on:unselect={() => {chessboardPos = "default"}} 
        on:finish={connect} 
        on:cancel={disconnect}
        resetSetup={resetSetup}
        gameCode={gameCode}
    />
</div>

<div id="chessboard-container" class="chessboard-pos-{chessboardPos}">
    <Chessboard />
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