import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main, CharactersClasses, Attribute } from "../pages";

const AppNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/characters-classes" element={<CharactersClasses />} />
        <Route path="/attribute" element={<Attribute />} />
        <Route path="/games" />
        <Route path="/confirmation" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigator;
