<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";

    import Chessboard from "$lib/components/game/ChessBoard.svelte";
    import MoveBoard from "$lib/components/game/MoveBoard.svelte";

    import type { Board } from "$lib/types/general";
    
    import game from "$lib/controllers/game";
    import type { Move } from "chess.js";

    let boardPos: "pulled" | "center" = "pulled";
    let board: Board = [];
    let turn: boolean = false;
    let moves: Move[] = [];

    // @ts-ignore
    function move(event) {
        game.move(event.detail);
    }

    onMount(() => {
        game.STATUS.subscribe((status) => {
            // if status inactive show a message later
            if (status === "END" || status === "INACTIVE") goto("/");
        });

        // should this go inside an else statement in status sub?
        // this only works because the sub func gets once upon script run 
        // don't need to put color in a separate var because by this time 
        //      color has already been declared
        game.CHESS.subscribe((chess) => {
            // should this even be decided here
            // more on this in the game controller
            board = chess.board();
            turn = game.COLOR === chess.turn();
            moves = turn ? chess.moves({verbose: true}) : [];
        });

        setTimeout(() => {
            boardPos = "center";
        }, 0);
    });
</script>

{#if boardPos === "center"} 
    <div id="left-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
    </div> 
{/if}
   
<div id="chessboard-container" class="chessboard-pos-{boardPos}">
    <Chessboard board={board} color={game.COLOR} turn={turn}  moves={moves} on:move={move}/>
</div>

{#if boardPos === "center"}
    <div id="right-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
        <div id="move-board-container">
            <!-- <MoveBoard/> -->
        </div>
    </div>
{/if}

<style>
    #chessboard-container {
        position: fixed;
        display: inline-block;
        margin-left: 50%;
        transition: 0.2s linear;
    }

    .chessboard-pos-pulled {
        height: 60vw;
        width: 60vw;
        bottom: -45vw;
        translate: -51.5% 0; /* ? */
    }

    .chessboard-pos-center {
        height: 40vw;
        width: 40vw;   
        bottom: 50vh;
        translate: -51.5% 50%;
    }

    /* this is only for broswer split view */
    @media only screen and (max-width: 775px) { 
        .chessboard-pos-center {
            height: 60vw;
            width: 60vw;
        }
    }
</style>    