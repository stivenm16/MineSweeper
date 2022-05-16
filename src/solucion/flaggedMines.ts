import { CellEnum } from "../types";

/* Esta funcion se encarga de hacer un conteo de las celdas flag para devolver en la 
casilla de "Minas" la cantidad de minas menos las flags
*/
export function flaggedMines(grid: CellEnum[][], minesInGame: number) {
  let flagMine = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[x][y] === CellEnum.Flag) {
        flagMine = flagMine + 1;
      }
    }
  }
  return minesInGame - flagMine;
}
