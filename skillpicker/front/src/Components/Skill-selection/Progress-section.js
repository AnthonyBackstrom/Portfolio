import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "./Progress-bar";
import SelectionContext from "../../hooks/SelectionContext";

export default function ProgressSection(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = "/" + id + "/skill-selection/";
  const context = useContext(SelectionContext);

  const getButtonTitle = (state) => {
    switch (state) {
      case 0:
        return "Home";
      case 1:
        return "Important Skills";
      case 2:
        return "Valuable Skills";
      case 3:
        return "Future Skills";
      case 4:
        return "Confirm Selections";
      case 5:
        return "Confirm Selections";
      case 6:
        return "Submit";
      default:
        return "Confirm Selections";
    }
  };

  function changeProgress(state) {
    const progressSteps = document.querySelectorAll("div.progress-step");
    const progress = document.getElementById("progress");

    progressSteps[state]?.classList.toggle("progress-step-active");

    progress.style.width =
      ((document.querySelectorAll("div.progress-step-active").length - 1) /
        (progressSteps.length - 1)) *
        100 +
      "%";
  }

  function HandleNavigationNext(event, url, state, navigate) {
    const current = document.querySelectorAll("div.box-active");
    for (let element of current) {
      element.classList.toggle("box-active");
      element.classList.toggle("TEST");
    }

    context?.selections?.forEach((item) => {
      if (item.phase === state + 1) {
        const elem = document.getElementById(
          item.skill["skill"].replace(/\s/g, "")
        );
        elem.classList.toggle("box-active");
        elem.classList.toggle("TEST");
      }
    });
    changeProgress(state);
    window.localStorage.setItem("state", state + 1);
    switch (state) {
      case 1:
        navigate(url + "important");
        break;
      case 2:
        navigate(url + "valuable");
        break;
      case 3:
        navigate(url + "future");
        break;
      case 4:
        navigate(url + "soft-skill");
        break;
      case 5:
        navigate(url + "summary");
        break;
      default:
        navigate("/");
        break;
    }
  }

  function HandleNavigationPrevious(event, url, state, navigate) {
    let current = document.querySelectorAll("div.box-active");
    for (let element of current) {
      element.classList.toggle("box-active");
      element.classList.toggle("TEST");
    }

    context?.selections?.forEach((item) => {
      console.log(item);
      if (item.phase === state - 1) {
        const elem = document.getElementById(
          item.skill["skill"].replace(/\s/g, "")
        );
        elem.classList.toggle("box-active");
        elem.classList.toggle("TEST");
      }
    });
    changeProgress(state - 1);
    window.localStorage.setItem("state", state - 1);
    switch (state) {
      case 2:
        navigate(url + "most-important");
        break;
      case 3:
        navigate(url + "important");
        break;
      case 4:
        navigate(url + "valuable");
        break;
      default:
        navigate("/");
        break;
    }
  }

  return (
    <div className="row progress-container w-auto d-flex overflow-hidden text-center m-auto p-2">
      <div className=" h-75 row w-100 d-flex m-auto p-1 justify-content-center align-items-center">
        <div className="col">
          {props.state < 5 && (
            <Button
              id="previous"
              onClick={(e) => {
                HandleNavigationPrevious(e, url, props.state, navigate);
              }}
            >
              {getButtonTitle(props.state - 1)}
            </Button>
          )}
        </div>
        <ProgressBar />
        <div className="col">
          <Button
            id="next"
            onClick={(e) => {
              HandleNavigationNext(e, url, props.state, navigate);
            }}
          >
            {getButtonTitle(props.state + 1)}
          </Button>
        </div>
      </div>
    </div>
  );
}
