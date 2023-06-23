import { useCallback, useState } from "react";

import { STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";
import { aliens } from "../aliens";

export const usePlayer = ({ finishGame }) => {
  const [player, setPlayer] = useState({
    pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
    laserPos: null,
    score: 0,
    aliens: aliens(),
    aliensDirection: {
      x: 1,
      y: 0,
    },
  });

  const updatePlayerPos = ({ x, y }) => {
    const newX = player.pos.x + x;
    setPlayer({
      ...player,
      pos: { x: newX, y: (player.pos.y += y) },
    });
  };

  const updateLaserPos = (newPos) => {
    console.log("newpos", player);
    setPlayer({
      ...player,
      laserPos: newPos,
    });
  };

  const moveAliens = () => {
    let directionX = player.aliensDirection.x;
    let directionY = player.aliensDirection.y;

    // If aliens have moved down move them to left or right
    if (player.aliensDirection.y === 1) {
      directionY = 0;
      directionX *= -1;
    } else {
      if (player.aliensDirection.x === 1) {
        // If aliens are going to the left
        // Check if can continue to go to the left
        const lastAlien =
          player.aliens[player.aliens.length - 1][player.aliens[0].length - 1];
        if (lastAlien.pos_x + 1 >= STAGE_WIDTH) {
          directionY = 1;
        }
      } else if (player.aliensDirection.x === -1) {
        const firstAlien = player.aliens[0][0];
        if (firstAlien.pos_x === 0) {
          directionY = 1;
        }
      }
    }
    const clonedAliens = JSON.parse(JSON.stringify(player.aliens));
    // To check if aliens are arrived to the end of the space we will search for the last alive alien
    let lastAliveAlien;
    for (let y = 0; y < clonedAliens.length; y++) {
      const row = clonedAliens[y];
      for (let x = 0; x < row.length; x++) {
        const alien = row[x];
        if (alien.alive) {
          lastAliveAlien = alien;
        }
        if (directionY === 1) {
          alien.pos_y += directionY;
        } else {
          alien.pos_x += directionX;
        }
      }
    }
    if (lastAliveAlien.pos_y === STAGE_HEIGHT - 1) {
      finishGame("gameover");
      return;
    }

    setPlayer({
      ...player,
      aliens: clonedAliens,
      aliensDirection: {
        x: directionX,
        y: directionY,
      },
    });
  };

  const killAlien = ({ x, y }) => {
    const clonedAliens = JSON.parse(JSON.stringify(player.aliens));
    for (let rowIndex = 0; rowIndex < clonedAliens.length; rowIndex++) {
      const row = player.aliens[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const alien = row[colIndex];
        if (alien.pos_x === x && alien.pos_y === y) {
          alien.alive = false;
          break;
        }
      }
    }
    setPlayer({
      ...player,
      score: player.score + 1,
      aliens: clonedAliens,
    });
  };

  const incrementScore = () => {
    setPlayer({
      ...player,
      score: player.score + 1,
    });
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
      score: 0,
      laserPos: null,
      aliens: aliens(),
      aliensDirection: {
        x: 1,
        y: 0,
      },
    });
  }, []);

  return [
    player,
    updatePlayerPos,
    moveAliens,
    resetPlayer,
    updateLaserPos,
    killAlien,
    incrementScore,
  ];
};
