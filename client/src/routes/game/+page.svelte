<script>
    import Chessboard from "$lib/Chessboard.svelte";
</script>

<div id="chessboard-container">
    <Chessboard/>
</div>

<style>
    #chessboard-container {
        height: 40vw;
        width: 40vw;
        position: fixed;
        top: 90px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
</style>