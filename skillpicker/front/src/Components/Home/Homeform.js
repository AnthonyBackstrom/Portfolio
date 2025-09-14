import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
let logo = require("../../Assets/Images/jamk-white-english.png");

export default function Homeform() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const hash = document.getElementById("hashInput").value;
    const substring = hash.substring(1);
    const url = `/${substring}/skill-selection/most-important`;

    fetch(`/api/hash`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        hash
      })
    }).then(res => res.json()).then(data => {
      if("error" in data) return console.log(data.error);
      if(!"ok" in data) return console.log("Invalid hash-key");
      window.localStorage.setItem("state", 1);
      navigate(url);
    }).catch(e => console.log("err",e));
  }

  return (
    <div className="col-md-12 col-lg-3 h-100 d-flex flex-column">
      <div className="d-flex h-50 w-100 justify-content-center align-items-end">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col d-flex flex-column align-items-center">
              <label htmlFor="hashInput" className="my-2">
                Please enter your hash key
              </label>
              <input
                id="hashInput"
                type="text"
                defaultValue={"#ABCDE12345"}
                className="my-2"
              />
              <Button
                type="submit"
                className="submit-btn my-2 w-50 bg-light text-dark"
              >
                Ok
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="logo_container w-100 d-flex align-items-end h-50 justify-content-end">
        <img src={logo} alt="jamk-logo-white" className="logo w-75" />
      </div>
    </div>
  );
}
