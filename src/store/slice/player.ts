import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MinimalResolutionCacheHost } from "typescript";

export enum PlayerLevel {
  Gold = "Gold",
  Silver = "Silver",
  Unset = "",
}

export interface PlayerContext {
  id: number | undefined;
  first_name: string;
  preferred_name: string;
  last_name: string;
  player_level: PlayerLevel;
}

interface Minimums {
  strength: number;
  sneakiness: number;
}

interface RequiredAttributes {
  has_armor?: boolean;
  has_mount?: boolean;
  minimums?: Minimums;
}

interface CharactersClasses {
  id: number;
  display_name: string;
  slug: string;
  required_attributes: RequiredAttributes | undefined;
}

interface PlayerState {
  playerContext: PlayerContext;
  charactersClasses: CharactersClasses[];
  selectedCharacterClass: any;
  playerCharacter: any;
}

const initialState: PlayerState = {
  playerContext: {
    id: undefined,
    first_name: "",
    preferred_name: "",
    last_name: "",
    player_level: PlayerLevel.Unset,
  },
  charactersClasses: [],
  selectedCharacterClass: undefined, // should improve this part
  playerCharacter: undefined, // should improve this part
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerContext(state, action: PayloadAction<PlayerContext>) {
      state.playerContext = { ...action.payload };
    },
    setCharactersClasses(state, action: PayloadAction<CharactersClasses[]>){
      state.charactersClasses = [...action.payload];
    },
    setSelectedCharacterClass(state, action: PayloadAction<any>) {
      state.selectedCharacterClass = action.payload;
    },
    setPlayerCharacter(state, action: PayloadAction<any>){
      state.playerCharacter = action.payload;
    },
  },
});

export const {
  setPlayerContext,
  setCharactersClasses,
  setSelectedCharacterClass,
  setPlayerCharacter,
} = playerSlice.actions;
export default playerSlice.reducer;
