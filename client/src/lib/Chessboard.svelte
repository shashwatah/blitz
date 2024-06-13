<script>
    let pieces = [{name: "king", location: "./pieces/king.svg"},  
        {name: "queen", location: "./pieces/queen.svg"}, 
        {name: "knight", location: "./pieces/knight.svg"}, 
        {name: "rook", location: "./pieces/rook.svg"}, 
        {name: "bishop", location: "./pieces/bishop.svg"},
        {name: "pawn", location: "./pieces/pawn.svg"}]
        
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
    {#each chessboard as row, i}
        <div class="chessrow">
            {#each row as block, j}
                <div class="chessblock {block}">
                    {#if i <= 1 || (7-i) <= 1}
                        <img alt="pawn" src="./pieces/bishop-2.svg" class="black-piece"/>
                    {/if}
                </div>
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
        text-align: center;
    }

    .white {
        background: #fff;
    }

    .black {
        background: #efefef;
    }
    
    /* .black-piece {
        filter: invert(75%) sepia(14%) saturate(4%) hue-rotate(315deg) brightness(88%) contrast(75%);
    } */
</style>

