import React, { useEffect, useState } from "react";

export default function SkillInfoView(props) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    try {
      const skill = props.skills?.filter((skill) => {
        if (props.clickedElement) {
          if (props.toggleSoftSkills === false) {
            return (
              skill["skill"]?.toLowerCase().replace(/\s/g, "") ===
              props.clickedElement.id.toLowerCase()
            );
          } else {
            return (
              skill["soft_skill"]?.toLowerCase().replace(/\s/g, "") ===
              props.clickedElement.id.toLowerCase()
            );
          }
        } else {
          return null;
        }
      });
      let elements = [];
      for (const prop in skill[0]) {
        elements.push(
          <>
            <div key={prop} className="d-flex justify-content-around">
              <div className="col-4 justify-content-start">
                <h3>{prop + ":"}</h3>
              </div>
              <div className="col-8">
                <p>{skill[0][prop]}</p>
              </div>
            </div>
            <hr className="hr" />
          </>
        );
      }
      setElements(elements);
    } catch {}
  }, [props.clickedElement]);

  return (
    <div id="popup-container">
      <div id="popup-content" className="col-12">
        <div id="popup-header" className="col-12">
          <button
            id="close-btn"
            onClick={(e) => {
              e.target.offsetParent.attributes.style.textContent =
                "display: none";
            }}
            className="p-0 m-0"
          >
            Close
          </button>
        </div>
        <div id="popup-skillInfo" className="col-12">
          {elements}
        </div>
      </div>
    </div>
  );
}
