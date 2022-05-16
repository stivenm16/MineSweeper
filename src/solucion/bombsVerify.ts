import { CellEnum } from "../types";

/* Esta funcion se encarga de verificar las 8 posiciones adjacentes de
la celda en la que se está clickeando y devuelve el número de minas cercanas*/

export function bombsVerify(
  boardWithMines: CellEnum[][],
  x: number,
  y: number
) {
  let num = 0;

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      let tile: CellEnum = boardWithMines[x + xOffset]?.[y + yOffset];
      if (tile === CellEnum.Mine) {
        num = num + 1;
      }
    }
  }
  return num;
}

/* Esta función va a actualizar el número en cada casilla en función del return
que arroje la función bombsVerify siempre y cuando esta no sea una mina */

export function numbersUpdated(boardWithMines: CellEnum[][]) {
  for (let x = 0; x < boardWithMines.length; x++) {
    for (let y = 0; y < boardWithMines.length; y++) {
      if (boardWithMines[x][y] !== CellEnum.Mine) {
        boardWithMines[x][y] = bombsVerify(boardWithMines, x, y);
      }
    }
  }
}
