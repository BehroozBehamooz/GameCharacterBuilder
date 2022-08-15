import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCharactersClasses,
  getPlayerCharacter,
  getGames,
  getPlayerContext,
} from "services/services";
import {
  setCharactersClasses,
  setPlayerCharacter,
  setPlayerContext,
} from "store/slice/player";
import { RootState } from "store/store";

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getPlayerContext().then((response) => {
      if (response?.playerId > 0) {
        dispatch(setPlayerContext(response));
      }
    });
  }, []);

  const { id: playerId = 0, player_level } = useSelector(
    (state: RootState) => state.player.playerContext
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (playerId > 0) {
      getGames(playerId).then((response) => {
        const { id: gameId = 0 } = response;
        if (gameId > 0) {
          navigate("/games");
        } else {
          getCharactersClasses(player_level).then((response) =>
            dispatch(setCharactersClasses(response))
          );
          getPlayerCharacter(playerId).then((response) => {
            const { character_id = 0 } = response;
            if (character_id > 0) {
              dispatch(setPlayerCharacter(response));
              const { attribute } = response;
              if (attribute) {
                navigate("/confirmation");
              } else {
                navigate("/attribure");
              }
            } else {
              navigate("/characters-classes");
            }
          });
        }
      });
    }
  }, [playerId]);

  return <p>Loading...</p>;
};
