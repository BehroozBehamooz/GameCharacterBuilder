import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCharacter } from "services/services";
import {
  setPlayerCharacter,
  setSelectedCharacterClass,
} from "store/slice/player";
import { RootState } from "store/store";

export const eyeColors = {
  Black: "black",
  Red: "red",
  Blonde: "blonde",
  Gray: "gray",
  Brown: "brown",
};

export type EyeColor = keyof typeof eyeColors;

export const hairColors = {
  Blue: "blue",
  Purple: "purple",
  Gray: "gray",
  Green: "green",
  Brown: "brown",
};

export type HairColor = keyof typeof hairColors;

export const Attribute = () => {
  const dispatch = useDispatch();

  const {
    playerContext,
    playerCharacter,
    selectedCharacterClass,
    charactersClasses,
  } = useSelector((state: RootState) => state.player);

  const { id: playerId } = playerContext;

  const {
    display_name,
    required_attributes: {
      has_armor: has_armor_default = false,
      has_mount: has_mount_defualt = false,
      minimums: { strength: strength_min = 0, sneakiness: sneakiness_min = 0 },
    },
  } = selectedCharacterClass;

  const {
    character_class,
    character_id,
    attributes: {
      visual: { hair_color = "black", eye_color = "blue" },
      skills: { strength, sneakiness },
      addons: { has_mount, has_armor },
    },
  } = playerCharacter;

  const [attributes, setAttribures] = useState({
    hairColorState: hair_color,
    eyeColorState: eye_color,
    strengthState: strength ?? strength_min,
    sneakinessState: sneakiness ?? sneakiness_min,
    hasArmorState: has_armor ?? has_armor_default,
    hasMountState: has_mount ?? has_mount_defualt,
  });

  if (!selectedCharacterClass) {
    const foundCharacterClass = charactersClasses.find(
      (c) => c.slug === character_class
    );
    dispatch(setSelectedCharacterClass(foundCharacterClass));
  }

  const handleChange = (e) => {
    setAttribures((currentAttributes) => {
      return { ...currentAttributes, [e.name]: e.value };
    });
  };

  const {
    hairColorState,
    eyeColorState,
    strengthState,
    sneakinessState,
    hasArmorState,
    hasMountState,
  } = attributes;

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      character_class,
      attributes: {
        visual: {
          hair_color: hairColorState,
          eye_color: eyeColorState,
        },
        skills: {
          strength: strengthState,
          sneakiness: sneakinessState,
        },
        addons: {
          has_armor: hasArmorState,
          has_mount: hasMountState,
        },
      },
    };
    dispatch(setPlayerCharacter(body));
    updateCharacter(playerId, character_id, body);
  };

  return (
    <>
      <h1>Let's customize your character</h1>
      <h2>{display_name}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="eyeColorState"> Eye Color</label>
        <select
          name="eyeColorState"
          value={eyeColorState}
          onChange={handleChange}
        >
          {Object.entries(eyeColors).map(([key, value]) => (
            <option key={`eye-color-${value}`}>{key}</option>
          ))}
        </select>
        <label htmlFor="hairColorState">Hair Color</label>
        <select
          name="hairColorState"
          value={hairColorState}
          onChange={handleChange}
        >
          {Object.entries(hairColors).map(([key, value]) => (
            <option key={`hair-color-${value}`}>{key}</option>
          ))}
        </select>
        <label htmlFor="strengthState">Strength</label>
        <input
          type={"range"}
          name={"strengthState"}
          min={0}
          max={10}
          value={strengthState}
          onChange={handleChange}
        />
        <label htmlFor="sneakinessState">Sneakiness</label>
        <input
          type={"range"}
          name={"sneakinessState"}
          min={0}
          max={10}
          value={sneakinessState}
          onChange={handleChange}
        />
        <label htmlFor="hasMountState">Has mount</label>
        <input
          type={"checkbox"}
          name={"hasMountState"}
          value={hasMountState}
          onChange={handleChange}
        />
        <label htmlFor="hasArmorState">Has armor</label>
        <input
          type={"checkbox"}
          name={"hasArmorState"}
          value={hasArmorState}
          onChange={handleChange}
        />
        <input type={"submit"}>Save</input>
      </form>
    </>
  );
};
