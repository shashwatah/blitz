<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import type { GameType, ConnMode } from "$lib/types/general";

    export let setupReset: boolean;
    $: if (setupReset) reset();

    let selectedGameType: GameType = undefined;
    let selectedConnMode: ConnMode = undefined; 
    let gameCode = "";

    function selectGameType(type: GameType) {
        selectedGameType = type;
        dispatch("select");
        if (type === "PUBLIC") finish();
    }

    function unselectGameType() {
        selectedGameType = undefined;
        dispatch("unselect");
        unselectConnMode();
    }

    function selectConnMode(mode: ConnMode) {
        selectedConnMode = mode;
    }

    function unselectConnMode() {
        if (selectedConnMode === "JOIN") gameCode = "";
        selectedConnMode = undefined;
    }

    let showLoader = false;

    function finish() {
        dispatch("finish", {
            type: selectedGameType,
            code: gameCode
        });
        showLoader = true;
    }

    function cancel() {
        dispatch("cancel");
        reset();
    }

    function reset() {
        unselectGameType();
        showLoader = false;
    }
</script>

{#if showLoader} 
    <div id="gl-container" class="sr-container">
        <button id="gl-cancel-btn" class="std-btn cancel-btn f-left" on:click={cancel}>X</button>
        <button id="gl-msg" class="msg-box f-right ft-roboto">
            loading {selectedGameType === "PUBLIC" ? "public" : "private"} game...
        </button> 
    </div>
{:else if !selectedGameType}
    <div id="gm-sel-container" class="sr-container">
        <button id="public-gm-sel-btn" class="gm-sel-btn std-btn f-left ft-roboto"
            on:click="{() => {selectGameType("PUBLIC")}}">
            public game
        </button>
        <button id="private-gm-sel-btn" class="gm-sel-btn std-btn f-right ft-roboto"
            on:click="{() => {selectGameType("PRIVATE")}}">
            private game
        </button>       
    </div>
{:else if selectedGameType === "PRIVATE"}
    {#if !selectedConnMode}
        <div id="pgm-sel-container" class="sr-container">
            <button id="pgm-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectGameType}>X</button>
            <button id="pgm-join-btn" class="pgm-sel-btn std-btn sr-wcb-el sr-wcb-el-left ft-roboto"
                on:click={() => {selectConnMode("JOIN")}}>
                join game
            </button>
            <button id="pgm-create-btn" class="pgm-sel-btn std-btn sr-wcb-el sr-wcb-el-right ft-roboto"
                on:click={() => {selectConnMode("CREATE")}}>
                create game
            </button>
        </div>
    {:else if selectedConnMode === "JOIN"}
        <div id="pgm-join-container" class="sr-container">
            <button id="pgmj-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectConnMode}>X</button>
            <input id="pgmj-code-input" class="sr-wcb-el sr-wcb-el-left ft-roboto" type="text" placeholder="game code" maxlength="8" bind:value={gameCode}/>
            <button id="pgmj-join-btn" class="std-btn sr-wcb-el sr-wcb-el-right ft-roboto" on:click={finish}>join game</button>
        </div>
    {:else}
        <!-- the game starts on its now (backend) rather than waiting for player one to start it 
             will have to change this later. for now: click on start game to wait for opponent-->
        <div id="pgm-create-container" class="dr-container">
            <div id="pgmc-top-container" class="dr-row-container">
                <button id="pgmc-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectConnMode}>X</button>
                <button id="pgmc-code-box" class="msg-box ft-roboto">que-ere-fdq</button>
                <button id="pgmc-copy-btn" class="ft-roboto">copy</button>
            </div>       
            <div id="pgmc-bot-container" class="dr-row-container">
                <button id="pgmc-msg-box" class="msg-box ft-roboto f-left">player has joined!</button>
                <button id="pgmc-start-btn" class="std-btn ft-roboto f-right" on:click={finish}>start game</button>
            </div>
        </div>   
    {/if}
{/if}

<style>
    /* standard elements */
    .sr-container{
        height: 50px;
        width: 80%;
        position: relative;
        top: calc(50% - 25px); /**/
        margin-left: 50%;
        transform: translateX(-50%);
    }   

    .dr-container {
        height: 125px;
        width: 90%;
        position: relative;
        /* top: calc(50% - 62.5px);  */
        margin-left: 50%;
        transform: translateX(-50%);
    }
    
    .dr-row-container {
        height: 50px;
        width: 100%;
    }

    .dr-row-container:nth-child(1) {
        margin-bottom: 25px;
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

    .msg-box {
        height: 100%;
        background: #efefee;
        color: #a2a2a2;
        border: none;
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
    
    #gl-msg {
        width: calc(100% - 70px);
    }

    #pgmc-code-box {
        width: calc(100% - 195px);
        font-weight: 400;
        color: #d1d1d1;
        margin-left: 20px;
    }

    #pgmc-copy-btn{
        height: 100%;
        width: 120px;
        background: none;
        color: #d1d1d1;
        border: none;
    }

    #pgmc-msg-box {
        width: calc(100% - 270px);
    }

    #pgmc-start-btn {
        width: 250px;
    }
</style>