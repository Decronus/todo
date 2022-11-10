import { configureStore } from "@reduxjs/toolkit";
import { toDoReducer } from "../reducers/todo";

export const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
});
