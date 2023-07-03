import React, { useEffect, useState } from "react";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";

import {
  createStage,
  checkPlayerCollision,
  checkLaserAlienCollision,
  checkLaserSpaceCollision,
} from "../gameHelpers";

const Space = () => {
  const [moveTime, setMoveTime] = useState(null);
  const [laserTime, setLaserTime] = useState(null);
  const [gameResult, setGameResult] = useState("");

  const finishGame = (state) => {
    setGameResult(state);
  };

  const [
    player,
    updatePlayerPos,
    moveAliens,
    resetPlayer,
    updateLaserPos,
    killAlien,
  ] = usePlayer({ finishGame });
  const [stage, setStage] = useStage(player);

  const movePlayer = (dir) => {
    if (!checkPlayerCollision(player, stage, dir)) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setGameResult("")
    setStage(createStage());
    setMoveTime(1000);
    resetPlayer();
  };

  const stopGame = () => {
    setMoveTime(null);
  };

  const shoot = () => {
    if (!laserTime) {
      setLaserTime(20);
    }
    if (!player.laserPos) {
      updateLaserPos({
        x: player.pos.x,
        y: player.pos.y - 1,
        collided: false,
      });
    } else if (checkLaserSpaceCollision(player.laserPos)) {
      setLaserTime(null);
      updateLaserPos(null);
    } else if (checkLaserAlienCollision(player.laserPos, stage)) {
      killAlien({ x: player.laserPos.x, y: player.laserPos.y - 1 });
      updateLaserPos(null);
      setLaserTime(null);
    } else {
      updateLaserPos({
        x: player.laserPos.x,
        y: player.laserPos.y - 1,
        collided: false,
      });
    }
  };

  const move = ({ keyCode }) => {
    if (gameResult === "") {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 32) {
        shoot();
      }
    }
  };

  useEffect(() => {
    console.log("score changes");
  }, [player.score]);

  useInterval(() => {
    shoot();
  }, laserTime);

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
        <Display text={player.score} />
        <StartButton callback={startGame} />
        <StartButton callback={stopGame} />
      </section>

      <section className="grid-box">
        {gameResult === "gameover" ? (
          <Display text={"Game Over"} />
        ) : (
          <Stage stage={stage} />
        )}
      </section>
    </div>
  );
};

export default Space;
