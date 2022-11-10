import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const defaultState = {
  toDoList: [],
  activefilter: "ALL",
};

const toDoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return { ...state, toDoList: [...state.toDoList, action.payload] };
    }

    case "TOGGLE_TODO": {
      const id = action.payload;
      return {
        ...state,
        toDoList: [
          ...state.toDoList.map((toDo) => {
            if (toDo.id === id) {
              toDo.completed = !toDo.completed;
            }
            return toDo;
          }),
        ],
      };
    }

    case "REMOVE_TODO": {
      const id = action.payload;
      return {
        ...state,
        toDoList: [...state.toDoList.filter((toDo) => toDo.id !== id)],
      };
    }

    case "FILTER_TODO": {
      let activeFilter = action.payload;
      return {
        ...state,
        activeFilter: activeFilter,
      };
    }

    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
