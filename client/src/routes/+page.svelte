<script lang="ts">
    // still not perfect but better than yesterday
    // classes and vars are still too verbose and confusing
    // should be ready to accept backend data
    // can make components out of game setup (and smaller divs like cancel-btn?)
    // common classes:  container-type-1, choice-btn, square-btn
    // refactor required

    import { goto } from "$app/navigation";
    import Chessboard from "$lib/Chessboard.svelte";

    enum GameMode {
        None,
        Public,
        Private
    }

    enum PrivateGameMode {
        None,
        JoinGame,
        CreateGame
    }

    enum GameSetupPage {
        ModeSelection,
        PrivateGameSetup,
        Loading
    }

    let selectedGameMode: GameMode;
    let selectedPGMode: PrivateGameMode;
    let currentGSPage: GameSetupPage = GameSetupPage.ModeSelection;
    let loaderTimeoutID: number = 0;
    let loaderMessage: string = "setting up game..."; // need to change how this works later

    let chessboardClass: string = "chessboard-down";

    function gotoGSPage(page: GameSetupPage) {
        currentGSPage = page;
        chessboardClass = page === GameSetupPage.ModeSelection ? "chessboard-down" : "chessboard-up";
    }

    function gotoModeSelectionPage() {
        gotoGSPage(GameSetupPage.ModeSelection);
    }

    function selectGameMode(mode: GameMode) {
        selectedGameMode = mode;
        if (mode === GameMode.Public) {
            loadGame();
        } else {
            setupPrivateGame();
        }
    }

    function cancelGameModeSelection() {
        selectedGameMode = GameMode.None;
        gotoModeSelectionPage();
    }

    function setupPrivateGame() {
        selectedPGMode = PrivateGameMode.None;
        gotoGSPage(GameSetupPage.PrivateGameSetup);
    }

    function selectPGMode(pgMode: PrivateGameMode) {
        selectedPGMode = pgMode;
    }

    function cancelPGModeSelection() {
        selectedPGMode = PrivateGameMode.None;
    }

    function loadGame() {
        gotoGSPage(GameSetupPage.Loading);
        loaderTimeoutID = setTimeout(() => {goto("/game")}, 3000);
    }

    function cancelGameLoad() {
        if (loaderTimeoutID > 0) {
            clearTimeout(loaderTimeoutID);
            loaderTimeoutID = 0;
        }

        cancelPGModeSelection();
        cancelGameModeSelection();
    }

    console.log
</script>

<div id="game-setup-container">
    {#if currentGSPage === GameSetupPage.ModeSelection}
        <div id="game-mode-selection-container" class="container-type-1">
            <button id="public-game-btn" class="game-mode-selection-btn choice-btn"
                on:click="{() => {selectGameMode(GameMode.Public)}}">
                public game
            </button>
            <button id="private-game-btn" class="game-mode-selection-btn choice-btn"
                on:click="{() => {selectGameMode(GameMode.Private)}}">
                private game
            </button>       
        </div>
    {:else if currentGSPage === GameSetupPage.Loading}
        <div id="game-loader-container" class="container-type-1">
            <button id="game-loader-cancel-btn" class="square-btn" on:click={cancelGameLoad}>X</button>
            <button id="game-loader-msg">{loaderMessage}</button> 
        </div>
    {:else if currentGSPage === GameSetupPage.PrivateGameSetup} 
        {#if selectedPGMode === PrivateGameMode.None}
            <div id="pg-mode-selection-container" class="container-type-1">
                <button id="pg-mode-back-btn" class="square-btn" on:click={cancelGameModeSelection}>X</button>
                <div id="pg-mode-selection-sub-container" class="container-type-2">
                    <button id="join-game-btn" class="pg-mode-selection-btn choice-btn"
                        on:click={() => {selectPGMode(PrivateGameMode.JoinGame)}}>
                        join game
                    </button>
                    <button id="create-game-btn" class="pg-mode-selection-btn choice-btn"
                        on:click={() => {selectPGMode(PrivateGameMode.CreateGame)}}>
                        create game
                    </button>    
                </div>
            </div>
        {:else if selectedPGMode === PrivateGameMode.JoinGame}
            <div id="pg-join-game-container" class="container-type-1">
                <button id="pg-join-game-back-btn" class="square-btn" on:click={cancelGameLoad}>X</button>
                <div id="pg-join-game-sub-container" class="container-type-2">
                    <input id="pg-join-game-code-input" class="choice-btn" type="text" placeholder="game code" maxlength="6"/>
                    <button id="pg-join-game-join-btn" class="choice-btn" on:click={loadGame}>join game</button>
                </div>
            </div>
        {:else}
            <div id="pg-create-game-container">
                <div id="pg-cg-top-container" class="pg-create-container">
                    <button id="pg-cg-cancel-btn" class="square-btn" on:click={gotoModeSelectionPage}>X</button>
                    <button id="code" disabled>que-ere-fdq</button>
                    <button id="copy-btn">copy</button>
                </div>       
                <div id="pg-cg-bot-container" class="pg-create-container">
                    <button id="pg-cg-msg">player has joined!</button>
                    <button id="pg-cg-start-btn" on:click={loadGame}>start game</button>
                </div>
            </div>   
        {/if}
    {/if}
</div>

<div id="chessboard-container" class="{chessboardClass}">
    <Chessboard/>
</div>

<style>
    #game-setup-container {
        height: 175px;
        width: 50%; /**/
        position: fixed;
        top: calc(50% - 110px); /**/
        margin-left: 50%;
        transform: translateX(-50%);
        /* border: 1px solid black; */
    }

    .container-type-1 {
        height: 50px;
        width: 80%;
        position: relative;
        top: calc(50% - 25px); /**/
        margin-left: 50%;
        transform: translateX(-50%);
    }   

    .choice-btn {
        height: 100%;
        width: 48%;
        background: #fff;
        color: #313030;
        border: 1.5px solid #d3d2d2;
        font-family: "Roboto Mono", sans-serif;
        font-size: 17px;
        cursor: pointer;
    }

    /* find better hover effect for these buttons - maybe?*/
    button.choice-btn:hover {
        border: 2px solid #d3d2d2;
    }

    .choice-btn:nth-child(1) {
        float: left;
    }

    .choice-btn:nth-child(2) {
        float: right;
    }

    .container-type-2 {
        height: 100%;
        width: calc(100% - 70px);
        float: right;
    }

    .square-btn {
        height: 100%;
        width: 50px;
        background: #fff;
        color: #313030;
        border: 1.5px solid #d3d2d2;
        font-size: 17px;
        font-family: sans-serif;
        font-weight: bolder;
        cursor: pointer;
        float: left;
    }

    #pg-join-game-code-input {
        height: calc(100% - 3px);
        text-align: center;
        user-select: none;
    }

    #pg-join-game-code-input::placeholder {
        color: lightgray;
    }

    .square-btn:hover {
        border: 2px solid #d3d2d2;
    }

    #game-loader-msg {
        height: 100%;
        width: calc(100% - 70px);
        background: #efefee;
        color: #A2A2A2;
        border: none;
        float: right;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
    }

    #pg-create-game-container {
        height: 125px;
        width: 90%;
        position: relative;
        /* top: calc(50% - 62.5px);  */
        /* border: 1px solid blue; */
        margin-left: 50%;
        transform: translateX(-50%);
    }

    .pg-create-container {
        height: 50px;
        width: 100%;
        /* border: 1px solid green; */
    }

    .pg-create-container:nth-child(1) {
        margin-bottom: 25px;
    }

    #code {
        height: 100%;
        width: calc(100% - 195px);
        font-family: "Roboto Mono", sans-serif;
        font-size: 17px;
        font-weight: 400;
        color: #D1D1D1;
        background: #EFEFEF;
        border: none;
        margin-left: 20px;
    }

    #copy-btn {
        height: 100%;
        width: 120px;
        float: right;
        font-family: "Roboto Mono", sans-serif;
        font-size: 17px;
        /* font-weight: bold; */
        background: none;
        color: #D1D1D1;
        border: none;
    }

    #pg-cg-msg {
        height: 100%;
        width: calc(100% - 270px);
        background: #efefee;
        color: #A2A2A2;
        border: none;
        float: left;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
    }

    #pg-cg-start-btn {
        height: 100%;
        width: 250px;
        float: right;
        font-family: "Roboto Mono", sans-serif;
        font-size: 17px;
        background: #fff;
        color: #313030;
        border: 1.5px solid #d3d2d2;
        cursor: pointer;
    }

    #pg-cg-start-btn:hover {
        border: 2px solid #d3d2d2;
    }

    #chessboard-container {
        height: 60vw;
        width: 60vw;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        transition: 0.1s linear;
    }

    .chessboard-down {
        bottom: -52.5vw;
    }

    .chessboard-up {
        bottom: -45vw;
    }
</style>