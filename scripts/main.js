const app = document.getElementById('app');
const board = [];

let position = 1;
let currentPiece = 'l';

let bottom = [];

let pieces = {
  'l': {
    'pos1' : [[0, 0], [1, 0], [1, 1], [1, 2]],
    'pos2' : [[0, 0], [0, 1], [1, 0], [2, 0]],
    'pos3' : [[0, 0], [0, 1], [0, 2], [1, 2]],
    'pos4' : [[0, 1], [1, 1], [2, 1], [2, 0]]
  }
}

let piece = pieces.l;

function printBoard(){
  for(let i = 0; i < 10; i++){
    let row = [];
    let node = document.createElement('div');
    node.classList.add('row');
    for(let j = 0; j < 10; j++){
      let hasPiece = false;
      let cellElement = document.createElement('div');
      cellElement.classList.add('cell');

      piece[`pos${position}`].forEach(piecePart => {
        if(piecePart[0] === i && piecePart[1] === j){
          hasPiece = true;
          cellElement.classList.add('piece-part');
        }
      });

      node.appendChild(cellElement);
      row.push(hasPiece);
      bottom.push([9, i]);

    }
    app.appendChild(node);
    board.push(row);
  }
}

function updateBoard(){
  for(let i = 0; i < 10; i++){
    let rowElement = document.querySelectorAll('.row')[i];
    for(let j = 0; j < 10; j++){

      let cellElement = rowElement.querySelectorAll('.cell')[j];
      let hasPiece = false;

      cellElement.classList.remove('piece-part');

      piece[`pos${position}`].forEach(piecePart => {
        if(piecePart[0] === i && piecePart[1] === j){
          hasPiece = true;
          cellElement.classList.add('piece-part');
        }
      });
    }
  }
}

function moveRight(){
  let canMove = true;
  for(let i = 1; i <= 4; i++){
    piece[`pos${position}`].forEach(piecePart => {
      if(piecePart[1] === 9){
        canMove = false;
      }
    });
  }
  if(canMove){
    for(let i = 1; i <= 4; i++){
      piece[`pos${i}`].forEach(piecePart => {
        piecePart[1]++;
      });
    }
  }
  updateBoard();
}

function moveLeft(){
  let canMove = true;
  for(let i = 1; i <= 4; i++){
    piece[`pos${position}`].forEach(piecePart => {
      if(piecePart[1] === 0){
        canMove = false;
      }
    });
  }
  if(canMove){
    for(let i = 1; i <= 4; i++){
      piece[`pos${i}`].forEach(piecePart => {
        piecePart[1]--;
      });
    }
  }
  updateBoard();
}

function moveDown(){
  let canMove = true;
  for(let i = 1; i <= 4; i++){
    piece[`pos${position}`].forEach(piecePart => {
      if(piecePart[0] === bottom[piecePart[1]][0]){
        canMove = false;
      }
    });
  }
  if(canMove){
    for(let i = 1; i <= 4; i++){
      piece[`pos${i}`].forEach(piecePart => {
        piecePart[0]++;
      });
    }
  }
  updateBoard();
}

function rotate(){

  if(position < 4){
    position++;
  }else{
    position = 1;
  }

  updateBoard();

  let canRotate = false;
  while(!canRotate){
    canRotate = true;
    let canRotateRight = true;
    let canRotateLeft = true;
    let canRotateBottom = true;

    piece[`pos${position}`].forEach(piecePart => {
      if(piecePart[1] > 9){
        canRotate = false;
        canRotateRight = false;
      }
      if(piecePart[1] < 0){
        canRotate = false;
        canRotateLeft = false;
      }
      if(piecePart[0] > bottom[piecePart[1]][0]){
        canRotate = false;
        canRotateBottom = false;
      }
    });

    piece[`pos${position}`].forEach(piecePart => {
      if(!canRotateRight){
        piecePart[1]--;
      }
      if(!canRotateLeft){
        piecePart[1]++;
      }
      if(!canRotateBottom){
        piecePart[0]--;
      }
    });

    updateBoard();

  }

  
}


printBoard();

window.addEventListener('keydown', (e) => {
  if(e.code === 'ArrowRight'){
    moveRight();
  }else if(e.code === 'ArrowLeft'){
    moveLeft();
  }else if(e.code === 'ArrowDown'){
    moveDown();
  }else if(e.code === 'Space'){
    rotate();
  }
})
