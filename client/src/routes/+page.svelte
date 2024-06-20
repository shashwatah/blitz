<script>
    import Chessboard from "$lib/Chessboard.svelte";
</script>

<div id="game-btn-container">
    <a href="/game"><button class="game-btn" id="pub-game-btn">public game</button></a>
    <button class="game-btn" id="pvt-game-btn">private game</button>
</div>

<div id="chessboard-container">
    <Chessboard/>
</div>

<style>
    #chessboard-container {
        height: 60vw;
        width: 60vw;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        top: 660px; /**/
    }

    #game-btn-container {
        height: 50px;
        width: 40%; /**/
        position: fixed;
        top: calc(50% - 40px); /**/
        margin-left: 50%;
        transform: translateX(-50%);
        display: inline-block;
    }   

    .game-btn {
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
    .game-btn:hover {
        border: 2px solid #d3d2d2;
    }

    #pub-game-btn {
        float: left;
    }

    #pvt-game-btn {
        float: right;
    }
</style>