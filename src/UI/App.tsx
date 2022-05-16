import { CSSProperties, useEffect } from "react";
import { useGlobalState } from "./state";
import * as Events from "../events";
import CellComponent from "./components/cell.component";
import "./styles.css";

export default function App() {
  const { face, score, grid, mines } = useGlobalState();

  useEffect(() => {
    const preventMenu = (e: any) => e.preventDefault();
    window.addEventListener("contextmenu", preventMenu);
    return () => window.removeEventListener("contextmenu", preventMenu);
  }, []);

  return (
    <div className="App" onMouseUp={() => Events.onMouseUp()}>
      <section className="game-board">
        <div className="controller">
          <div className="mines-counter">{mines}</div>
          <div
            onClick={() => Events.onFaceClick(face)}
            className={`status-button status-button--${face}-game`}
          ></div>
          <div className="score">{score}</div>
        </div>
        <div
          className="grid"
          style={{ "--grid-cells-side": grid.length } as CSSProperties}
        >
          {grid.length &&
            grid.flatMap((row, i) =>
              row.map((cell, j) => (
                <CellComponent
                  key={`cell-${[i]}-${j}`}
                  cell={cell}
                  position={[i, j]}
                />
              ))
            )}
        </div>
      </section>
      <section className="config-form">
        <div className="config-form__item">
          <label className="config-form__label" htmlFor="grid-side">
            Grid Size:
          </label>
          <select
            className="config-form__dropbdown"
            name="grid-side"
            id="grid-side"
            onChange={(e) => {
              Events.onSizeChange(parseInt(e.target.value, 10));
            }}
          >
            <option value="4">4x4</option>
            <option value="5">5x5</option>
            <option value="6">6x6</option>
            <option value="7">7x7</option>
            <option value="8">8x8</option>
            <option value="9">9x9</option>
            <option value="10">10x10</option>
            <option value="11">11x11</option>
            <option value="12">12x12</option>
          </select>
        </div>
        <div className="config-form__item">
          <label className="config-form__label" htmlFor="mines-rate">
            Mines Rate:
          </label>
          <select
            className="config-form__dropbdown"
            name="mines-rate"
            id="mines-rate"
            onChange={(e) => {
              Events.onMinesRateChange(parseFloat(e.target.value));
            }}
          >
            <option value="0.1">10%</option>
            <option value="0.25">25%</option>
            <option value="0.33">33%</option>
            <option value="0.4">40%</option>
          </select>
        </div>
      </section>
    </div>
  );
}
