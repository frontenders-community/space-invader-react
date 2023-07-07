import { useCallback, useState } from "react";

import { STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: Math.floor(STAGE_WIDTH / 2), y: STAGE_HEIGHT - 1 },
    laserPos: null,
    score: 0,
  });

  const updatePlayerPos = ({ x, y }) => {
    const newX = player.pos.x + x;
    setPlayer((prev) => ({
      ...prev,
      pos: { x: newX, y: (player.pos.y += y) },
    }));
  };

  const updateLaserPos = (newPos) => {
    setPlayer((prev) => ({
      ...prev,
      laserPos: newPos,
    }));
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
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, updateLaserPos, incrementScore];
};
