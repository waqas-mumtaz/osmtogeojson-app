import React, { useState, useEffect } from "react";
import useHttp from "../hooks/http";
import Search from "../components/Search/search";
import Notification from "../components/UI/Notification";
import LoadingIndicator from "../components/UI/LoadingIndicator";
const OsmToGeoJson = () => {
  const [hasError, setErrors] = useState(false);

  //search input
  const [enteredFilter, setEnteredFilter] = useState("");
  const [dataFetched, setDateFetched] = useState("");
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    if (enteredFilter !== "") {
      sendRequest(enteredFilter, "GET");
    }
  }, [sendRequest, enteredFilter]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setDateFetched(data);
    }
  }, [data, isLoading, error]);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">OSM to GEOJSON</h1>
          <section className="section">
            <div className="columns">
              <div className="column">
                <Search
                  inputValue={(value) => setEnteredFilter(value)}
                  clear={() => setEnteredFilter("")}
                />
              </div>
            </div>
          </section>
          <div className="columns">
            <div className="column">
              {error ? (
                <Notification className="is-danger is-light">
                  {error}
                </Notification>
              ) : isLoading ? (
                <LoadingIndicator />
              ) : (enteredFilter !== "") & (dataFetched !== "") ? (
                <pre>{JSON.stringify(dataFetched, undefined, 3)}</pre>
              ) : (
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      where:
                      <ul>
                        <li>
                          <code>left</code> is the longitude of the left
                          (westernmost) side of the bounding box.
                        </li>
                        <li>
                          <code>bottom</code> is the latitude of the bottom
                          (southernmost) side of the bounding box.
                        </li>
                        <li>
                          <code>right</code> is the longitude of the right
                          (easternmost) side of the bounding box.
                        </li>
                        <li>
                          <code>top</code> is the latitude of the top
                          (northernmost) side of the bounding box.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OsmToGeoJson;
