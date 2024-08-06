<script lang="ts">
    import type { Player } from "../../types/general.types";
    import { chessPieces } from "$lib/data/chessPieces";

    export let player: Player;
</script>

<div id="player-status">
    <button id="timer" class="{player.isActive ? "" : "disabled"}" disabled>{player.timer}</button>
    <div id="sub-container">
        {#if !player.isOne} 
            <div id="name-container" class="sub-el">
                <p id="name" class="name-p2 {player.isActive ? "" : "disabled"}">{player.name}</p>
            </div>
        {/if}
        <div id="cap-pieces-container" class="sub-el {!player.isOne ? "cpc-p2" : "cpc-p1"}">
            {#each player.capturedPieces.slice(0, 5) as piece}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" 
                    class="captured-piece {player.color} {player.capturedPieces.length > 5 ? "ext" : ""}"> 
                    <!-- "ext" class needs better name -->
                    {@html chessPieces[piece].svg}
                </svg>
            {/each}
            {player.capturedPieces.length > 5 ? `+${player.capturedPieces.length - 5}`  : ""}
        </div>
        {#if player.isOne} 
            <div id="name-container" class="sub-el namec-p1">
                <p id="name" class="name-p1 {player.isActive ? "" : "disabled"}">{player.name}</p>
            </div>
        {/if}
    </div>
</div>

<style>
    #player-status {
        height: 100%;
        width: 100%;
    }

    #timer {
        position: relative;
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

    #timer.disabled {
        color: #a2a2a2;
    }

    #sub-container {
        float: right;
        height: 100%;
        width: calc(100% - 122px);
    }

    .sub-el {
        width: 100%;
        margin: 0px;
    }

    #name-container {
        height: 22px;
    }

    #name {
        float: right;
        color: #313131;
        font-family: "Space Mono", sans-serif;
        font-size: 18px;
        line-height: 0px;
        margin-bottom: 0px;
    }

    #name.disabled {
        color: #a2a2a2;
    }
    
    #cap-pieces-container {
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
        margin-right: -6px;
    }

    .captured-piece.ext:last-of-type {
        margin-right: -10px;
    }

    .captured-piece.white {
        fill: #fff;
    }

    .captured-piece.black {
        fill: #a2a2a2;
    }

    /* should this be changed? */
    .name-p1 {
        margin-top: 11px;
    }

    .namec-p1 {
        margin-top: 6px    ;
    }

    .name-p2 {
        margin-top: 7px;
    }

    .cpc-p2{
        margin-top: 6px;
    }
</style>