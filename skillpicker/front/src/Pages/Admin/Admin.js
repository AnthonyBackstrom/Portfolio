import React, { useEffect, useRef, useState } from "react";
import "./Admin.css";
import { parseCookies, removeCookies } from "../../Utils/Cookieparser";
import * as jose from "jose";
import AsyncSelect from "react-select/async";

export default function Admin() {
  const [page, setPage] = useState("");
  let state = {
      hash: ""
  };
  const content = useRef(null);
  async function setValues() {
    const cookies = parseCookies(document.cookie);
    if (cookies.has("auth")) {
      if (
        process.env.REACT_APP_JWT_SECRET === undefined ||
        process.env.REACT_APP_JWT_SECRET === ""
      )
        return (content.current.innerText = "JWT_SECRET not found!");
      await jose
        .jwtVerify(
          cookies.get("auth"),
          new TextEncoder().encode(process.env.REACT_APP_JWT_SECRET),
          {
            issuer: "urn:skillpicker.ictowls.xyz:issuer",
            audience: "urn:skillpicker.ictowls.xyz:audience",
          }
        )
        .then((res) => {
          const { payload, protectedHeader } = res;
          if (payload["authorized"] === true) {
            /* content.current.innerHTML = renderSite(payload["username"]); */
            content.current.innerHTML = "";
            const content2 = renderSite(payload["username"]);
            setPage(content2);
          } else {
            content.current.innerHTML =
              "<p>Unauthorized. Please <a href='/login'>login</a> first.</p>";
            removeCookies(document);
          }
        })
        .catch((e) => {
            console.log(e);
          content.current.innerHTML =
            "<p>Error while loading the panel. Please try <a href='/login'>logging in</a> again.</p>";
          removeCookies(document);
        });
    } else {
      content.current.innerHTML =
        "<p>Unauthorized. Please <a href='/login'>login</a> first.</p>";
    }
  }

  setTimeout(() => {
    setValues();
  }, 1000 * 2);

  const loadHashes = () => {
      console.log("hash load called");
    return fetch(`/api/hashList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) return console.log(data.error);
        if (!"ok" in data) return console.log("Invalid response.");
        data = data["ok"].map(x => ({value: x, label: x}));
      })
      .catch((e) => console.log("err", e));
  };

  const answerExport = () => {
      console.log("answer exporter called");
      return fetch(`/api/answers?${state.hash !== "" ? `hash=${state.hash}` : "all"}`, {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
              if ("error" in data) return console.log(data.error);
              if (!"ok" in data) return console.log("Invalid response.");
              console.log(data["ok"]);
          })
          .catch((e) => console.log("err", e));
  };

  const selectChange = (e) => {
      state.hash = e.target.value;
  }

  function renderSite(username) {
    return (
      <>
        <h2>Welcome {username}!</h2>
        <p>
          This Admin Panel is a Work-In-Progress, please
          don't mind the dust.
        </p>
        <a href="/logout">
          <button>Logout</button>
        </a>
        <div>
          <form action="/api/upload" method="post">
            <p>Upload SFIA skills file:</p>
            <input type="file" id="sheetFile" name="sheet" />
            <input type="submit" />
          </form>
        </div>
        <div>
          <p>User Management</p>
          <form action="/api/adduser" method="post">
            <p>Edit/Add Admin user:</p>
            <label for="usernameInput">Username:</label>
            <input type="text" id="usernameInput" name="username"  />
            <label for="passwordInput">Password:</label>
            <input
              type="password"
              id="passwordInput"
              name="password"
            />
            <input type="submit"  />
          </form>
        </div>
        <div>
          <p>Hash editor & Answer exporter</p>
          {<AsyncSelect cacheOptions onChange={selectChange} defaultOptions={[{value: "#ABCDE12345", label: "#ABCDE12345"},{value: "#ABCDE12346", label: "#ABCDE12346"},{value: "#ABCDE12347", label: "#ABCDE12347"},{value: "#ABCDE12348", label: "#ABCDE12348"},{value: "#ABCDE12349", label: "#ABCDE12349"},{value: "#ABCDE12350", label: "#ABCDE12350"},{value: "#ABCDE12351", label: "#ABCDE12351"},{value: "#ABCDE12352", label: "#ABCDE12352"},{value: "#ABCDE12353", label: "#ABCDE12353"},{value: "#ABCDE12354", label: "#ABCDE12354"},{value: "#ABCDE12355", label: "#ABCDE12355"}]} loadOptions={loadHashes} />}
            <button onClick={answerExport}>
                Export Selected Answers
            </button>
            <button disabled>
                Delete Selected Hash
            </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <div>
        <p ref={content}>Loading...</p>
        {page}
      </div>
    </div>
  );
}
