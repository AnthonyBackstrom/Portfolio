let selections = [];

/* export function CardClickHandler(event) {
  event.stopPropagation();
  const state = parseInt(window.localStorage.getItem("state"));
  const max = 5;
  const cur = document.getElementsByClassName("box-active");

  if (event.target === event.currentTarget) {
    if (event.currentTarget.classList.contains("box-active")) {
      event.currentTarget.classList.remove("box-active");
      selections.forEach(function (object) {
        if (
          object.skill === event.currentTarget.lastChild.firstChild.innerText
        ) {
          selections.pop(object);
        }
      });
    } else {
      if (cur.length < max) {
        event.currentTarget.classList.toggle("box-active");
        selections.push({
          phase: state,
          skill: event.currentTarget.lastChild.firstChild.innerText,
        });
      }
    }
    document.getElementById("progress-count").innerText = cur.length;
  }
} */

/* export function getSelections() {
  return selections;
} */

/* export function handleShowButtonClick(event) {
  event.currentTarget.nextSibling.classList.toggle("show");
  event.currentTarget.classList.toggle("button-active");
} */

/* export function handleClear(event, state) {
  const current = document.querySelectorAll("div.box-active");
  for (let element of current) {
    element.classList.toggle("box-active");
  }

  selections = selections.filter((item) => item.phase !== state);

  document.getElementById("progress-count").innerText = 0;
} */

/* export function navNext(state) {
  Save selections to db here
  const current = document.querySelectorAll("div.box-active");
  for (let element of current) {
    element.classList.toggle("box-active");
    element.classList.toggle("TEST");
  }

  selections.forEach((item) => {
    if (item.phase === state + 1) {
      const elem = document.getElementById(item.skill.replace(/\s/g, ""));
      elem.classList.toggle("box-active");
      elem.classList.toggle("TEST");
    }
  });
  document.getElementById("progress-count").innerText = prog;
} */

/* export function navPrev(state) {
  Save selections to db here
  let current = document.querySelectorAll("div.box-active");
  for (let element of current) {
    element.classList.toggle("box-active");
    element.classList.toggle("TEST");
  }

  selections.forEach((item) => {
    if (item.phase === state - 1) {
      const elem = document.getElementById(item.skill.replace(/\s/g, ""));
      elem.classList.toggle("box-active");
      elem.classList.toggle("TEST");
    }
  });

  document.getElementById("progress-count").innerText = prog;
} */

/* export function navFinal() {
} */

export function changeProgress(state) {
  const progressSteps = document.querySelectorAll("div.progress-step");
  const progress = document.getElementById("progress");

  progressSteps[state].classList.toggle("progress-step-active");

  progress.style.width =
    ((document.querySelectorAll("div.progress-step-active").length - 1) /
      (progressSteps.length - 1)) *
      100 +
    "%";
}

export function loadProgress(state) {
  const progressSteps = document.querySelectorAll("div.progress-step");
  const progress = document.getElementById("progress");
  for (let i = 0; i < state; i++) {
    progressSteps[i].classList.add("progress-step-active");
  }

  progress.style.width =
    ((document.querySelectorAll("div.progress-step-active").length - 1) /
      (progressSteps.length - 1)) *
      100 +
    "%";
}

/* export function loadSelections(state) {
  if (selections) {
    selections.forEach((selection) => {
      console.log(selection);
      const sel = document.getElementById(selection.skill.replace(/\s/g, ""));
      console.log(sel);
      if (selection.phase !== state) {
        sel.classList.add("TEST");
      } else {
        sel.classList.add("box-active");
      }
    });
  }
} */

/* export function HandleNavigationPrevious(event, url, state, navigate) {
  let current = document.querySelectorAll("div.box-active");
  for (let element of current) {
    element.classList.toggle("box-active");
    element.classList.toggle("TEST");
  }

  selections.forEach((item) => {
    if (item.phase === state - 1) {
      const elem = document.getElementById(item.skill.replace(/\s/g, ""));
      elem.classList.toggle("box-active");
      elem.classList.toggle("TEST");
    }
  });
  switch (state) {
    case 2:
      changeProgress(state - 1);
      navPrev(state);
      window.localStorage.setItem("state", state - 1);
      navigate(url + "most-important");
      break;
    case 3:
      changeProgress(state - 1);
      navPrev(state);
      window.localStorage.setItem("state", state - 1);
      navigate(url + "important");
      break;
    case 4:
      changeProgress(state - 1);
      navPrev(state);
      window.localStorage.setItem("state", state - 1);
      navigate(url + "valuable");
      break;
    default:
      navPrev(state - 1);
      navigate("/", { state: 0 });
      break;
  }
}

export function HandleNavigationNext(event, url, state, navigate) {
  switch (state) {
    case 1:
      navNext(state);
      window.localStorage.setItem("state", state + 1);
      navigate(url + "important");
      break;
    case 2:
      navNext(state);
      window.localStorage.setItem("state", state + 1);
      navigate(url + "valuable");
      break;
    case 3:
      navNext(state);
      window.localStorage.setItem("state", state + 1);
      navigate(url + "future");
      break;
    case 4:
      navNext(state);
      window.localStorage.setItem("state", state + 1);
      navigate(url + "soft-skill");
      break;
    case 5:
      navFinal();
      window.localStorage.setItem("state", state + 1);
      navigate(url + "summary");
      break;
    default:
      navNext(state);
      navigate("/", { state: 0 });
      break;
  }
}
 */
