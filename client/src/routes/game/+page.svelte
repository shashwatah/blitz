<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";

    import Chessboard from "$lib/components/game/ChessBoard.svelte";
    import ChatBox from "$lib/components/game/ChatBox.svelte";
    import GameButton from "$lib/components/game/GameButton.svelte";
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

    function resign() {
        game.resign();
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
        <div id="chat-box-container" class="left-aux-el">
            <ChatBox/>
        </div>

        <div id="game-btn-container">
            <GameButton buttonValue={"abort"} isDisabled={true} isFirst={true}/>
            <GameButton buttonValue={"resign"} on:resign={resign}/>
            <GameButton buttonValue={"draw"} isLast={true}/>
        </div>
    </div> 
{/if}
   
<div id="chessboard-container" class="chessboard-pos-{boardPos}">
    <Chessboard board={board} color={game.COLOR} turn={turn}  moves={moves} on:move={move}/>
</div>

{#if boardPos === "center"}
    <div id="right-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
        <!-- <div id="p2-status-container" class="player-status-container">
            <PlayerStatus player={playerTwo}/>
        </div>
     -->
        <div id="move-board-container">
            <MoveBoard/>
        </div>

        <!-- <div id="p1-status-container" class="player-status-container">
            <PlayerStatus player={playerOne}/>
        </div> -->
    </div>
{/if}

<style>
    .aux-container {
        position: fixed;
        top: 50vh;
        transform: translateY(-50%);
        height: 30vw;
        width: 19vw;
    }

    #left-aux-container {
        left: 5%;
    }

    #chat-box-container {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        height: 18vw;
        width: 100%;
        border: 1px solid #d1d1d1;
    }

    #game-btn-container {
        position: fixed;
        bottom: 0px;
        height: 40px;
        width: 100%;
        text-align: center;
    }

    #right-aux-container {
        right: 5%;
    }

    .player-status-container {
        height: 55px;
        width: 100%;
    }
    
    /* #p1-status-container {
        position: fixed;
        bottom: 0px;
    }

    #p2-status-container {
        position: fixed;
        top: 0px;
    } */

    #move-board-container {
        position: fixed;
        height: 18vw;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    } 
    
    #chessboard-container {
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