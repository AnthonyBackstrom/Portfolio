import React from "react";
/* import { Button } from "react-bootstrap"; */

export default function Skillheader(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <form className="h-100 d-flex justify-content-center align-items-center">
        <input
          name="searchInput"
          type="text"
          className="w-50 h-50 m-0"
          placeholder="Search"
          value={props.query}
          onChange={(e) => props.setQuery(e.target.value)}
        />
        {/* <Button
          type="submit"
          className="submit-btn h-50 w-auto w-auto bg-light text-dark mx-3"
        >
          Search
        </Button> */}
      </form>
    </>
  );
}
