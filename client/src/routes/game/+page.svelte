<script lang="ts">
    // refactored but still a bit makeshifty
    // no idea how media queries are going to work on this

    import { fade } from "svelte/transition";

    import { ChessBoardPos } from "$lib/types/chessBoard";
    import Chessboard from "$lib/components/Chessboard.svelte";
    import { chessPieces } from "$lib/data/chessPieces";

    let currentChessboardPos = ChessBoardPos.Pulled;
    let chessboardRendered = false;

    setTimeout(() => {
        currentChessboardPos = ChessBoardPos.Center;
        chessboardRendered = true;
    }, 0);

    let p1Timer = "2:57";
    let p2Timer = "2:45";
    
    let p1CapturedPieces = ["king", "pawn", "pawn", "rook", "bishop", "queen"];
    let p2CapturedPieces = ["pawn", "knight", "pawn"];
</script>

{#if chessboardRendered} 
    <div id="left-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
        <div id="chat-box-container" class="left-aux-el">
            <div id="chat-box-history" class="chat-box-el"></div>
            <input type="text" id="chat-box-msg-input" class="chat-box-el" placeholder="type your message"/>
        </div>

        <div id="game-btn-container">
            <button class="game-btn ft-roboto disabled">abort</button>
            <button class="game-btn ft-roboto">resign</button>
            <button class="game-btn ft-roboto">draw</button>
        </div>
    </div> 
{/if}
   
<div id="chessboard-container" class="chessboard-pos-{currentChessboardPos}">
    <Chessboard/>
</div>

{#if chessboardRendered}
    <div id="right-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
        <div id="p2-status-container" class="player-status-container">
            <button id="p2-timer" class="player-status-el player-timer disabled" disabled>{p2Timer}</button>
            <div id="p2-status-sub-container" class="player-status-el player-status-sub-container">
                <div id="p2-name-container" class="player-status-sub-el player-name-container">
                    <p id="p2-name" class="player-name">guest_514</p>
                </div>
                <div id="p2-cap-pieces-container" class="player-status-sub-el player-cap-pieces-container">
                    {#each p2CapturedPieces.slice(0, 5) as piece}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="captured-piece white">
                            {@html chessPieces[piece].svg}
                        </svg>
                    {/each}
                    {p2CapturedPieces.length > 5 ? `+ ${p2CapturedPieces.length - 5}`  : ""}
                </div>
            </div>
        </div>
    
        <div id="move-board"></div>

        <div id="p1-status-container" class="player-status-container">
            <button id="p1-timer" class="player-status-el player-timer">{p1Timer}</button>
            <div id="1-status-sub-container" class="player-status-el player-status-sub-container">
                <div id="p1-cap-pieces-container" class="player-status-sub-el player-cap-pieces-container">
                    {#each p1CapturedPieces.slice(0, 5) as piece}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="captured-piece black">
                            {@html chessPieces[piece].svg}
                        </svg>
                    {/each}
                    {p1CapturedPieces.length > 5 ? `+${p1CapturedPieces.length - 5}` : ""}
                </div>
                <div id="p1-name-container" class="player-status-sub-el player-name-container">
                    <p id="p1-name" class="player-name">dedcliff</p>
                </div>
            </div>
        </div>
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

    #chat-box-history {
        position: fixed;
        top: 0px;
        height: calc(100% - 44px);
        width: 100%;
    }

    #chat-box-msg-input {
        position: fixed;
        bottom: .5px;
        height: 40px;
        width: calc(100% - 20px);
        background: #efefef;
        border: none;
        border-top: 1px solid #d1d1d1;
        padding: 0px 10px;
        font-size: 15px;
        font-family: "Roboto Mono", sans-serif;
        color: #313131;
    }

    #chat-box-msg-input::placeholder {
        color: #a2a2a2;
    }

    #game-btn-container {
        position: fixed;
        bottom: 0px;
        height: 40px;
        width: 100%;
        text-align: center;
    }

    .game-btn {
        height: 100%;
        width: 30%;
        font-size: 14px;
        color: #a2a2a2;
        border: none;
        background: #efefef;
        cursor: pointer;
    }

    .game-btn:not(.disabled):hover {
        color: #313131;
    }

    .game-btn.disabled {
        color: #d1d1d1;
    }

    .game-btn:first-of-type {
        float: left;
    }

    .game-btn:last-of-type {
        float: right;
    }

    #right-aux-container {
        right: 5%;
    }

    .player-status-container {
        height: 55px;
        width: 100%;
        /* border: 1px solid black; */
    }

    .player-timer {
        float: left;
        height: 100%;
        width: 120px;
        font-size: 30px;
        font-family: "Space Mono", sans-serif;
        font-weight: bold;
        color: #313131;
        background: #efefef;
        border: none;
    }

    .player-timer.disabled {
        color: #a2a2a2;
    }

    .player-status-sub-container {
        float: right;
        height: 100%;
        width: calc(100% - 122px);
    }

    .player-status-sub-el {
        width: 100%;
        margin: 0px;
    }

    .player-name-container {
        height: 22px;
    }

    .player-name {
        float: right;
        font-family: "Space Mono", sans-serif;
        font-size: 18px;
        line-height: 0px;
        margin-bottom: 0px;
    }
    
    .player-cap-pieces-container {
        position: relative;
        height: 31px;
        color: #a2a2a2;
        font-family: "Space Mono", sans-serif;
        font-size: 17px;
        display: inline-block;
        text-align: right;
    }

    .captured-piece {
        position: relative;
        height: 35px;
        margin-right: -5px;
        stroke: #313030;
        stroke-width: .6px;
        vertical-align: middle;
        display: inline-block;
    }

    .captured-piece:last-of-type {
        margin-right: -10px;
    }

    .captured-piece.white {
        fill: #fff;
    }

    .captured-piece.black {
        fill: #a2a2a2;
    }

    #p1-status-container {
        position: fixed;
        bottom: 0px;
    }
    
    #p1-name {
        margin-top: 11px;
    }

    #p1-name-container {
        margin-top: 2px    ;
    }

    #p2-status-container {
        position: fixed;
        top: 0px;
    }

    #p2-name {
        margin-top: 7px;
    }

    #p2-cap-pieces-container {
        margin-top: 2px;
    }

    #move-board {
        position: fixed;
        height: 18vw;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        background: #efefef;
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