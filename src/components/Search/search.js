import React, { useState } from "react";
import "./search.scss";

const Search = React.memo(({ inputValue, clear }) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const clearErr = () => {
    clear();
    setEnteredFilter("");
  };

  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Search</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              type="text"
              className="input"
              value={enteredFilter}
              onChange={(e) => setEnteredFilter(e.target.value)}
              placeholder="left longitude, bottom latitude, right longitude, top latitude"
            />
          </p>
          <p>
            Get it from{" "}
            <a
              href="http://bboxfinder.com/#0.000000,0.000000,0.000000,0.000000"
              target="_blank"
            >
              bbfinder
            </a>
          </p>
        </div>
        <div className="field is-grouped is-grouped-left">
          <p className="control">
            <button
              className="button  is-primary"
              onClick={() => inputValue(enteredFilter)}
              disabled={enteredFilter === "" ? "disabled" : ""}
            >
              convert
            </button>
          </p>
          <p className="control">
            <a className="button " onClick={clearErr}>
              Clear
            </a>
          </p>
          <p className="control">
            <a
              className="button "
              onClick={() =>
                setEnteredFilter("12.114279,54.073796,12.114955,54.074192")
              }
            >
              Sample
            </a>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Search;
