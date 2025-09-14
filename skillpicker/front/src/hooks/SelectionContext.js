import { createContext, useEffect, useState } from "react";

export const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  const [selections, setSelections] = useState([]);
  const [softSelections, setSoftSelections] = useState([]);

  const clearSelections = (state) => {
    /* Change all active selections */
    const current = document.querySelectorAll("div.box-active");
    for (let element of current) {
      element.classList.toggle("box-active");
    }
    /* Remove all selections from current state */
    if (state < 5) {
      const filteredSelections = selections?.filter(
        (selection) => selection.phase !== state
      );
    }
    setSelections(filteredSelections);
  };

  const clearSoftSelections = (state) => {
    /* Change all active selections */
    const current = document.querySelectorAll("div.box-active");
    for (let element of current) {
      element.classList.toggle("box-active");
    }
    /* Remove all selections from current state */
    if (state < 5) {
      const filteredSelections = softSelections?.filter(
        (selection) => selection.phase !== state
      );
    }
    setSelections(filteredSelections);
  };

  /* Handles normal skill selection */
  const selectionHandler = (event, state, skills) => {
    /* Max selections per page */
    const max = 5;
    /* Current active selections */
    const cur = document.querySelectorAll("div.box-active");

    if (event.target === event.currentTarget) {
      if (event.currentTarget.classList.contains("box-active")) {
        /* Remove selection class */
        event.currentTarget.classList.remove("box-active");
        /* Remove selection if it matches card title */
        const filteredSelections = selections?.filter((selection) => {
          if (
            selection.skill["skill"] !==
            event.target.firstChild.firstChild.innerText
          ) {
            return selection;
          }
        });
        setSelections(filteredSelections);
      } else {
        /* If max selections not reached */
        if (cur.length < max) {
          /* Add selection */
          event.currentTarget.classList.toggle("box-active");
          const foundSkill = skills?.find(
            (skill) =>
              skill["skill"] === event.target.firstChild.firstChild.innerText
          );
          const selection = {
            phase: state,
            skill: foundSkill,
          };
          setSelections((prevSelections) => [...prevSelections, selection]);
        }
      }
    }
  };

  /* Handles soft skill selection */
  const softSelectionHandler = (event, state, skills) => {
    const phases = ["Most Important", "Important", "Valuable"];
    /* Max selections per page */
    const max = 3;
    /* Current active selections */
    const cur = document.querySelectorAll("div.box-active");

    if (event.target === event.currentTarget) {
      if (event.currentTarget.classList.contains("box-active")) {
        /* Remove selection class */
        event.currentTarget.classList.remove("box-active");
        /* Remove selection if it matches card title */
        const filteredSkills = softSelections?.filter((selection) => {
          if (
            selection.skill["soft_skill"] !==
            event.target.firstChild.firstChild.innerText
          ) {
            return selection;
          }
        });
        setSoftSelections(filteredSkills);
      } else {
        /* If max selections not reached */
        if (cur.length < max) {
          /* Add selection */
          event.currentTarget.classList.toggle("box-active");
          const foundSkill = skills?.find(
            (skill) =>
              skill["soft_skill"] ===
              event.target.firstChild.firstChild.innerText
          );

          const selection = {
            phase: phases[softSelections.length],
            skill: foundSkill,
          };
          setSoftSelections((prevSelections) => [...prevSelections, selection]);
        }
      }
    }
  };

  /* Return nomal skill selection count */
  const currentSelectionCount = (state) => {
    /* Return active selection length */
    if (selections) {
      const cur = selections?.filter((selection) => selection.phase === state);
      return cur.length;
    } else {
      return 0;
    }
  };
  /* Return soft skill selection count */
  const currentSoftSelectionCount = (state) => {
    /* Return active selection length */
    return softSelections.length;
  };

  return (
    <SelectionContext.Provider
      value={{
        selections,
        softSelections,
        setSelections,
        clearSelections,
        clearSoftSelections,
        currentSelectionCount,
        currentSoftSelectionCount,
        selectionHandler,
        softSelectionHandler,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export default SelectionContext;
