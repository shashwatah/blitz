<!-- todo:
        move 
            drag and drop
            controller msg
            board update
            moves history
-->

<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";

    import Chessboard from "$lib/components/game/ChessBoard.svelte";
    import ChatBox from "$lib/components/game/ChatBox.svelte";
    import GameButton from "$lib/components/game/GameButton.svelte";
    import MoveBoard from "$lib/components/game/MoveBoard.svelte";
    
    import game from "$lib/controllers/game";

    let boardPos: "pulled" | "center" = "pulled";

    function resign() {
        game.resign();
    }

    onMount(() => {
        game.STATUS.subscribe((status) => {
            // if status inactive show a message later
            if (status === "END" || status === "INACTIVE") goto("/");
        });

        setTimeout(() => {
            boardPos = "center";
        }, 0);
    })
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
    <Chessboard color={game.COLOR} chess={game.CHESS}/>
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