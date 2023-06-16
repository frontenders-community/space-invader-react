import React, { useState } from "react";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";

import { createStage, checkPlayerCollision } from "../gameHelpers";

const Space = () => {
  const [moveTime, setMoveTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, moveAliens, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);
  //
  //   console.log("re-render");
  //
  const movePlayer = (dir) => {
    console.log("move", dir);
    if (!checkPlayerCollision(player, stage, dir)) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    // setMoveTime(100000);
    moveAliens();
    resetPlayer();
  };

  const shoot = () => {
    console.log("shoot");
  };
  //
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 32) {
        shoot();
      }
    }
  };

  useInterval(() => {
    moveAliens();
  }, moveTime);

  return (
    <div
      className="space-wrapper"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
    >
      <section>
        <Display text="Score" />
        <StartButton callback={startGame} />
      </section>

      <section className="grid-box">
        {gameOver ? <Display text={"Game Over"} /> : <Stage stage={stage} />}
      </section>
    </div>
  );
};

export default Space;
