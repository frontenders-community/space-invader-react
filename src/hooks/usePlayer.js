import { useCallback, useState } from "react";

import { STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";
import { aliens } from "../aliens";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
    aliens: aliens(),
  });

  const updatePlayerPos = ({ x, y }) => {
    const newX = player.pos.x + x;
    setPlayer((prev) => ({
      ...prev,
      pos: { x: newX, y: (prev.pos.y += y) },
    }));
  };

  const moveAliens = () => {
    console.log("updateAliensPos");
    const clonedAliens = JSON.parse(JSON.stringify(player.aliens));
    for (let y = 0; y < clonedAliens.length; y++) {
      const row = clonedAliens[y];
      for (let x = 0; x < row.length; x++) {
        const alien = row[x];
        alien.pos_x++;
      }
    }
    console.log(clonedAliens);
    setPlayer((prev) => {
      console.log("prev", prev);
      const next = {
        ...prev,
        aliens: [],
      };
      console.log("next", next);
      return next;
    });
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
      aliens: aliens(),
    });
  }, []);

  return [player, updatePlayerPos, moveAliens, resetPlayer];
};
