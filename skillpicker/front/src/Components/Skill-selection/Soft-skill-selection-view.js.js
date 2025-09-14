import React, { useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import SelectionContext from "../../hooks/SelectionContext";
import { useSkills } from "../../Pages/Skill-Selection/Skill-Selection-Layout";

export default function Softskillselectionview() {
  const {
    softSelections,
    currentSoftSelectionCount,
    softSelectionHandler,
    clearSoftSelections,
  } = useContext(SelectionContext);

  const { skills, state, setClickedElement, query } = useSkills();
  let filteredSkills;
  const titles = [
    "Select most important soft skill",
    "Select important soft skill",
    "Select valuable soft skill",
    "Done",
  ];

  /* Filter soft skills based on query */
  if (skills?.hasOwnProperty("error")) {
    console.log(skills["error"]);
    console.log(skills["details"]);
    filteredSkills = skills;
  } else {
    filteredSkills = skills?.filter((skill) => {
      if (skill["soft_skill"]?.toLowerCase().includes(query?.toLowerCase())) {
        return skill;
      } else if (
        skill["description"]?.toLowerCase().includes(query?.toLowerCase())
      ) {
        return skill;
      } else {
        return null;
      }
    });
  }
  /* Function to map all cards into skill cards */
  const renderCards = (card, index) => {
    const classes = ["box", "my-2", card["id"].replace(/\s/g, "")];
    return (
      <Card
        onClick={(e) => softSelectionHandler(e, state, filteredSkills)}
        key={index}
        className={classes.join(" ")}
        id={card["soft_skill"].replace(/\s/g, "")}
      >
        <Card.Body>
          <Card.Title>{card["soft_skill"]}</Card.Title>
          <Card.Footer>
            <div className="row">
              <Button
                className="card-footer-btn"
                onClick={(e) => {
                  const container = document.getElementById("popup-container");
                  container.style.display = "flex";
                  setClickedElement(e.target.offsetParent);
                }}
              >
                Read more
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  };

  useEffect(() => {
    softSelections?.forEach((selection) => {
      const current = document.getElementById(
        selection?.skill["soft_skill"].replace(/\s/g, "")
      );
      current?.classList.add("box-active");
    });
  }, [query]);

  return (
    <div className="row grid-container w-100 h-75  m-auto">
      <div className="row w-100 m-0 grid-header p-0">
        <div className="col-4 h-100 d-flex align-items-center justify-content-center overflow-hidden m-auto my-0 p-0">
          <p className="my-0">{titles[currentSoftSelectionCount(state)]}</p>
        </div>
        <div className="col-4 h-100 d-flex align-items-center justify-content-center overflow-hidden m-auto my-0 p-0">
          <p id="progressCount" className="blue p-0 m-0">
            <b>{currentSoftSelectionCount(state)}/3</b>
          </p>
        </div>
        <div className="col-4 h-100 d-flex justify-content-center align-items-center">
          <Button
            className="w-50 h-100"
            /*onClick={(e) => clearSoftSelections(e, state)}*/
          >
            Clear selections
          </Button>
        </div>
      </div>
      <div className="row w-100 h-auto m-1 p-1 grid overflow-hidden show">
        {filteredSkills.map(renderCards)}
      </div>
    </div>
  );
}
