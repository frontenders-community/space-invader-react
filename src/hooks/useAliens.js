import { useState } from "react";
import { ALIENS_IN_ROW, ALIENS_ROWS, createAliens } from "../aliens";
import { STAGE_WIDTH } from "../gameHelpers";

export const useAliens = () => {
  const [aliens, setAliens] = useState({
    items: createAliens(),
    directionY: "",
    directionX: "right",
    lowestAliveRowPos: ALIENS_ROWS - 1,
  });

  const moveAliens = () => {
    // If aliens have moved down move them to left or right
    if (aliens.directionY === "down") {
      aliens.directionX === "left" ? moveRight() : moveLeft();
    } else {
      if (aliens.directionX === "left" && canMoveLeft()) {
        moveLeft();
      } else if (aliens.directionX === "right" && canMoveRight()) {
        moveRight();
      } else {
        moveDown();
      }
    }
  };

  const moveRight = () => {
    const clonedAliens = JSON.parse(JSON.stringify(aliens.items));
    for (let y = 0; y < clonedAliens.length; y++) {
      const row = clonedAliens[y];
      for (let x = 0; x < row.length; x++) {
        row[x].x += 1;
      }
    }
    setAliens({
      ...aliens,
      items: clonedAliens,
      directionX: "right",
      directionY: "",
    });
  };

  const moveLeft = () => {
    const clonedAliens = JSON.parse(JSON.stringify(aliens.items));
    for (let y = 0; y < clonedAliens.length; y++) {
      const row = clonedAliens[y];
      for (let x = 0; x < row.length; x++) {
        row[x].x -= 1;
      }
    }
    setAliens({
      ...aliens,
      items: clonedAliens,
      directionX: "left",
      directionY: "",
    });
  };

  const moveDown = () => {
    let lastAliveAlien;
    const clonedAliens = JSON.parse(JSON.stringify(aliens.items));
    for (let y = 0; y < clonedAliens.length; y++) {
      const row = clonedAliens[y];
      for (let x = 0; x < row.length; x++) {
        const alien = row[x];
        if (alien.alive) {
          lastAliveAlien = alien;
        }
        alien.y += 1;
      }
    }
    setAliens({
      ...aliens,
      items: clonedAliens,
      directionY: "down",
      lowestAliveRowPos: lastAliveAlien.y,
    });
  };

  const killAlien = ({ x, y }) => {
    const clonedAliens = JSON.parse(JSON.stringify(aliens.items));
    for (let rowIndex = 0; rowIndex < clonedAliens.length; rowIndex++) {
      const row = clonedAliens[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const alien = row[colIndex];
        if (alien.x === x && alien.y === y) {
          alien.alive = false;
          break;
        }
      }
    }

    setAliens({
      ...aliens,
      items: clonedAliens,
    });
  };

  const canMoveLeft = () => {
    return aliens.items[0][0].x > 0;
  };

  const canMoveRight = () => {
    return aliens.items[0][ALIENS_IN_ROW - 1].x + 1 < STAGE_WIDTH;
  };

  const resetAliens = () => {
    setAliens({
      items: createAliens(),
      directionY: "",
      directionX: "right",
      lowestAliveRowPos: ALIENS_ROWS - 1,
    });
  };

  return [moveAliens, aliens, killAlien, resetAliens];
};
