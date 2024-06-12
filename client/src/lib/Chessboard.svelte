<script>
    function createChessboard() {
        let arr = [];
        for(let i = 1; i <= 8; i++) {  
            let subArr = []
            for(let j = 1; j <= 8; j++) {
                (j+i) % 2 === 0 ? subArr.push("white") : subArr.push("black");
            } 
            arr.push(subArr);
        }
        return arr;
    }
    
    let chessboard = createChessboard();
</script>

<div id="chessboard">
    {#each chessboard as row}
        <div class="chessrow">
            {#each row as block}
                <div class="chessblock {block}"></div>
            {/each}
        </div>
    {/each}
</div>

<style>
    #chessboard {
        border: 2px solid #d1d1d1;
        height: 100%;
        width: 100%;
    }
    
    .chessrow {
        height: 12.5%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .chessblock {
        height: 100%;
        width: 12.5%;
    }

    .white {
        background: #fff;
    }

    .black {
        background: #efefef;
    }
</style>

