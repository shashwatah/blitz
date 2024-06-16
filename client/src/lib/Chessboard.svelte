<script lang="ts">
    // types need to go in a separate file
    // chessboard should be a writable store created using a chessboard class 
    // chesspiece should be a readable store

    // types
    interface ChessPiece {
        initRow: number,
        initCol: number[]
    }

    interface ChessPieces {
        [name: string]: ChessPiece
    }

    interface ChessBlock {
        loc: {
            row: number,
            col: number
        },
        piece?: string
    }

    interface ChessBlockNotation {
        row: number,
        col: string
    }

    type ChessBoard = ChessBlock[][];
    
    // data
    const chessPieces: ChessPieces = {
        "king": {
            initRow: 1,
            initCol: [5]    
        },
        "queen": {
            initRow: 1,
            initCol: [4]
        },
        "rook": {
            initRow: 1,
            initCol: [1, 8] 
        },
        "knight": {
            initRow: 1,
            initCol: [2, 7]
        },
        "bishop": {
            initRow: 1,
            initCol: [3, 6]
        },
        "pawn": {
            initRow: 2,
            initCol: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }

    // main functions 
    function createChessBoard(): ChessBoard {
        let arr: ChessBlock[][] = [];
        for(let i = 0; i <= 7; i++) {  
            let subArr: ChessBlock[] = []
            for(let j = 0; j <= 7; j++) {
                subArr.push({
                    loc: {
                        row: i,
                        col: j
                    },
                })
            } 
            arr.push(subArr);
        } 
        return arr;
    }

    function populateChessBoard(chessBoard: ChessBoard) {
        populatePlayer(chessBoard, false);
        populatePlayer(chessBoard, true);
    }

    function populatePlayer(chessBoard: ChessBoard, isOpponent: boolean) {
        for(let name in chessPieces) {
            let chessPiece = chessPieces[name];
            for(let i = 0; i < chessPiece.initCol.length; i++) {
                let row = isOpponent ? Math.abs(chessPiece.initRow-8) : chessPiece.initRow-1;
                chessBoard[row][chessPiece.initCol[i]-1].piece = name;
            }
        }
    }
    
    // aux functions 
    function getBlockColor(chessBlock: ChessBlock): string {
        if ((chessBlock.loc.row + chessBlock.loc.col) % 2 === 0) {
            console.log("white");
            return "white";
        } else {
            console.log("black");
            return "black";
        }
    }

    function getBlockNotation(chessBlock: ChessBlock): ChessBlockNotation{
        return {
            row: chessBlock.loc.row,
            col: String.fromCharCode(chessBlock.loc.col+97)
        };
    }

    // need to find a better way to deal with the "?"
    function getPieceSvgLoc(pieceName?: string): string {
        return `./pieces/${pieceName}.svg`;
    }

    let chessBoard: ChessBoard = createChessBoard();
    populateChessBoard(chessBoard);
</script>

<div id="chessboard">
    {#each chessBoard as row}
        <div class="chessboard-row">
            {#each row as block}
                <div class="chessboard-block {getBlockColor(block)}-block">
                    {#if "piece" in block}
                        <img alt="{block.piece}" src="{getPieceSvgLoc(block.piece)}" class="chess-piece" draggable="false"/>
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
    
    .chessboard-row {
        height: 12.5%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .chessboard-block {
        height: 100%;
        width: 12.5%;
        text-align: center;
    }

    .white-block {
        background: #fff;
    }

    .black-block {
        background: #efefef;
    }

    .chess-piece {
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

