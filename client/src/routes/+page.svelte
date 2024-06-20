<script lang="ts">
    // ugly, janky code that works
    // needs major refactoring
    // should be ready to accept backend data
    // move game setup to a separate component
    // change names for divs and vars, cleanup css
    // clean up or change the page change mechanism and if expressions

    import { goto } from "$app/navigation";
    import Chessboard from "$lib/Chessboard.svelte";

    enum GameMode {
        Private,
        Public
    }

    enum PrivateGameChoice {
        None,
        JoinRoom,
        CreateRoom
    }

    enum GameSetupPage {
        Main,
        Settings,
        Loading
    }

    let selectedMode: GameMode;
    let selectedPGChoice: PrivateGameChoice = PrivateGameChoice.None;
    let currentPage: GameSetupPage = GameSetupPage.Main;
    let lastPage: GameSetupPage;
    let loadingTimeoutID: number = 0;

    let loadingMessage = "setting up game...";

    function gotoPage(page: GameSetupPage) {
        lastPage = currentPage;
        currentPage = page
    }

    function selectGameMode(mode: GameMode) {
        selectedMode = mode;
        if (mode === GameMode.Public) {
            loadGame();
        } else {
            gotoPage(GameSetupPage.Settings)
        }
    }

    function selectRoomChoice(choice: PrivateGameChoice) {
        selectedPGChoice = choice;
    }

    function cancelChoice() {
        selectedPGChoice = PrivateGameChoice.None;
        gotoPage(lastPage)
    }

    function loadGame() {
        gotoPage(GameSetupPage.Loading);
        loadingTimeoutID = setTimeout(() => {goto("/game")}, 3000);
    }

    function cancelLoad() {
        if (loadingTimeoutID !== 0) {
            clearTimeout(loadingTimeoutID);
            loadingTimeoutID = 0;
        }
        gotoPage(lastPage);
    }
</script>


<div id="game-setup-container">
    {#if currentPage === GameSetupPage.Settings && selectedMode === GameMode.Private && selectedPGChoice === PrivateGameChoice.JoinRoom}
        <button class="cancel-back-btn" on:click="{cancelChoice}">X</button>
        <input type="text" placeholder="room code"/>
        <button on:click={loadGame}>enter room</button>
    {:else if currentPage === GameSetupPage.Settings && selectedMode === GameMode.Private && selectedPGChoice === PrivateGameChoice.CreateRoom}
        <button class="cancel-back-btn" on:click="{cancelChoice}">X</button>
        <button>que-ere-fdq</button>
        <button>join</button>
        <button>player has joined!</button>
        <button on:click={loadGame}>start game</button> 
    {:else if currentPage === GameSetupPage.Settings && selectedMode === GameMode.Private && selectedPGChoice === PrivateGameChoice.None} 
        <div id="private-room-choice-container" class="center-container-type-1">
            <button class="cancel-back-btn" on:click="{cancelChoice}">X</button>
            <div id="private-room-choice-sub-container">
                <button id="join-room-btn" class="game-mode-btn choice-btn"
                    on:click={() => {selectRoomChoice(PrivateGameChoice.JoinRoom)}}>
                    join room
                </button>
                <button id="create-room-btn" class="game-mode-btn choice-btn"
                    on:click={() => {selectRoomChoice(PrivateGameChoice.CreateRoom)}}>
                    create game
                </button>
            </div>
        </div>
    {:else if currentPage === GameSetupPage.Main} 
        <div id="game-mode-select-container" class="center-container-type-1">
            <button id="pub-game-btn" class="game-mode-btn choice-btn"
                on:click="{() => {selectGameMode(GameMode.Public)}}">
                public game
            </button>
            <button id="pvt-game-btn" class="game-mode-btn choice-btn"
                on:click="{() => {selectGameMode(GameMode.Private)}}">
                private game
            </button>
        </div>
    {:else} 
        <div id="game-loading-container" class="center-container-type-1">
            <button class="cancel-back-btn" on:click="{cancelLoad}">X</button>
            <button id="game-loading-msg">{loadingMessage}</button> 
        </div>
    {/if}
</div>

<div id="chessboard-container">
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
        /* border: 1px solid black;  */
    }

    .center-container-type-1 {
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
        border: 1.5px solid #d3d2d2;
        color: #313030;
        font-family: "Roboto Mono", sans-serif;
        font-size: 17px;
        cursor: pointer;
    }

    /* find better hover effect for these buttons - maybe?*/
    .choice-btn:hover {
        border: 2px solid #d3d2d2;
    }

    .choice-btn:nth-child(1) {
        float: left;
    }

    .choice-btn:nth-child(2) {
        float: right;
    }

    #private-room-choice-sub-container {
        height: 100%;
        width: calc(100% - 70px);
        float: right;
    }

    .cancel-back-btn {
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

    .cancel-back-btn:hover {
        border: 2px solid #d3d2d2;
    }

    #game-loading-msg {
        height: 100%;
        width: calc(100% - 70px);
        background: #efefee;
        color: #A2A2A2;
        border: none;
        float: right;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
    }

    #chessboard-container {
        height: 60vw;
        width: 60vw;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        top: 660px; /**/
    }
</style>