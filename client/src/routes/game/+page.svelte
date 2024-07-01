<script lang="ts">
    // really janky code, works in the browser though.
    // worst part: player info 
    // major refactor needed

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
</script>

{#if chessboardRendered} 
    <div id="left-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
        <div id="chat-box">
            <div id="chat-box-chats"></div>
            <input type="text" id="chat-box-input" placeholder="type your message"/>
        </div>
        <div id="match-btn-container">
            <button class="match-btn disabled-btn">abort</button>
            <button class="match-btn">resign</button>
            <button class="match-btn">draw</button>
        </div>
    </div>

    <div id="right-aux-container" class="aux-container" transition:fade={{ delay: 400, duration: 100 }}>
        <div id="opp-container" class="player-container">
            <button class="timer" disabled>2:55</button>
            <div id="opp-info-container" class="player-info-container">
                <div id="opp-name-container" class="player-info-element player-name-container">
                    <p id="opp-name" class="player-name">opponent</p>
                </div>
                <div id="opp-cp-container" class="player-info-element player-cp-container">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece wcp cr-el">
                        {@html chessPieces["bishop"].svg}
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece wcp cr-el">
                        {@html chessPieces["bishop"].svg}
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece wcp cr-el">
                        {@html chessPieces["bishop"].svg}
                    </svg>
                    <!-- <p class="chess-end cr-el">+1</p> -->
                     +1
                </div>
            </div>
        </div>
        <div id="move-board"></div>
        <div id="user-container" class="player-container">
            <button class="timer disabled" disabled>2:55</button>
            <div id="user-info-container" class="player-info-container">
                <div id="user-cp-container" class="player-info-element player-cp-container">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece bcp cr-el">
                        {@html chessPieces["bishop"].svg}
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece bcp cr-el">
                        {@html chessPieces["bishop"].svg}
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece bcp cr-el">
                        {@html chessPieces["bishop"].svg}
                    </svg>
                    <!-- <p class="chess-end cr-el">+1</p> -->
                    +1
                </div>
                <div id="user-name-container" class="player-info-element player-name-container">
                    <p id="user-name" class="player-name">opponent</p>
                </div>
            </div>
        </div>
    </div>
{/if}

<div id="chessboard-container" class="chessboard-pos-{currentChessboardPos}">
    <Chessboard/>
</div>


<style>
    .aux-container {
        position: fixed;
        height: 30vw;
        width: 20vw;
        top: 50vh;
        transform: translateY(-50%);
    }

    #left-aux-container {
        left: 5%;
    }

    #chat-box {
        position: relative;
        height: 18vw;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid #d1d1d1;
    }

    #chat-box-chats {
        position: fixed;
        top: 0px;
        height: calc(100% - 44px);
        width: 100%;
    }

    #chat-box-input {
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

    #chat-box-input::placeholder {
        color: #a2a2a2;
    }

    #match-btn-container {
        position: fixed;
        bottom: 0px;
        /* border: 1px solid green; */
        height: 40px;
        width: 100%;
        text-align: center;
    }

    .match-btn {
        height: 100%;
        width: 30%;
        /* margin-right: 3.6%; */
        font-family: "Roboto Mono", sans-serif;
        font-size: 14px;
        border: none;
        color: #a2a2a2;
        background: #efefef;
        cursor: pointer;
    }

    .match-btn:not(.disabled-btn):hover {
        color: #313131;
    }

    .match-btn.disabled-btn {
        color: #d1d1d1;
    }

    .match-btn:nth-of-type(1) {
        float: left;
    }

    .match-btn:nth-of-type(3) {
        float: right;
    }

    #right-aux-container {
        right: 5%;
    }

    #move-board {
        position: relative;
        height: 18vw;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        background: #efefef;
    } 

    .player-container {
        position: fixed;
        height: 55px;
        width: 100%;
    }
    
    #opp-container {
        top: 0px;
    }
    
    #user-container {
        bottom: 0px;
    }

    .timer {
        height: 100%;
        width: 120px;
        background: #efefef;
        float: left;
        font-family: "Space Mono", sans-serif;
        font-weight: bold;
        font-size: 30px;
        color: #313131;
        border: none;
    }

    .timer.disabled {
        color: #a2a2a2;
    }

    .player-info-container {
        height: 100%;
        width: 175px;
        float: right;
        /* margin-right: 0px; */
    }

    .player-info-element {
        background: 1px solid blue;
        float: right;
    }

    .player-name-container {
        height: 35%;
        width: 175px;
    }

    /* why does this work??!! */
    .player-name {
        line-height: 0px;
        margin-top: 7px;
        float: right;
        font-family: "Space Mono", sans-serif;
        font-size: 18px;
    }

    #opp-name {
        color: #313131;
    }

    #user-name {
        color: #a2a2a2;
    }

    .player-cp-container {
        height: 35px;
        font-family: "Space Mono", sans-serif;
        font-size: 17px;
        /* border: 1px solid black; */
        margin-right: -2px;
        color: #a2a2a2;
    }

    #opp-cp-container {
        margin-top: 7px;
    }

    .chess-piece {
        margin: 0px;
        position: relative;
        height: 35px;
        vertical-align: middle;
        display: inline-block;
        margin-right: -30px;
        stroke: #313030;
        stroke-width: .6px;
    }

    .chess-piece:nth-of-type(1) {
        z-index: 2;
    }

    .chess-piece:nth-of-type(2) {
        z-index: 1;
    }

    .chess-piece:nth-of-type(3) {
        z-index: 0;
        margin-right: -10px;
    }

    .wcp {
        fill: #fff;
    }

    .bcp {
        fill: #a2a2a2;
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