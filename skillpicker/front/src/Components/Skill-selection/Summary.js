import React, { useContext, useEffect, useRef } from "react";
import SelectionContext from "../../hooks/SelectionContext";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";

export default function Summary() {
  const { selections, softSelections } = useContext(SelectionContext);
  const contentRef = useRef(0);
  const hash = useParams();
  /* Categorizes selections */
  function mapSelections() {
    const categories = [
      { name: "Most Important", phase: 1 },
      { name: "Important", phase: 2 },
      { name: "Valuable", phase: 3 },
      { name: "Future", phase: 4 },
    ];

    /* Saves user answer on page render */
    useEffect(() => {
      const parsedSelections = selections?.forEach((selection) => {
        const phase = categories?.filter((category) => {
          return selection?.phase === category?.phase;
        });
        return { id: selection?.skill["id"], phase: phase.name };
      });

      const parsedSoftSelections = softSelections?.forEach((selection) => {
        console.log(selection);
        return {
          id: selection?.skill["id"],
          phase: selection?.phase,
        };
      });

      const data = {
        Hash: hash,
        selections: {
          SFIA: parsedSelections,
          Soft: parsedSoftSelections,
        },
      };

      try {
        fetch("https://skillpicker.ictowls.xyz/api/answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }).then((res) => console.log(res));
      } catch (error) {
        console.log(error);
      }
    }, []);

    const categorizedSelections = categories?.map((category) => {
      const categorizeSelections = (selection) => {
        if (selection.phase === category.phase) {
          return <li className="text-dark">{selection.skill["skill"]}</li>;
        } else {
          return null;
        }
      };

      return (
        <div>
          <h3 className="text-dark">{category.name}</h3>
          <ul>{selections?.map(categorizeSelections)}</ul>
        </div>
      );
    });

    return categorizedSelections;
  }

  /* Categorizes soft selections */
  function mapSoftSelections() {
    const categories = ["Most Important", "Important", "Valuable"];

    const categorizedSoftSelections = categories?.map((category) => {
      const categorizeSoftSelections = (selection) => {
        if (selection.phase === category) {
          return <li className="text-dark">{selection.skill["soft_skill"]}</li>;
        }
      };

      return (
        <div>
          <h3 className="text-dark">{category}</h3>
          <ul>{softSelections?.map(categorizeSoftSelections)}</ul>
        </div>
      );
    });
    return categorizedSoftSelections;
  }

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: "selections-data",
  });

  return (
    <>
      <div id="summary-content" className="w-75 h-75 mx-auto py-0">
        <div className="row w-100 my-0 m-auto d-flex grid-header-summary">
          <div className="col-8 h-100 my-0 d-flex align-items-center justify-content-center overflow-hidden m-auto my-0 p-0">
            <p id="progressCount" className="p-0 m-0"></p>
          </div>
          <div className="col-4 h-100 my-0 d-flex justify-content-center align-items-center">
            <Button className="w-50 my-0 h-100" onClick={handlePrint}>
              Print Selections
            </Button>
          </div>
        </div>
        <div ref={contentRef} className="m-2">
          <h2 className="text-dark">SFIA-8 skills:</h2>
          {mapSelections()}
          <br />
          <h2 className="text-dark">Soft Skills:</h2>
          {mapSoftSelections()}
        </div>
      </div>
    </>
  );
}
