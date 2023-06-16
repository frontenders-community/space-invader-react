import { useCallback, useState } from "react";

import { STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";
import { aliens } from "../aliens";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
    aliens: aliens(),
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    const newX = player.pos.x + x;
    setPlayer((prev) => ({
      ...prev,
      pos: { x: newX, y: (prev.pos.y += y) },
    }));
  };

  const resetPlayer = useCallback(() => {
    console.log('resetPlayer');
    setPlayer({
      pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
      aliens: aliens(),
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
