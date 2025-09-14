import React, { useContext /* { useEffect } */, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSkills } from "../../Pages/Skill-Selection/Skill-Selection-Layout";
import { Card } from "react-bootstrap";
import SelectionContext from "../../hooks/SelectionContext";

export default function Skillselectionview() {
  const { skills, state, setClickedElement, query } = useSkills();
  const {
    selections,
    clearSelections,
    currentSelectionCount,
    selectionHandler,
  } = useContext(SelectionContext);
  let filteredSkills;

  /* Filters rendered skills by search query */
  if (skills?.hasOwnProperty("error")) {
    console.log(skills["error"]);
    console.log(skills["details"]);
    filteredSkills = skills;
  } else {
    filteredSkills = skills?.filter((skill) => {
      if (skill["skill"]?.toLowerCase().includes(query?.toLowerCase())) {
        return skill;
      } else if (
        skill["category"]?.toLowerCase().includes(query?.toLowerCase())
      ) {
        return skill;
      } else if (
        skill["subcategory"]?.toLowerCase().includes(query?.toLowerCase())
      ) {
        return skill;
      } else if (skill["code"]?.toLowerCase().includes(query?.toLowerCase())) {
        return skill;
      } else if (
        skill["Overall description"]
          ?.toLowerCase()
          .includes(query?.toLowerCase())
      ) {
        return skill;
      } else if (
        skill["Guidance notes"]?.toLowerCase().includes(query?.toLowerCase())
      ) {
        return skill;
      } else {
        return null;
      }
    });
  }

  /* Returns JSX of all skills categorized */
  const generateCards = (inputSkills) => {
    let categories = [];

    /* Forms an array of all categories */
    inputSkills?.forEach((skill) => {
      categories.push(skill["category"]);
    });

    /* Forms an array of all unique values from categories */
    const uniqueCategories = [...new Set(categories)];

    /* Generates all skills into skill cards */
    const cards = inputSkills?.map((card, index) => {
      const cardClasses = ["box", "my-2", card["category"].replace(/\s/g, "")];
      return (
        <Card
          onClick={(e) => selectionHandler(e, state, inputSkills)}
          key={index}
          className={cardClasses.join(" ")}
          id={card["skill"].replace(/\s/g, "")}
        >
          <Card.Body>
            <Card.Title>{card["skill"]}</Card.Title>
            <Card.Footer>
              <div className="row">
                <Button
                  className="card-footer-btn"
                  onClick={(e) => {
                    const container =
                      document.getElementById("popup-container");
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
    });

    /* Divides skills into categories */
    const categorizedCards = uniqueCategories?.map((category, index) => {
      const categoryClasses = [
        "row",
        "w-100",
        "m-1",
        "p-1",
        "grid",
        category.replace(/\s/g, ""),
        "overflow-hidden",
      ];

      const categorizeCards = (card, index) => {
        const classList = card.props.className.split(" ");
        if (classList.includes(category.replace(/\s/g, ""))) {
          return card;
        } else {
          return null;
        }
      };

      return (
        <>
          <div className="my-3">
            <Button
              className="w-25 h-auto category-button"
              id={category}
              onClick={(e) => {
                e.currentTarget.nextSibling.classList.toggle("show");
                e.currentTarget.classList.toggle("button-active");
              }}
              key={index}
            >
              {category}
            </Button>
            <div className={categoryClasses.join(" ")}>
              {cards.map(categorizeCards)}
            </div>
          </div>
        </>
      );
    });

    return categorizedCards;
  };

  /* Simple verification to check if inputSkills contains an error */
  const verifySkills = (inputSkills) => {
    if (inputSkills?.hasOwnProperty("error")) {
      return (
        <div className="w-50">
          <h3 className="text-dark">{inputSkills["error"]}</h3>
          <p className="text-dark">{inputSkills["details"]}</p>
        </div>
      );
    } else {
      const cards = generateCards(inputSkills);
      return cards;
    }
  };

  useEffect(() => {
    selections?.forEach((selection) => {
      const current = document.getElementById(
        selection?.skill["skill"].replace(/\s/g, "")
      );
      if (selection?.phase === state) {
        current?.classList.add("box-active");
      } else {
        current?.classList.add("TEST");
      }
    });

    const buttons = document.querySelectorAll("div.category-button");

    buttons?.forEach((button) => {
      button.classList.remove("button-active");
    });
  }, [query]);

  return (
    <div className="row grid-container w-100 h-75  m-auto">
      <div className="row w-100 my-0 m-auto d-flex grid-header">
        <div className="col-8 h-100 d-flex align-items-center justify-content-center overflow-hidden m-auto my-0 p-0">
          <p id="progressCount" className="p-0 m-0">
            <b>{currentSelectionCount(state)}</b>/<b>5</b>
          </p>
        </div>
        <div className="col-4 h-100 d-flex justify-content-center align-items-center">
          <Button
            className="w-50 h-100"
            /*onClick={(e) => clearSelections(e, state)}*/
          >
            Clear Selections
          </Button>
        </div>
      </div>
      {verifySkills(filteredSkills)}
    </div>
  );
}
