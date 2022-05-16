import { CellEnum } from "../types";
import { getMinePositions } from "./mines";

/* Esta primera parte es la función generadora del primer tablero en donde 
todas las casillas parten del estado Hidden */

export function boardWithoutMines(boardSize: number) {
  let board: CellEnum[][] = [];
  for (let xAxis = 0; xAxis < boardSize; xAxis++) {
    const row = [];

    for (let yAxis = 0; yAxis < boardSize; yAxis++) {
      let tile: CellEnum = CellEnum.Hidden;

      row.push(tile);
    }
    board.push(row);
  }
  return board;
}

/* El codigo de abajo contiene el tablero de atras con toda la info de 
 minas y números */

export function boardWithMines(size: number, mines: number) {
  let boardWithMines: CellEnum[][] = [];
  const minePosition = getMinePositions(size, mines);
  for (let xAxis = 0; xAxis < size; xAxis++) {
    const row = [];

    for (let yAxis = 0; yAxis < size; yAxis++) {
      let tileM: CellEnum = CellEnum.Hidden;

      row.push(tileM);
    }
    boardWithMines.push(row);
  }
  for (let mine of minePosition) {
    boardWithMines[mine[0]][mine[1]] = CellEnum.Mine;
  }

  //console.log(boardWithMines);
  return boardWithMines;
}
