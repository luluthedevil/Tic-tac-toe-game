var origBoard;
const players = ["X","O","X","O","X","O","X","O","X"];
var position = 0;
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,6,4],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

const cells = document.querySelectorAll(".cell");

startGame();
clearScreem();

function clearScreem(){
    for(var i=0; i<cells.length; i++){
        if(cells[i].innerText == "."){
            cells[i].style.color = "white";
        }
        else{
            cells[i].style.color = "black";
        }
    }
}

function startGame(){
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for(var i=0; i<cells.length; i++){
        cells[i].innerText = ".";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false);
        position = 0;
        clearScreem();
    }
}

function turnClick(square){
    if(square.target.innerText == "."){
        turn(square.target.id, players[position]);
        return position;
    }
}

function turn(squareId, player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    clearScreem();
    let gameWon = checkWin(origBoard,player);
    if(gameWon){
        gameOver(gameWon);
    }
    return position++;
}

function checkWin(board, player){
    //a is from accumulator, e is for element and i is for index
    let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon){
    for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = "blue";
    }
    for (var i = 0; i < cells.length; i++) {
	cells[i].removeEventListener('click', turnClick, false);
    }
}
