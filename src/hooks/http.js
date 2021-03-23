import { useReducer, useCallback } from "react";
import osmtogeojson from "osmtogeojson";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
      };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(`https://api.openstreetmap.org/api/0.6/map?bbox=${url}`, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, "text/xml");
        const result = osmtogeojson(xmlDoc);
        dispatchHttp({
          type: "RESPONSE",
          responseData: result,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatchHttp({
          type: "ERROR",
          errorMessage: `Something went wrong! (${error})`,
        });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
