import React, { useEffect } from "react";
import { loadProgress } from "../../Utils/skill-selection-utils";

export default function ProgressBar() {
  const state = parseInt(window.localStorage.getItem("state"));

  useEffect(() => {
    loadProgress(state);
  }, [state]);

  return (
    <div className="col w-50 h-100 d-flex justify-content-center  align-items-start">
      <div className="progressBar">
        <div className="progress" id="progress"></div>
        <div
          className="progress-step progress-step-active"
          data-title="Most Important"
        ></div>
        <div className="progress-step" data-title="Important"></div>
        <div className="progress-step" data-title="Valuable"></div>
        <div className="progress-step" data-title="Future"></div>
        <div className="progress-step" data-title="Soft Skills"></div>
        <div className="progress-step" data-title="Summary"></div>
      </div>
    </div>
  );
}
