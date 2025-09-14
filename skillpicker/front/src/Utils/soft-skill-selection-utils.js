/* @collapse */
let selections = [];

export function getSoftSkills() {
  const softskills = [
    {
      ID: "ID122",
      "SOFT SKILL": "Communication",
      DESCRIPTION:
        "Communication is the ability to clearly and effectively convey information, ideas, and thoughts to others. In the IT field, good communication skills are crucial for communicating technical information to both technical and non-technical audiences.",
    },
    {
      ID: "ID123",
      "SOFT SKILL": "Research and knowledge gathering",
      DESCRIPTION:
        "IT professionals need to be able to gather information from a variety of sources, such as academic journals, industry publications, and online forums, in order to stay current on the latest trends and technologies.",
    },
    {
      ID: "ID124",
      "SOFT SKILL": "Leadership",
      DESCRIPTION:
        "Leadership involves the ability to inspire and motivate others towards a common goal. In the IT field, leadership skills can be important for managing teams and guiding projects to successful completion.",
    },
    {
      ID: "ID125",
      "SOFT SKILL": "Problem solving",
      DESCRIPTION:
        "Problem solving involves the ability to analyze complex problems, identify root causes, and develop solutions. In the IT field, strong problem-solving skills are essential for resolving technical issues and ensuring the quality of work.",
    },
    {
      ID: "ID126",
      "SOFT SKILL": "Team working",
      DESCRIPTION:
        "Teamwork involves the ability to work effectively with others towards a common goal. In the IT field, teamwork is important for collaborating on projects and sharing knowledge and expertise.",
    },
    {
      ID: "ID127",
      "SOFT SKILL": "Conflict Solving",
      DESCRIPTION:
        "Conflict solving involves the ability to effectively manage and resolve conflicts that may arise within a team or with clients. In the IT field, strong conflict-solving skills can help maintain positive relationships and ensure project success.",
    },
    {
      ID: "ID128",
      "SOFT SKILL": "Flexibility",
      DESCRIPTION:
        "Flexibility involves the ability to adapt to changes and new situations. In the IT field, flexibility is important for quickly adapting to new technologies and processes.",
    },
    {
      ID: "ID129",
      "SOFT SKILL": "Creativity",
      DESCRIPTION:
        "Creativity involves the ability to think outside the box and come up with innovative solutions to problems. In the IT field, creativity can lead to new ideas and improved processes.",
    },
    {
      ID: "ID130",
      "SOFT SKILL": "Empathy",
      DESCRIPTION:
        "Empathy involves the ability to understand and share the feelings of others. In the IT field, empathy can help build positive relationships with clients and co-workers.",
    },
    {
      ID: "ID131",
      "SOFT SKILL": "Change adaptivity",
      DESCRIPTION:
        "Change adaptivity involves the ability to quickly adapt to new situations and changes. In the IT field, change adaptivity is important for keeping up with the rapidly evolving technology landscape.",
    },
    {
      ID: "ID132",
      "SOFT SKILL": "Critical thinking",
      DESCRIPTION:
        "Critical thinking involves the ability to analyze information and make sound decisions. In the IT field, critical thinking is important for making informed decisions and solving complex problems.",
    },
    {
      ID: "ID133",
      "SOFT SKILL": "Knowledge sharing",
      DESCRIPTION:
        "Knowledge sharing involves the willingness to share information and expertise with others. In the IT field, knowledge sharing can help build strong teams and enhance overall productivity.",
    },
    {
      ID: "ID134",
      "SOFT SKILL": "Time management",
      DESCRIPTION:
        "Time management involves the ability to effectively manage and prioritize tasks in order to meet deadlines. In the IT field, good time management skills are crucial for staying on top of multiple projects and meeting tight deadlines.",
    },
    {
      ID: "ID135",
      "SOFT SKILL": "Co-Operation",
      DESCRIPTION:
        "Cooperation involves the ability to work together with others towards a common goal. In the IT field, cooperation is important for effectively collaborating on projects and sharing knowledge and expertise.",
    },
    {
      ID: "ID136",
      "SOFT SKILL": "Curiosity",
      DESCRIPTION:
        "Curiosity involves the desire to learn and explore new things. In the IT field, curiosity can lead to the continuous learning and growth of skills and knowledge.",
    },
    {
      ID: "ID137",
      "SOFT SKILL": "Personal interest",
      DESCRIPTION:
        "Personal interest involves having a genuine passion and interest in the IT field. In the IT field, personal interest can drive motivation and lead to a successful career.",
    },
    {
      ID: "ID138",
      "SOFT SKILL": "Networking",
      DESCRIPTION:
        "Networking involves building relationships and connections with others in the industry. In the IT field, networking can lead to job opportunities, collaborations, and the exchange of knowledge and expertise.",
    },
  ];

  return softskills;
}

export function softHandleClear(event, state) {
  const current = document.querySelectorAll("div.box-active");
  for (let element of current) {
    element.classList.toggle("box-active");
  }

  selections = selections.filter((item) => item.phase !== state);

  document.getElementById("progress-count").innerText = 0;
}

export function softCardClickHandler(event, state) {
  /* event.stopPropagation(); */
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
      } else {
        console.log("Max-selections reached");
      }
    }
    document.getElementById("progress-count").innerText = cur.length;
  }
}
