<script lang="ts">
    import { goto } from "$app/navigation";
    
    import Chessboard from "$lib/components/game/ChessBoard.svelte";
    import GameSetup from "$lib/components/GameSetup.svelte";

    import { Color } from "$lib/types/general.types";
    
    let chessboardPos: "default" | "pulled" = "default";
    let loader: NodeJS.Timeout | undefined;

    function loadGame(event: CustomEvent) {
        console.log(`type: ${event.detail.type}, mode: ${event.detail.mode}`);
        loader = setTimeout(() => {goto("/game")}, 3000);
    }

    function cancelGameLoad() {
        if (loader) clearTimeout(loader);
    }
</script>

<div id="game-setup-container">
    <GameSetup 
        on:select={() => {chessboardPos = "pulled"}} 
        on:unselect={() => {chessboardPos = "default"}} 
        on:finish={loadGame} 
        on:cancel={cancelGameLoad}
    />
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