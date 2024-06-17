<script lang="ts">
    // types need to go in a separate file
    // chessboard should be a writable store created using a chessboard class 
    // chesspieces data should be a readable store
    // rn chess pieces are being created and store within chessboard
    // |- ideally chess pieces should have their own state (or player state)
    // code is still slightly janky (need to reduce verbosity of names, overuse of "chess") 
    // |- but a major improvement, can work on top of this now. 

    //data
    import { chessPieces } from "./data";
    const playerColor: string = "white";

    // types
    interface ChessBlock {
        loc: {
            row: number,
            col: number
        },
        piece?: {
            name: string,
            isOpponent: boolean
        }
    }

    interface ChessBlockNotation {
        row: number,
        col: string
    }

    type ChessBoard = ChessBlock[][];
    
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
                    }
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
                let row = isOpponent ? chessPiece.initRow-1 : Math.abs(chessPiece.initRow-8) ;
                chessBoard[row][chessPiece.initCol[i]-1].piece = {
                    name,
                    isOpponent
                };
            }
        }
    }
    
    // aux functions 
    function getBlockColor(chessBlock: ChessBlock): string {
        if ((chessBlock.loc.row + chessBlock.loc.col) % 2 === 0) {
            return "white";
        } else {
            return "black";
        }
    }

    function getBlockNotation(chessBlock: ChessBlock): ChessBlockNotation{
        return {
            row: chessBlock.loc.row,
            col: String.fromCharCode(chessBlock.loc.col+97)
        };
    }

    function getChessPieceColor(chessBlock: ChessBlock): string {
        if (chessBlock.piece?.isOpponent) {
            return playerColor === "white" ? "black" : "white";
        } else {
            return playerColor;
        }
    }


    let chessBoard: ChessBoard = createChessBoard();
    populateChessBoard(chessBoard);
</script>

<div id="chessboard">
    {#each chessBoard as row}
        <div class="chessboard-row">
            {#each row as block}
                <div class="chessboard-block {getBlockColor(block)}-chessboard-block">
                    {#if block?.piece}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 40" class="chess-piece {getChessPieceColor(block)}-chess-piece">
                            {@html chessPieces[block.piece.name].svg}
                        </svg>
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

    .white-chessboard-block {
        background: #fff;
    }

    .black-chessboard-block {
        background: #efefef;
    }

    .chess-piece {
        position: relative;
        height: 90%;
        margin-top: 15%;
        cursor: pointer;    
        stroke: #313030;
        stroke-width: .4px;
    }

    .white-chess-piece {
        fill: #fff;
    }

    .black-chess-piece {
        fill: #a2a2a2;
    }
</style>

