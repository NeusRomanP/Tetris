//TODO:
//add pieces

const app = document.getElementById('app');
const modal = document.getElementById('modal');
const newGameButton = document.getElementById('new-game');
const pointsText = document.getElementById('points');
const modalPoints = document.getElementById('modal-points');

let board = [];

let position = getRandomPosition();
let pieceToEnd = false;
let hasToRemoveRow = false;
let endGame = false;
let points = 0;

let bottom = [];

let pieces = {
  'piece0': {//L invert
    'pos1' : [[0, 0], [1, 0], [1, 1], [1, 2]],
    'pos2' : [[0, 0], [0, 1], [1, 0], [2, 0]],
    'pos3' : [[0, 0], [0, 1], [0, 2], [1, 2]],
    'pos4' : [[0, 1], [1, 1], [2, 1], [2, 0]]
  },
  'piece1': {//L
    'pos1' : [[0, 2], [1, 0], [1, 1], [1, 2]],
    'pos2' : [[0, 0], [1, 0], [2, 0], [2, 1]],
    'pos3' : [[0, 0], [0, 1], [0, 2], [1, 0]],
    'pos4' : [[0, 1], [1, 1], [2, 1], [0, 0]]
  },
  'piece2': {//Z
    'pos1' : [[0, 0], [0, 1], [1, 1], [1, 2]],
    'pos2' : [[0, 1], [1, 0], [1, 1], [2, 0]],
    'pos3' : [[0, 0], [0, 1], [1, 1], [1, 2]],
    'pos4' : [[0, 1], [1, 0], [1, 1], [2, 0]]
  },
  'piece3': {//Z invert
    'pos1' : [[0, 1], [0, 2], [1, 0], [1, 1]],
    'pos2' : [[0, 0], [1, 0], [1, 1], [2, 1]],
    'pos3' : [[0, 1], [0, 2], [1, 0], [1, 1]],
    'pos4' : [[0, 0], [1, 0], [1, 1], [2, 1]]
  },
  'piece4': {//T
    'pos1' : [[0, 0], [0, 1], [0, 2], [1, 1]],
    'pos2' : [[0, 1], [1, 0], [1, 1], [2, 1]],
    'pos3' : [[0, 1], [1, 0], [1, 1], [1, 2]],
    'pos4' : [[0, 0], [1, 0], [2, 0], [1, 1]]
  },
  'piece5': {//I
    'pos1' : [[0, 0], [0, 1], [0, 2], [0, 3]],
    'pos2' : [[0, 0], [1, 0], [2, 0], [3, 0]],
    'pos3' : [[0, 0], [0, 1], [0, 2], [0, 3]],
    'pos4' : [[0, 0], [1, 0], [2, 0], [3, 0]]
  },
  'piece6': {//square
    'pos1' : [[0, 0], [0, 1], [1, 0], [1, 1]],
    'pos2' : [[0, 0], [0, 1], [1, 0], [1, 1]],
    'pos3' : [[0, 0], [0, 1], [1, 0], [1, 1]],
    'pos4' : [[0, 0], [0, 1], [1, 0], [1, 1]]
  }
}

let piece = JSON.parse(JSON.stringify(pieces[`piece${getRandomPiece()}`]));

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
    }

    bottom.push([10, i]);
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
      cellElement.classList.remove('bottom-part');

      piece[`pos${position}`].forEach(piecePart => {
        if(piecePart[0] === i && piecePart[1] === j){
          hasPiece = true;
          cellElement.classList.add('piece-part');
        }
      });

      bottom.forEach(bottomCell => {
        if(bottomCell[0] === i && bottomCell[1] === j){
          cellElement.classList.add('bottom-part');
        }
      });
    }
  }
}

function moveRight(){
  let canMove = true;
  for(let i = 1; i <= 4; i++){
    piece[`pos${position}`].forEach(piecePart => {
      let bottomCoincidences = bottom.filter(bottomPart => {
        return bottomPart[0] === piecePart[0] && bottomPart[1] - 1 === piecePart[1]
      })
      if(piecePart[1] === 9 || bottomCoincidences.length > 0){
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
      let bottomCoincidences = bottom.filter(bottomPart => {
        return bottomPart[0] === piecePart[0] && bottomPart[1] + 1 === piecePart[1]
      })
      if(piecePart[1] === 0 || bottomCoincidences.length > 0){
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
      let bottomCoincidences = bottom.filter(bottomPart => {
        return bottomPart[0] - 1  === piecePart[0] && bottomPart[1] === piecePart[1]
      })
      if(bottom[piecePart[1]] && piecePart[0] === bottom[piecePart[1]][0] - 1 || bottomCoincidences.length > 0){
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
  }else{
    pieceToEnd = true;
    hasToRemoveRow = true;
  }
  updateBoard();
}

function rotate(){

  if(position < 4){
    position++;
  }else{
    position = 1;
  }

  let canRotate = false;
  while(!canRotate){
    canRotate = true;
    let canRotateRight = true;
    let canRotateLeft = true;
    let canRotateBottom = true;


    piece[`pos${position}`].forEach(piecePart => {

      let isOnBottom = bottom.some(bottomPart => {
        return piecePart[0] === bottomPart[0] && piecePart[1] === bottomPart[1];
      })

      if(piecePart[1] > 9 || isOnBottom){
        canRotate = false;
        canRotateRight = false;
      }
      if(piecePart[1] < 0 ||isOnBottom){
        canRotate = false;
        canRotateLeft = false;
      }
      if(isOnBottom){
        canRotate = false;
        canRotateBottom = false;
      }
    });

    let canRotateHorizontal = canRotateLeft || canRotateRight;

    if(canRotateHorizontal){
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
    }else{
      if(position > 1){
        position--;
      }else{
        position = 4;
      }
    }

    updateBoard();

  }
}

function updateBottom(){
  piece[`pos${position}`].forEach(piecePart => {
    let containsPos = bottom.some(bottomPart => {
      return bottomPart[0] === piecePart[0] && bottomPart[1] === piecePart[1];
    })
    if(!containsPos){
      bottom.push(piecePart);
    }
    
  });

  updateBoard();
}

function spawnNewPiece(){
  pieceToEnd = false;
  position = getRandomPosition();
  piece = JSON.parse(JSON.stringify(pieces[`piece${getRandomPiece()}`]));
  clearInterval(interval);
  interval = setInterval(() => {
    if(!endGame){
      if(!pieceToEnd){
        moveDown();
      }else{
        updateBottom();
        if(hasToRemoveRow){
          updateBoard();
          removeRow();
        }
        spawnNewPiece();
        checkEnd();
      }
      updateBoard();
    }else{
      updateBottom();
      updateBoard();
      modal.showModal();
      clearInterval(interval);
    }
  }, 1000);
}

function removeRow(){
  for(let i = 0; i < 10; i++){
    let isRowComplete = false;
    let hasColumns = [];
    let bottomToRemove = [];
    let partsRow = bottom.filter(bottomPart =>{
      return bottomPart[0] === i && bottomPart[0] !== 10;
    })
    
    let stringArray = partsRow.map(JSON.stringify);
    let uniqueStringArray = new Set(stringArray);
    let partsRowDuplicatesRemoved = Array.from(uniqueStringArray, JSON.parse);


    let columns = partsRowDuplicatesRemoved.map(part =>{
      return part[0] === i ? part[1] : false;
    })
    
    for(let j = 0; j < 10; j++){
      hasColumns.push(columns.includes(j));
    }

    if(hasColumns.length >= 10){
      isRowComplete = hasColumns.every(hasColumn => {
        return hasColumn === true;
      })
    }


    if(isRowComplete){
      for(let j = 0; j < 10; j++){
        bottomToRemove.push(partsRowDuplicatesRemoved.filter(columnPart => {
          return columnPart[1] === j;
        }))
      }
    }

    if (isRowComplete) {
      bottom = bottom.filter((bottomPart) => {
        return !(bottomPart[0] === i && columns.includes(bottomPart[1]));
      });

      updateBoard();
      hasToRemoveRow = false;
      moveBottomDown(i);
      points++;
      pointsText.innerHTML = points;
      modalPoints.innerHTML = points;
    }
  }
}

function moveBottomDown(i){
  bottom.forEach(bottomPart => {
    if(bottomPart[0] <= i){
      bottomPart[0]++;
    }
  });
}

function checkEnd(){
  endGame = piece[`pos${position}`].some(part => {
    return bottom.some(bottomPart =>{
      return bottomPart[0] === part[0] && bottomPart[1] === part[1];
    });
  });
}

function newGame(){
  modal.close();
  restartGame();

}

function restartGame(){
  board = [];

  position = getRandomPosition();
  pieceToEnd = false;
  hasToRemoveRow = false;
  endGame = false;
  points = 0;
  bottom = [];

  piece = JSON.parse(JSON.stringify(pieces[`piece${getRandomPiece()}`]));

  pointsText.innerHTML = points;
  modalPoints.innerHTML = points;

  for(let i = 0; i < 10; i++){
    bottom.push([10, i]);
  }

  updateBoard();
  spawnNewPiece();
}

function getRandomPiece(){
  let piecesNum = Object.keys(pieces).length;
  return Math.floor(Math.random() * piecesNum);
}

function getRandomPosition(){
  return Math.floor(Math.random() * 4) + 1;
}


printBoard();

window.addEventListener('keydown', (e) => {
  if(!pieceToEnd){
    if(e.code === 'ArrowRight'){
      moveRight();
    }else if(e.code === 'ArrowLeft'){
      moveLeft();
    }else if(e.code === 'ArrowDown'){
      moveDown();
    }else if(e.code === 'Space'){
      rotate();
    }
  }else{
    updateBottom();
  }
})

let interval = setInterval(() => {
  if(!endGame){
    if(!pieceToEnd){
      moveDown();
      
    }else{
      updateBottom();
      if(hasToRemoveRow){
        updateBoard();
        removeRow();
      }
      spawnNewPiece();
      checkEnd();
    }
  }else{
    modal.showModal();
  }
}, 1000);

newGameButton.addEventListener('click', () => {
  newGame();
})