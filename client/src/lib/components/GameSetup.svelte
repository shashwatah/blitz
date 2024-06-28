<script lang="ts">
    // vars and classes are not verbose anymore but might be confusing
    // might make a legend later, good luck future me

    import { createEventDispatcher } from "svelte";
    import { GameMode, PrivateGameMode, GameSetupPage } from "../types/gameSetup"
    
    const dispatch = createEventDispatcher();

    let selectedGM: GameMode = GameMode.None;
    let selectedPGM: PrivateGameMode = PrivateGameMode.None;
    let currentGSP: GameSetupPage = GameSetupPage.ModeSelection;
    
    // this will get removed later
    let loaderTimeoutID: number = 0;

    // Page Controls
    function gotoGSP(page: GameSetupPage) {
        currentGSP = page;
        dispatch("page-change", {isMS: page === GameSetupPage.ModeSelection ? true : false});
    }

    function gotoMSP() { // this exists because it gets called in html too.
        gotoGSP(GameSetupPage.ModeSelection);
    }

    // Mode Selection
    function selectGameMode(mode: GameMode) {
        selectedGM = mode;
        mode === GameMode.Public ? loadGame() : gotoGSP(GameSetupPage.PrivateGameSetup);
    }

    function unselectGameMode() {
        selectedGM = GameMode.None;
        gotoMSP();
    }

    // Private Game Setup
    function selectPrivateGameMode(pgMode: PrivateGameMode) {
        selectedPGM = pgMode;
    }

    function unselectPrivateGameMode() {
        selectedPGM = PrivateGameMode.None;
        unselectGameMode();
    }

    // Game Load
    function loadGame() {
        gotoGSP(GameSetupPage.Loading);
        loaderTimeoutID = setTimeout(() => {dispatch("goto-game")}, 3000);
    }

    function cancelGameLoad() {
        if (loaderTimeoutID > 0) {
            clearTimeout(loaderTimeoutID);
            loaderTimeoutID = 0;
        }

        unselectPrivateGameMode();
        unselectGameMode();
    }
</script>


{#if currentGSP === GameSetupPage.ModeSelection}
    <div id="gm-sel-container" class="sr-container">
        <button id="public-gm-sel-btn" class="gm-sel-btn std-btn f-left ft-roboto"
            on:click="{() => {selectGameMode(GameMode.Public)}}">
            public game
        </button>
        <button id="private-gm-sel-btn" class="gm-sel-btn std-btn f-right ft-roboto"
            on:click="{() => {selectGameMode(GameMode.Private)}}">
            private game
        </button>       
    </div>
{:else if currentGSP === GameSetupPage.Loading}
    <div id="gl-container" class="sr-container">
        <button id="gl-cancel-btn" class="std-btn cancel-btn f-left" on:click={cancelGameLoad}>X</button>
        <button id="gl-msg" class="msg-box f-right ft-roboto">
            loading {selectedGM === GameMode.Public ? "public" : "private"} game...
        </button> 
    </div>
{:else if currentGSP === GameSetupPage.PrivateGameSetup && selectedGM === GameMode.Private} <!-- redundant? -->

    {#if selectedPGM === PrivateGameMode.None}
        <div id="pgm-sel-container" class="sr-container">
            <button id="pgm-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectGameMode}>X</button>
            <button id="pgm-join-btn" class="pgm-sel-btn std-btn sr-wcb-el sr-wcb-el-left ft-roboto"
                on:click={() => {selectPrivateGameMode(PrivateGameMode.Join)}}>
                join game
            </button>
            <button id="pgm-create-btn" class="pgm-sel-btn std-btn sr-wcb-el sr-wcb-el-right ft-roboto"
                on:click={() => {selectPrivateGameMode(PrivateGameMode.Create)}}>
                create game
            </button>
        </div>
    {:else if selectedPGM === PrivateGameMode.Join}
        <div id="pgm-join-container" class="sr-container">
            <button id="pgmj-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectPrivateGameMode}>X</button>
            <input id="pgmj-code-input" class="sr-wcb-el sr-wcb-el-left ft-roboto" type="text" placeholder="game code" maxlength="6"/>
            <button id="pgmj-join-btn" class="std-btn sr-wcb-el sr-wcb-el-right ft-roboto" on:click={loadGame}>join game</button>
        </div>
    {:else}
        <div id="pgm-create-container" class="dr-container">
            <div id="pgmc-top-container" class="dr-row-container">
                <button id="pgmc-cancel-btn" class="std-btn cancel-btn f-left" on:click={unselectPrivateGameMode}>X</button>
                <button id="pgmc-code-box" class="msg-box ft-roboto">que-ere-fdq</button>
                <button id="pgmc-copy-btn" class="ft-roboto">copy</button>
            </div>       
            <div id="pgmc-bot-container" class="dr-row-container">
                <button id="pgmc-msg-box" class="msg-box ft-roboto f-left">player has joined!</button>
                <button id="pgmc-start-btn" class="std-btn ft-roboto f-right" on:click={loadGame}>start game</button>
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