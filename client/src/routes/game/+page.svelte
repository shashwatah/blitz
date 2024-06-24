<script lang="ts">
    import { ChessBoardPos } from "$lib/types/chessBoard";
    import Chessboard from "$lib/components/Chessboard.svelte";
    
    let chessboardPos = ChessBoardPos.Pulled;
    setTimeout(() => {
        chessboardPos = ChessBoardPos.Center;
    }, 0);
</script>

<div id="chessboard-container" class="chessboard-pos-{chessboardPos}">
    <Chessboard/>
</div>

<style>
    #chessboard-container {
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);    
        transition: 0.2s linear;
    }

    .chessboard-pos-pulled {
        height: 60vw;
        width: 60vw;
        bottom: -45vw;
    }

    .chessboard-pos-center {
        height: 40vw;
        width: 40vw;
        bottom: 90px;
    }
</style>