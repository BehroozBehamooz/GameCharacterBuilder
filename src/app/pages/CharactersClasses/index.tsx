import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCharacter } from "services/services";
import {
  setPlayerCharacter,
  setSelectedCharacterClass,
} from "store/slice/player";
import { RootState } from "store/store";

export const CharactersClasses = () => {
  const { charactersClasses } = useSelector((state: RootState) => state.player);

  const { id: playerId } = useSelector(
    (state: RootState) => state.player.playerContext
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClassClick = (selectedCharacterClass) => {
    const { id, slug } = selectedCharacterClass;
    const newCharacter = {
      character_id: id,
      character_class: slug,
    };
    createCharacter(playerId, newCharacter).then(({ status }) => {
      if (status === "success") {
        dispatch(setSelectedCharacterClass(selectedCharacterClass));
        dispatch(setPlayerCharacter(newCharacter));
        navigate("/character-attribute");
      }
    });
  };

  return (
    <>
      <h1>Choose a character class</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "600px",
          justifyContent: "space-around",
        }}
      >
        {charactersClasses?.map((c: any, index: number) => (
          <div
            key={`charachter-class-${index}`}
            style={{ width: "200px" }}
            onClick={() => handleClassClick(c)}
          >
            {c.display_name}
          </div>
        ))}
      </div>
    </>
  );
};
