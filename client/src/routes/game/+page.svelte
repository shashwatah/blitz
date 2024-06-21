<script>
    import Chessboard from "$lib/Chessboard.svelte";
    
    let chessboardClass = "chessboard-down";

    setTimeout(() => {
        chessboardClass = "chessboard-up";
    }, 250);
</script>

<div id="chessboard-container" class="{chessboardClass}">
    <Chessboard/>
</div>

<style>
    #chessboard-container {
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);    
        transition: 0.2s linear;
    }

    .chessboard-down {
        height: 60vw;
        width: 60vw;
        bottom: -45vw;
    }

    .chessboard-up {
        height: 40vw;
        width: 40vw;
        bottom: 90px;
    }
</style>