import React from "react";

import Cell from "./Cell";

const Stage = ({ stage }) => {
  console.log("stage", stage);
  return (
    <div className="grid">
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell.type} />)
      )}
    </div>
  );
};

export default Stage;
