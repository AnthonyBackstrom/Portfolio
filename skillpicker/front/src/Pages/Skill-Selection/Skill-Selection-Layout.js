import React, { useEffect, useState } from "react";
import "./Skill-Selection.css";
import Skillheader from "../../Components/Skill-selection/Header";
import Progressbar from "../../Components/Skill-selection/Progress-section";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import SkillInfoView from "../../Components/Skill-selection/Skill-Info-View";

export default function SkillSelection() {
  const location = useLocation();

  /* Header titles */
  const titles = [
    "Select 5 most important skills",
    "Select 5 important skills",
    "Select 5 valuable skills",
    "Select 5 future skills",
    "Select 5 soft skills",
    "Summary",
  ];
  const [state, setState] = useState(
    parseInt(window.localStorage.getItem("state"))
  );
  const [query, setQuery] = useState("");
  const [clickedElement, setClickedElement] = useState();
  const [skills, setSkills] = useState([]);
  const [toggleSoftSkills, setToggleSoftSkills] = useState(false);

  /* Toggles soft skills on */
  useEffect(() => {
    if (state > 4) {
      setToggleSoftSkills(true);
    } else {
      setToggleSoftSkills(false);
    }
  }, [state]);

  /* Fetch data on toggle */
  useEffect(() => {
    if (toggleSoftSkills) {
      try {
        fetch("/api/softskills", {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setSkills(data);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        fetch("/api/skills", {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setSkills(data);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [toggleSoftSkills]);

  /* Initial fetch */
  useEffect(() => {
    try {
      fetch("/api/skills", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSkills(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* Set state from localstorage */
  useEffect(() => {
    setState(parseInt(window.localStorage.getItem("state")));
  }, [location.pathname]);

  return (
    <div className="bg-skill h-100 p-0 m-0">
      <div className="container container-skill h-100 w-100 m-0 p-0">
        <div>
          <SkillInfoView
            skills={skills}
            clickedElement={clickedElement}
            toggleSoftSkills={toggleSoftSkills}
          />
        </div>
        <div className="col-12 h-100 w-100 m-auto">
          <Skillheader
            setQuery={setQuery}
            query={query}
            state={state}
            title={titles[state - 1]}
          />
          <Progressbar state={state} />
          <Outlet context={{ skills, state, setClickedElement, query }} />
        </div>
      </div>
    </div>
  );
}

export function useSkills() {
  return useOutletContext();
}
