import { createContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  diseaseData: [],
  currentData: "",
  apiBaseUrl: "http://localhost:5001/api/",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "diseaseData":
      return { ...state, diseaseData: action.payload };
    case "currentData":
      return { ...state, currentData: action.payload };
    default:
      return state;
  }
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const diseaseDataHandler = (data) => {
    dispatch({
      type: "diseaseData",
      payload: data,
    });
  };
  const currentDataHandler = (data) => {
    dispatch({
      type: "currentData",
      payload: data,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        diseaseData: state.diseaseData,
        apiBaseUrl: state.apiBaseUrl,
        diseaseDataHandler,
        currentData: state.currentData,
        currentDataHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
