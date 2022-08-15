import { combineReducers } from "@reduxjs/toolkit";
import player from "./slice/player";

const reducer = combineReducers({
  player,
});

export default reducer;
