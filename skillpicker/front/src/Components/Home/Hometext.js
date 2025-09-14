import React from "react";
import triangle_icon from "../../Assets/Images/triangle-color-red.svg";

export default function Hometext() {
  return (
    <div className="home-text-col col-md-12 col-lg-9 h-auto align-items-center d-flex flex-column my-2 overflow-hidden">
      <div className="icon w-100 d-flex align-content-center">
        <img src={triangle_icon} alt="Red Triangle" className="triangle_icon" />
      </div>
      <div>
        <div className="text-start">
          <h1 className="text-center">Gathering skills for the future</h1>
          <p>
            We got an opportunity to create an application that helps the
            relevant individuals to gather information about the skills which
            are needed from the graduates. In this project we will be
            implementing a system that, on user feedback, gives us statistics
            about the needed skills which then can be used to develop needed
            resources. The collected data should be easily accessible and easy
            to use.
          </p>
          <div className="d-flex flex-column text-start">
            <p>In this survey you need to choose 25 skills from SFIA-8</p>
            <p>5 very important skills</p>
            <p>5 important skills</p>
            <p>5 valuable skills</p>
            <p>5 skills for the future</p>
            <p>5 soft skills</p>
          </div>
          <br />
          <p>
            <a href="https://sfia-online.org/en/sfia-8">Read</a> more about
            sfia-8
          </p>
          <p>
            Check out our <a href="/privacy">Privacy Policy</a> here.
          </p>
          <br />
          <h1 className="magenta">Skill Picker</h1>
        </div>
      </div>
    </div>
  );
}
