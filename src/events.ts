import { setScore, setMines, setFace, setGrid } from "./UI/state";
import { CellEnum, FaceType } from "./types";
import { numbersUpdated } from "./solucion/bombsVerify";
import { reveal } from "./solucion/reveal";
import * as boards from "./solucion/boards";
import { win } from "./solucion/checkWin";
import { score } from "./solucion/score";
import { flaggedMines } from "./solucion/flaggedMines";

let boardSize = 4;
let minesRate = 0.1;
let cellsInBoard = boardSize * boardSize;
let minesInGame = Math.round(cellsInBoard * minesRate);
export let gridMines: CellEnum[][] = boards.boardWithMines(
  boardSize,
  minesInGame
);
let grid = boards.boardWithoutMines(boardSize);

function boardInit(boardSize: number, minesRate: number) {
  cellsInBoard = boardSize * boardSize;
  minesInGame = Math.round(cellsInBoard * minesRate);
  grid = boards.boardWithoutMines(boardSize);
  gridMines = boards.boardWithMines(boardSize, minesInGame);
  numbersUpdated(gridMines);
  setFace("default");
  setScore(0);
  setMines(minesInGame);
  setGrid(grid);
  return [grid, gridMines];
}
boardInit(boardSize, minesRate);

export function onMouseDown() {
  setFace("doubtful");
}

export function onMouseUp() {
  setFace("default");
}

export function onRightClick(position: [number, number]) {
  let tileClicked = grid[position[0]][position[1]];

  if (tileClicked === CellEnum.Hidden) {
    grid[position[0]][position[1]] = CellEnum.Flag;
    setMines(flaggedMines(grid, minesInGame));
  } else if (tileClicked === CellEnum.Flag) {
    grid[position[0]][position[1]] = CellEnum.Hidden;
    setMines(flaggedMines(grid, minesInGame));
  }

  setGrid(grid);
}

export function onSizeChange(side: number) {
  boardSize = side;
  boardInit(side, minesRate);
  console.log(grid);
  setGrid(grid);
}

export function onClick(position: [number, number]) {
  grid[position[0]][position[1]] = gridMines?.[position[0]]?.[position[1]];

  if (gridMines[position[0]][position[1]] === CellEnum.Mine) {
    alert("Perdiste");
    setGrid(gridMines);

    grid[position[0]][position[1]] = CellEnum.ClickedMine;
  } else if (gridMines[position[0]][position[1]] === CellEnum.Cero) {
    reveal(gridMines, grid, position[0], position[1]);
  }
  win(grid, minesInGame);
  setScore(Math.round(score(grid)));
  setFace("lost");
}

export function onMinesRateChange(percentage: number) {
  minesRate = percentage;
  boardInit(boardSize, minesRate);
  setMines(minesInGame);
  console.log(boardSize);
}
export function onFaceClick(prevFace: FaceType) {
  setFace("default");

  boardInit(boardSize, minesRate);
  setMines(minesInGame);
  setScore(0);
}
