<script>
    import Chessboard from "$lib/Chessboard.svelte";
</script>

<div id="board-container">
    <Chessboard/>
</div>

<div id="action-btn-container">
    <button class="action-btn" id="pub-game-btn">public game</button>
    <button class="action-btn" id="pvt-game-btn">private game</button>
</div>

<style>
    #board-container {
        height: 60vw;
        width: 60vw;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        top: 660px;
        z-index: 2;
    }

    #action-btn-container {
        display: inlline;
        background: none;
        /* border: 2px solid #d3d2d2; */
        position: fixed;
        margin-left: 50%;
        margin-top: 23%;
        transform: translate(-50%, -25%);
        height: 50px;
        width: 40%;
    }

    .action-btn {
        height: 100%;
        width: 48%;
        background: #fff;
        color: #313030;
        font-family: "Roboto Mono", sans-serif;
        font-size: 17px;
        border: 1.5px solid #d3d2d2;
        cursor: pointer;
    }

    /* need to find a better hover effect for these buttons */
    .action-btn:hover {
        transition: .1s linear;
        border: 1px solid #acabab;
    }

    #pvt-game-btn {
        float: left;
    }

    #pub-game-btn {
        float: right;
    }
</style>