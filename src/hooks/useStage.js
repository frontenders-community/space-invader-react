import { useState, useEffect } from "react";
import { STAGE_WIDTH, createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row, y) =>
        row.map((cell, x) => ({
          type: "clear",
        }))
      );

      // Draw the player
      newStage[player.pos.y][player.pos.x] = { type: "player" };
      // Draw the lazer
      if (player.laserPos) {
        newStage[player.laserPos.y][player.laserPos.x] = { type: "laser" };
      }

      // Then draw aliens
      player.aliens.forEach((row, y) => {
        row.forEach((alien) => {
          if (alien.alive) {
            const rowIndex = alien.pos_y;
            const colIndex = alien.pos_x;
            newStage[rowIndex][colIndex] = { type: "alien" };
          }
        });
      });
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player]);

  return [stage, setStage];
};
