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
  STAGE_HEIGHT,
} from "../gameHelpers";
import { useAliens } from "../hooks/useAliens";
import { ALIENS_IN_ROW, ALIENS_ROWS } from "../aliens";

const Space = () => {
  const [moveTime, setMoveTime] = useState(null);
  const [laserTime, setLaserTime] = useState(null);
  const [gameResult, setGameResult] = useState("");

  const [moveAliens, aliens, killAlien, resetAliens] = useAliens();
  const [player, updatePlayerPos, resetPlayer, updateLaserPos, incrementScore] =
    usePlayer();

  const [stage, setStage] = useStage(player, aliens);

  const finishGame = (state) => {
    setGameResult(state);
  };

  const movePlayer = (dir) => {
    if (!checkPlayerCollision(player, stage, dir)) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setGameResult("playing");
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
      incrementScore();
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
    if (gameResult === "playing") {
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
    if (gameResult === "playing") {
      // Reset everything
      setStage(createStage());
      setMoveTime(1000);
      resetPlayer();
      resetAliens();
    } else if (gameResult === "gameover" || gameResult === "win") {
      setMoveTime(null);
    }
  }, [gameResult]);

  useEffect(() => {
    if (aliens.lowestAliveRowPos === STAGE_HEIGHT - 1) {
      finishGame("gameover");
    }
  }, [aliens]);

  useEffect(() => {
    if (player.score === ALIENS_IN_ROW * ALIENS_ROWS) {
      finishGame("win");
    }
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
      <header>
        <Display text={`Level 1`} />
        <Display text={`Score: ${player.score}`} />
        <StartButton callback={startGame} />
      </header>

      <section className="grid-box">
        {gameResult === "gameover" ? (
          <Display text={"Game Over"} />
        ) : gameResult === "win" ? (
          <Display text={"YOU ARE WIN!!!"} />
        ) : (
          <Stage stage={stage} />
        )}
      </section>
    </div>
  );
};

export default Space;
