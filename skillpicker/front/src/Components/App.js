import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import SkillSelectionLayout from "../Pages/Skill-Selection/Skill-Selection-Layout";
import Skillselectionview from "../Components/Skill-selection/Skill-selection-view";
import Softskillselectionview from "../Components/Skill-selection/Soft-skill-selection-view.js";
import Admin from "../Pages/Admin/Admin";
import Login from "../Pages/Login/Login";
import Logout from "../Pages/Logout/Logout";
import Summary from "./Skill-selection/Summary";
import Privacy from "../Pages/Privacy/Privacy";
import { SelectionProvider } from "../hooks/SelectionContext";

export default function App() {
  return (
    <>
      <SelectionProvider>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route
              path="/:id/skill-selection"
              element={<SkillSelectionLayout />}
            >
              <Route path="most-important" element={<Skillselectionview />} />
              <Route path="important" element={<Skillselectionview />} />
              <Route path="valuable" element={<Skillselectionview />} />
              <Route path="future" element={<Skillselectionview />} />
              <Route path="soft-skill" element={<Softskillselectionview />} />
              <Route path="summary" element={<Summary />} />
            </Route>
          </Route>
        </Routes>
      </SelectionProvider>

      <Routes>
        <Route path="/privacy">
          <Route index element={<Privacy />} />
        </Route>
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/admin">
          <Route index element={<Admin />} />
        </Route>
        <Route path="/logout">
          <Route index element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
}
