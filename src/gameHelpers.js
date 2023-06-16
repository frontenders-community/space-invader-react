export const STAGE_WIDTH = 15;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill({ type: "clear" })
  );

export const checkPlayerCollision = (player, stage, moveX) => {
  // Check that our move is inside the game area width
  return !stage[STAGE_HEIGHT - 1][player.pos.x + moveX];
};
