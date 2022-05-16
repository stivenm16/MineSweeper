import { useEffect, useState } from "react";
import { CellEnum, FaceType } from "../types";

type Sub = {
  id: number;
  exec: (gs: GameState) => void;
};

export type GameState = {
  grid: CellEnum[][];
  face: FaceType;
  score: number;
  mines: number;
};

export const initializeGrid = (): CellEnum[][] => {
  return Array.from({ length: 5 }, (_, i) => {
    return Array.from({ length: 5 }, (_, j) => {
      return CellEnum.Hidden;
    });
  });
};

export const initialize = (): GameState => {
  return {
    grid: initializeGrid(),
    face: "default",
    score: 0,
    mines: 0
  };
};

const Store = (() => {
  let subs = [] as Sub[];
  let val = initialize();

  let id = 0;

  return {
    set: (fn: GameState | ((s: GameState) => GameState)) => {
      val = fn instanceof Function ? fn(val) : fn;
      subs.forEach(({ exec }) => exec(val));
    },
    get: () => val,
    subscribe: (fn: (gs: GameState) => void) => {
      const cId = id++;
      subs.push({ exec: fn, id: cId });
      return () => {
        subs = subs.filter(({ id }) => id !== cId);
      };
    }
  };
})();

export const useGlobalState = () => {
  const [val, setVal] = useState(Store.get());
  useEffect(() => Store.subscribe(setVal), []);
  return val;
};

/**
 * Cambia la cara del minesweeper
 * @param face
 */
export const setFace = (face: FaceType) => Store.set((gs) => ({ ...gs, face }));

/**
 * Cambia la matriz actual del buscaminas. Las celdas deben ser de tipo CellEnum
 * @param grid
 */
export const setGrid = (grid: CellEnum[][]) =>
  Store.set((gs) => ({ ...gs, grid }));

/**
 * Cambia el puntaje del buscaminas
 * @param score
 */
export const setScore = (score: number) =>
  Store.set((gs) => ({ ...gs, score }));

/**
 * Cambia el numero de minas a mostrar
 * @param minesDisplay
 */
export const setMines = (minesDisplay: number) =>
  Store.set((gs) => ({ ...gs, mines: minesDisplay }));
