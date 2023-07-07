import { STAGE_WIDTH } from "./gameHelpers";

export const X_POSITION = 0;
export const ALIENS_IN_ROW = 10;
export const ALIENS_ROWS = 3;

export const createAliens = () => {
  return Array.from(Array(ALIENS_ROWS), (row, rowIndex) => {
    return Array.from(Array(ALIENS_IN_ROW), (col, colIndex) => ({
      x: colIndex,
      y: rowIndex,
      alive: true,
    }));
  });
};
