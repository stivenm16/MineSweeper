import { CellEnum } from "../types";

// Función recursiva para poder limpiar los espacios en blanco
export function reveal(
  boardWithMines: CellEnum[][],
  boardWithOutMines: CellEnum[][],
  x: number,
  y: number
) {
  boardWithOutMines[x][y] = boardWithMines[x][y];
  if (boardWithMines?.[x]?.[y] === CellEnum.Cero) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (
          boardWithOutMines?.[x + xOffset]?.[y + yOffset] === CellEnum.Hidden
        ) {
          reveal(boardWithMines, boardWithOutMines, x + xOffset, y + yOffset);
        }
      }
    }
  }
}
