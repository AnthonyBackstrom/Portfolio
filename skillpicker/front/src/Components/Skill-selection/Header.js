import React, { useEffect, useState } from "react";
import Searchbar from "./Search-bar";
import logo from "../../Assets/Images/jamk_tunnus_valkoinen.png";

export default function Skillheader(props) {
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  return (
    <div className="skill-header m-auto row w-100 d-flex text-center justify-content-center">
      <div className="col-2 d-flex justify-content-center align-items-center">
        <img src={logo} alt="jamk-logo-white" className="skill-header-logo" />
      </div>
      <div className="col-7  h-100">
        <h1 id="title" className="text-nowrap title h-100 w-100 m-0 lh-lg blue">
          {title}
        </h1>
      </div>
      <div className=" col-3 h-100">
        <Searchbar setQuery={props.setQuery} query={props.query} />
      </div>
    </div>
  );
}
