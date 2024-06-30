<script lang="ts">
    import { fade } from "svelte/transition";

    import { ChessBoardPos } from "$lib/types/chessBoard";
    import Chessboard from "$lib/components/Chessboard.svelte";

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
        <div id="move-board"></div>
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
        /* border: 1px solid black; */
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
        height: 20vw;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid #d1d1d1;
        background: #fff;
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