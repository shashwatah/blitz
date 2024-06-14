<script>
// @ts-nocheck

/*
this code does what was expected of it, print out a chessboard, but this is hands down the worst code i have ever written 
in my life, i do not how it does what is does, but it does get the work done. i cannout build upon it. i'll have to rewrite it 
tomorrow.
*/

    let pieces = {
        "king": {
            svg: "./pieces/king.svg",
            row: 1,
            startPos: [5]
        },
        "queen": {
            svg: "./pieces/queen.svg",
            row: 1,
            startPos: [4]
        },
        "rook": {
            svg: "./pieces/rook.svg",
            row: 1,
            startPos: [1, 8] 
        },
        "knight": {
            svg: "./pieces/knight.svg",
            row: 1,
            startPos: [2, 7]
        },
        "bishop": {
            svg: "./pieces/bishop.svg",
            row: 1,
            startPos: [3, 6]
        },
        "pawn": {
            svg: "./pieces/pawn.svg",
            row: 2,
            startPos: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }

    function createChessboard() {
        let arr = [];
        for(let i = 0; i <= 7; i++) {  
            let subArr = []
            for(let j = 0; j <= 7; j++) {
                let block = {
                    color: (j+i) % 2 === 0 ? 1 : 0,
                    coord: {
                        column: String.fromCharCode(j+97),
                        columnN: j+1, 
                        row: i+1
                    }
                };
                subArr.push(block)
            } 
            arr.push(subArr);
        } 
        return arr;
    }

    // function rowOne()

    function populateOpp(board) {
        for(let i = 0; i <= 1; i++) {
            for(let j = 0; j <= 7; j++) {
                for(let piece in pieces) {
                    if (pieces[piece].row === i+1 && pieces[piece].startPos.includes(j+1)) {
                        board[i][j].piece = {
                            name: piece,
                            svg: pieces[piece].svg
                        }
                    }
                }
            }
        }       
    }

    function populatePlayer(board) {
        for(let i = 7; i >= 6; i--) {
            for(let j = 0; j <= 7; j++) {
                for(let piece in pieces) {
                    
                    if (pieces[piece].row === i-(i-(8-i)) && pieces[piece].startPos.includes(j+1)) {
                        board[i][j].piece = {
                            name: piece,
                            svg: pieces[piece].svg
                        }
                    }
                }
            }
        }    
    }

    function populateChessboad(board) {
        populateOpp(board);
        populatePlayer(board);
    }
    
    let chessboard = createChessboard();
    populateChessboad(chessboard);
</script>

<div id="chessboard">
    {#each chessboard as row, i}
        <div class="chessrow">
            {#each row as block}
                <div class="chessblock {block.color === 0 ? "black" : "white"}">
                    {#if "piece" in block}
                        <img alt="{block.piece.name}" src="{block.piece.svg}" draggable="false"/>
                    {/if}
                    <!-- {block.coord.column + block.coord.row} -->
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

    img {
        position: relative;
        /* height: 65%;
        margin-top: 17.5%; */
        height: 75%;
        margin-top: 20%;
        /* transform: translateY(-50%); */
        color: #a2a2a2;
        cursor: pointer;    
        /* user-select: none; */
        filter: invert(75%) sepia(14%) saturate(4%) hue-rotate(315deg) brightness(88%) contrast(75%);
    }
</style>

