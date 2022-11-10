import { TOGGLE_TODO, REMOVE_TODO, FILTER_TODO } from "../types/todo";

export const toggleToDo = (id) => ({ type: TOGGLE_TODO, payload: id });

export const removeToDo = (id) => ({ type: REMOVE_TODO, payload: id });

export const filterToDo = (activeFilter) => ({
  type: FILTER_TODO,
  payload: activeFilter,
});
