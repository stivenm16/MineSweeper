import { CellEnum } from "../types";

// Conteo de celdas descubiertas sin error, retorna el score
export function score(grid: CellEnum[][]) {
  let clickedTiles = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[x][y] !== CellEnum.Hidden && grid[x][y] !== CellEnum.Mine) {
        clickedTiles = clickedTiles + 1;
      }
    }
  }
  return clickedTiles;
}
