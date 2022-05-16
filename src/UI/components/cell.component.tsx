import { CellEnum } from "./../../types";
import * as Events from "../../events";

export type CellComponentType = {
  position: [number, number];
  cell: CellEnum;
};

export default function CellComponent({ cell, position }: CellComponentType) {
  const handleRightClick = () => {
    Events.onRightClick(position);
  };

  const renderCell = () => {
    switch (cell) {
      case CellEnum.Hidden:
        return (
          <div
            className={`cell`}
            onMouseDown={() => Events.onMouseDown()}
            onClick={() => Events.onClick(position)}
            onContextMenu={handleRightClick}
          ></div>
        );
      case CellEnum.Flag:
        return (
          <div
            className={`cell cell__flag`}
            onMouseDown={() => Events.onMouseDown()}
            onClick={() => Events.onClick(position)}
            onContextMenu={handleRightClick}
          ></div>
        );
      case CellEnum.Mine:
        return <div className={`cell cell__mine cell__mine--shown`} />;
      case CellEnum.ClickedMine:
        return (
          <div
            className={`cell cell__mine cell__mine--shown cell__mine--clicked`}
          />
        );
      default:
        return <div className={`cell cell--mines-${cell}`}>{cell}</div>;
    }
  };

  return renderCell();
}
