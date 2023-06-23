import React from "react";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";

const Cell = ({ type }) => (
  <div
    className={"cell " + type}
    style={{
      width: `calc(100% / ${STAGE_WIDTH})`,
      height: `calc(100% / ${STAGE_HEIGHT})`,
    }}
  ></div>
);

export default Cell;
