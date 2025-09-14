import React from "react";
import "./Home.css";
import Hometext from "../../Components/Home/Hometext";
import Homeform from "../../Components/Home/Homeform";

export default function Home() {
  return (
    <div className="bg w-100 h-100 m-0 p-0">
      <div className="container container-main h-100 w-100 mx-auto">
        <div className="row h-100 w-100 m-auto">
          <Hometext />
          <Homeform />
        </div>
      </div>
    </div>
  );
}
