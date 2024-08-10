<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import type { GameType, PvtMode } from "$lib/types/general";

    export let setupReset: boolean;
    $: if (setupReset) reset();

    let gameType: GameType = undefined;
    let pvtMode: PvtMode = undefined; 
    let gameCode = "";

    function selectGameType(type: GameType) {
        gameType = type;
        dispatch("select");

        if (gameType === "PUBLIC") finish();
    }

    function unselectGameType() {
        gameType = undefined;
        unselectPvtMode();
        dispatch("unselect");
    }

    function selectPvtMode(mode: PvtMode) {
        pvtMode = mode;

        if (pvtMode === "CREATE") finish();
    }

    function unselectPvtMode() {
        pvtMode = undefined;
        gameCode = "";
    }

    let waiting = false;

    function finish() {
        dispatch("finish", {
            type: gameType,
            code: gameCode
        });
        waiting = true;
    }

    function cancel() {
        dispatch("cancel");
        reset();
    }

    function reset() {
        unselectGameType();
        waiting = false;
    }
</script>

{#if waiting} 
    <div id="wt-container" class="container {gameType === "PRIVATE" ? "dr" : "sr"}">
        {#if gameType === "PRIVATE"}
            <div id="wt-code-row" class="wt-row">
                <button id="wt-code" class="msg-box ft-roboto f-left">que-ere-fdq</button>
                <button id="wt-copy-btn" class="ft-roboto f-right">copy</button>
            </div>
        {/if}
        <div id="wt-msg-row" class="wt-row">
            <button id="wt-cancel-btn" class="std-btn cancel-btn f-left" on:click={cancel}>X</button>
            <button id="wt-msg" class="msg-box f-right ft-roboto">
                waiting for opponent...
            </button> 
        </div>
    </div>   
{:else if !gameType}
    <div id="gm-sel-container" class="container sr">
        <button id="public-gm-sel-btn" class="gm-sel-btn std-btn f-left ft-roboto"
            on:click="{() => {selectGameType("PUBLIC")}}">
            public game
        </button>
        <button id="private-gm-sel-btn" class="gm-sel-btn std-btn f-right ft-roboto"
            on:click="{() => {selectGameType("PRIVATE")}}">
            private game
        </button>       
    </div>
{:else if gameType === "PRIVATE"}
    {#if !pvtMode}
        <div id="pgm-sel-container" class="container sr">
            <button id="pgm-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectGameType}>X</button>
            <button id="pgm-join-btn" class="pgm-sel-btn std-btn sr-wcb-el sr-wcb-el-left ft-roboto"
                on:click={() => selectPvtMode("JOIN")}>
                join game
            </button>
            <button id="pgm-create-btn" class="pgm-sel-btn std-btn sr-wcb-el sr-wcb-el-right ft-roboto"
                on:click={() => selectPvtMode("CREATE")}>
                create game
            </button>
        </div>
    {:else}
        <div id="pgm-join-container" class="container sr">
            <button id="pgmj-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectPvtMode}>X</button>
            <input id="pgmj-code-input" class="sr-wcb-el sr-wcb-el-left ft-roboto" type="text" placeholder="game code" maxlength="8" bind:value={gameCode}/>
            <button id="pgmj-join-btn" class="std-btn sr-wcb-el sr-wcb-el-right ft-roboto" on:click={finish}>join game</button>
        </div>
    {/if}
{/if}

<style>
    .container {
        width: 80%;
        position: relative;
        margin-left: 50%;
        transform: translateX(-50%);
    }

    .sr {
        height: 50px;
        top: calc(50% - 25px); /**/
    }   

    .dr {
        height: 125px;
    }

    .std-btn {
        height: 100%;
        background: #fff;
        color: #313030;
        border: 1.5px solid #d3d2d2;
        cursor: pointer;
    }

    /* find better hover effect for these buttons - maybe?*/
    .std-btn:hover {
        border: 2px solid #d3d2d2;
    }

    /* element based classes */
    .cancel-btn {
        width: 50px;
        font-family: sans-serif;
        font-size: 18px;
        font-weight: bolder;
    }

    .gm-sel-btn {
        width: 48%;
    }

    .sr-wcb-el {
        width: calc(50% - 49.5px);
    }

    .sr-wcb-el-left {
        margin-left: 30px;
    }

    .sr-wcb-el-right {
        margin-left: 15px;
    }

    /* elements */
    #pgmj-code-input {
        height: calc(100% - 3px);
        width: calc(50% - 55.5px);
        text-align: center;
        background: #fff;
        border: 1.5px solid #313030;
        user-select: none;
    }

    #pgmj-code-input::placeholder {
        color: #a2a2a2;
    }
    
    .wt-row {
        height: 50px;
        width: 100%;
    }

    .wt-row:nth-of-type(1) {
        margin-bottom: 25px;
    }

    .msg-box {
        height: 100%;
        background: #efefee;
        color: #a2a2a2;
        border: none;
    }

    #wt-msg {
        width: calc(100% - 70px);
    }

    #wt-code {
        width: calc(100% - 140px);
        font-weight: 400;
        color: #d1d1d1;
    }

    #wt-copy-btn {
        height: 100%;
        width: 120px;
        background: none;
        color: #d1d1d1;
        border: none;
    }
</style>