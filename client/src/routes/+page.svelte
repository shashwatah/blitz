<script lang="ts">
    import { goto } from "$app/navigation";

    import FauxBoard from "$lib/components/FauxBoard.svelte";
    import Setup from "$lib/components/Setup.svelte";
    
    import game from "$lib/controllers/game";

    let gameCode = "";
    let setup: Setup;
    let boardPos: "default" | "pulled" = "default";

    function connect(event: CustomEvent) {
        game.connect(event.detail.type, event.detail.code);
        game.STATUS.subscribe((status) => {
            if (status === "RESET" && setup) setup.reset();
            if (status === "WAITING" && game.CODE) gameCode = game.CODE;
            if (status === "ACTIVE") goto("/game");
        });
    }

    function disconnect() {
        game.disconnect();
    }
</script>

<div id="setup-container">
    <Setup 
        on:select={() => {boardPos = "pulled"}} 
        on:unselect={() => {boardPos = "default"}} 
        on:finish={connect} 
        on:cancel={disconnect}
        gameCode={gameCode}
        bind:this={setup}
    />
</div>

<div id="chessboard-container" class="chessboard-pos-{boardPos}">
    <FauxBoard />
</div>

<style>
    /* main container */
    #setup-container {
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